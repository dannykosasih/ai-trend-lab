from pathlib import Path
import re

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).parent
SOURCE = ROOT / "BRD.md"
OUTPUT = ROOT / "AI Trend Lab BRD.docx"

NAVY = "17365D"
PALE = "F4F7FA"
MID = "D9D9D9"
BLACK = "000000"
WHITE = "FFFFFF"
GRAY = "5B6573"

def shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn('w:shd'))
    if shd is None:
        shd = OxmlElement('w:shd')
        tcPr.append(shd)
    shd.set(qn('w:fill'), fill)

def border(cell, color=MID):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = tcPr.first_child_found_in('w:tcBorders')
    if borders is None:
        borders = OxmlElement('w:tcBorders')
        tcPr.append(borders)
    for edge in ('top','left','bottom','right','insideH','insideV'):
        node = borders.find(qn('w:' + edge))
        if node is None:
            node = OxmlElement('w:' + edge)
            borders.append(node)
        node.set(qn('w:val'), 'single')
        node.set(qn('w:sz'), '6')
        node.set(qn('w:space'), '0')
        node.set(qn('w:color'), color)

def margins(cell, value=90):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = tcPr.first_child_found_in('w:tcMar')
    if tcMar is None:
        tcMar = OxmlElement('w:tcMar')
        tcPr.append(tcMar)
    for edge in ('top','start','bottom','end'):
        node = tcMar.find(qn('w:' + edge))
        if node is None:
            node = OxmlElement('w:' + edge)
            tcMar.append(node)
        node.set(qn('w:w'), str(value))
        node.set(qn('w:type'), 'dxa')

def repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    node = OxmlElement('w:tblHeader')
    node.set(qn('w:val'), 'true')
    trPr.append(node)

def add_page_field(paragraph):
    run = paragraph.add_run('Page ')
    begin = OxmlElement('w:fldChar'); begin.set(qn('w:fldCharType'), 'begin')
    instr = OxmlElement('w:instrText'); instr.set(qn('xml:space'), 'preserve'); instr.text = 'PAGE'
    end = OxmlElement('w:fldChar'); end.set(qn('w:fldCharType'), 'end')
    run._r.append(begin); run._r.append(instr); run._r.append(end)

def add_table(doc, rows):
    headers = rows[0]
    table = doc.add_table(rows=1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True
    repeat_header(table.rows[0])
    for i, value in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = value
        shade(cell, NAVY); border(cell); margins(cell)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        for p in cell.paragraphs:
            p.paragraph_format.space_after = Pt(2)
            for run in p.runs:
                run.font.name = 'Aptos'; run.font.size = Pt(8.5); run.font.bold = True; run.font.color.rgb = RGBColor.from_string(WHITE)
    for ridx, row in enumerate(rows[1:]):
        cells = table.add_row().cells
        for i, value in enumerate(row):
            cell = cells[i]
            cell.text = value
            border(cell); margins(cell)
            if ridx % 2 == 1: shade(cell, PALE)
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            for p in cell.paragraphs:
                p.paragraph_format.space_after = Pt(2)
                for run in p.runs:
                    run.font.name = 'Aptos'; run.font.size = Pt(8.2); run.font.color.rgb = RGBColor.from_string(BLACK)
    doc.add_paragraph().paragraph_format.space_after = Pt(1)

def parse_table(lines, start):
    rows = []
    i = start
    while i < len(lines) and lines[i].strip().startswith('|'):
        raw = lines[i].strip().strip('|')
        cells = [c.strip() for c in raw.split('|')]
        if not all(re.fullmatch(r':?-{3,}:?', c) for c in cells):
            rows.append(cells)
        i += 1
    return rows, i

def make_doc():
    doc = Document()
    sec = doc.sections[0]
    sec.page_width = Inches(8.5); sec.page_height = Inches(11)
    sec.top_margin = Inches(.7); sec.bottom_margin = Inches(.65)
    sec.left_margin = Inches(.75); sec.right_margin = Inches(.75)
    styles = doc.styles
    normal = styles['Normal']
    normal.font.name = 'Aptos'; normal._element.rPr.rFonts.set(qn('w:ascii'), 'Aptos'); normal._element.rPr.rFonts.set(qn('w:hAnsi'), 'Aptos')
    normal.font.size = Pt(10.5); normal.font.color.rgb = RGBColor.from_string(BLACK)
    normal.paragraph_format.space_after = Pt(5); normal.paragraph_format.line_spacing = 1.08
    for name, size in [('Title', 24), ('Heading 1', 16), ('Heading 2', 12.5), ('Heading 3', 10.5)]:
        st = styles[name]
        st.font.name = 'Aptos Display' if name in ('Title', 'Heading 1') else 'Aptos'
        st._element.rPr.rFonts.set(qn('w:ascii'), st.font.name); st._element.rPr.rFonts.set(qn('w:hAnsi'), st.font.name)
        st.font.size = Pt(size); st.font.bold = True; st.font.color.rgb = RGBColor.from_string(BLACK)
        st.paragraph_format.space_before = Pt(13 if name == 'Heading 1' else 9); st.paragraph_format.space_after = Pt(5); st.paragraph_format.keep_with_next = True
    if 'Small Note' not in styles:
        st = styles.add_style('Small Note', WD_STYLE_TYPE.PARAGRAPH)
        st.font.name = 'Aptos'; st.font.size = Pt(8.5); st.font.color.rgb = RGBColor.from_string(GRAY)

    footer = sec.footer.paragraphs[0]
    footer.style = styles['Small Note']; footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    footer.add_run('AI Trend Lab | Business Requirements Document    '); add_page_field(footer)

    lines = SOURCE.read_text(encoding='utf-8').splitlines()
    i = 0
    in_code = False
    code_lines = []
    first_h1 = True
    while i < len(lines):
        line = lines[i]
        if line.startswith('```'):
            if not in_code:
                in_code = True; code_lines = []
            else:
                p = doc.add_paragraph(); p.paragraph_format.left_indent = Inches(.2); p.paragraph_format.space_after = Pt(7)
                for idx, code in enumerate(code_lines):
                    r = p.add_run(code + ('\n' if idx < len(code_lines)-1 else ''))
                    r.font.name = 'Courier New'; r.font.size = Pt(8.5)
                in_code = False
            i += 1; continue
        if in_code:
            code_lines.append(line); i += 1; continue
        if not line.strip():
            i += 1; continue
        if line.startswith('# '):
            p = doc.add_paragraph(style='Title')
            p.add_run(line[2:].strip())
            doc.add_paragraph('Build baseline for Codex implementation', style='Subtitle')
            doc.add_page_break(); first_h1 = False; i += 1; continue
        if line.startswith('## '):
            doc.add_heading(line[3:].strip(), level=1); i += 1; continue
        if line.startswith('### '):
            doc.add_heading(line[4:].strip(), level=2); i += 1; continue
        if line.startswith('#### '):
            doc.add_heading(line[5:].strip(), level=3); i += 1; continue
        if line.startswith('|'):
            rows, i = parse_table(lines, i)
            if rows: add_table(doc, rows)
            continue
        if line.startswith('- '):
            p = doc.add_paragraph(style='List Bullet'); p.paragraph_format.space_after = Pt(3); p.add_run(line[2:].strip()); i += 1; continue
        if re.match(r'^\d+\. ', line):
            p = doc.add_paragraph(style='List Number'); p.paragraph_format.space_after = Pt(3); p.add_run(re.sub(r'^\d+\. ', '', line)); i += 1; continue
        p = doc.add_paragraph()
        # Basic inline emphasis handling.
        parts = re.split(r'(\*\*.*?\*\*|`.*?`)', line)
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                r = p.add_run(part[2:-2]); r.bold = True
            elif part.startswith('`') and part.endswith('`'):
                r = p.add_run(part[1:-1]); r.font.name = 'Courier New'; r.font.size = Pt(9)
            else:
                p.add_run(part)
        i += 1

    doc.core_properties.title = 'AI Trend Lab Business Requirements Document'
    doc.core_properties.subject = 'Codex implementation BRD for AI Trend Lab'
    doc.core_properties.author = 'AI Trend Lab Project Team'
    doc.save(OUTPUT)
    print(OUTPUT)

if __name__ == '__main__':
    make_doc()
