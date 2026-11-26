import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Flame,
  Layers3,
  Lightbulb,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  WandSparkles,
  X,
} from 'lucide-react'
import './styles.css'
import { LandingApp } from './landing.jsx'

const categories = ['All topics', 'AI agents', 'Generative AI', 'AI coding', 'Multimodal', 'AI safety']

const trends = [
  {
    id: 'agents',
    category: 'AI agents',
    title: 'AI agents are becoming workflow teammates',
    eyebrow: 'Most saved this week',
    description: 'Learn how agents plan, use tools, keep context, and hand work back to people.',
    level: 'Beginner',
    time: '8 min read',
    accent: 'violet',
    icon: '✦',
    progress: 72,
    sources: 4,
    tags: ['orchestration', 'tools', 'human-in-the-loop'],
  },
  {
    id: 'multimodal',
    category: 'Multimodal',
    title: 'The interface is no longer just a chat box',
    eyebrow: 'New learning path',
    description: 'See what changes when models can understand images, audio, video, and screens together.',
    level: 'Intermediate',
    time: '11 min read',
    accent: 'coral',
    icon: '◌',
    progress: 34,
    sources: 6,
    tags: ['vision', 'voice', 'interaction'],
  },
  {
    id: 'coding',
    category: 'AI coding',
    title: 'From autocomplete to delegated coding',
    eyebrow: 'Try it yourself',
    description: 'Build a tiny feature with an AI coding partner and learn where review still matters.',
    level: 'Beginner',
    time: '14 min read',
    accent: 'mint',
    icon: '</>',
    progress: 0,
    sources: 5,
    tags: ['vibe coding', 'review', 'shipping'],
  },
  {
    id: 'safety',
    category: 'AI safety',
    title: 'Why evaluation is becoming a daily habit',
    eyebrow: 'Worth understanding',
    description: 'Move beyond demos: learn how teams test reliability, bias, and failure modes before launch.',
    level: 'Advanced',
    time: '13 min read',
    accent: 'blue',
    icon: '◎',
    progress: 18,
    sources: 8,
    tags: ['evaluation', 'red teaming', 'risk'],
  },
]

const channelCopy = {
  Website: {
    label: 'Website article',
    body: 'AI agents are moving from clever demos into real workflows. The useful mental model is simple: an agent can plan a task, use tools, keep track of context, and ask a person for help when a decision needs judgment.\n\nStart small. Give an agent one repeatable workflow, clear boundaries, and an evaluation checklist. The goal is not to remove people from the loop; it is to give people a better first draft of the work.',
  },
  LinkedIn: {
    label: 'LinkedIn post',
    body: 'AI agents are not just chatbots with a bigger prompt.\n\nThey can plan, use tools, keep context, and hand control back to people.\n\nThe practical starting point: choose one repeatable workflow, set clear boundaries, and evaluate the result before you scale it.\n\nWhat workflow would you delegate first?',
  },
  'X thread': {
    label: 'X thread',
    body: '1/ AI agents are becoming workflow teammates.\n\n2/ The shift is not just better answers. Agents can plan a task, use tools, keep context, and ask for help.\n\n3/ The safest way to start is small: one workflow, clear boundaries, visible review.\n\n4/ The question is not “Can AI do this?” It is “Where does human judgment still create the most value?”',
  },
  Carousel: {
    label: 'Instagram carousel',
    body: 'Slide 1 — AI agents are becoming workflow teammates\nSlide 2 — They can plan a task\nSlide 3 — They can use tools\nSlide 4 — They can keep context\nSlide 5 — People still set the boundaries\nSlide 6 — Start with one repeatable workflow\nSlide 7 — Try it, evaluate it, then scale it',
  },
}

function App() {
  const [activeSection, setActiveSection] = useState('Explore')
  const [activeCategory, setActiveCategory] = useState('All topics')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState(['agents'])
  const [selectedTrend, setSelectedTrend] = useState(trends[0])
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [channel, setChannel] = useState('Website')
  const [copied, setCopied] = useState(false)

  const filteredTrends = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return trends.filter((trend) => {
      const matchesCategory = activeCategory === 'All topics' || trend.category === activeCategory
      const matchesQuery = !normalized || `${trend.title} ${trend.description} ${trend.tags.join(' ')}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const toggleSaved = (id) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])

  const openGenerator = (trend) => {
    setSelectedTrend(trend)
    setIsGeneratorOpen(true)
    setCopied(false)
  }

  const copyDraft = async () => {
    await navigator.clipboard?.writeText(channelCopy[channel].body)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></div>
          <div>
            <div className="brand-name">AI Trend Lab</div>
            <div className="brand-subtitle">Understand. Try. Share.</div>
          </div>
        </div>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            ['Explore', '◈'], ['Learn', '◒'], ['Create', '✧'],
          ].map(([label, icon]) => (
            <button key={label} className={`nav-item ${activeSection === label ? 'active' : ''}`} onClick={() => setActiveSection(label)}>
              <span className="nav-glyph">{icon}</span>
              <span>{label}</span>
              {label === 'Create' && <span className="nav-badge">NEW</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label">Your progress</div>
        <div className="progress-card">
          <div className="progress-card-top"><span>This week</span><span>4 / 7 days</span></div>
          <div className="week-dots" aria-label="Weekly learning progress">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div key={`${day}-${index}`} className={`week-day ${index < 4 ? 'complete' : index === 4 ? 'today' : ''}`}><span>{day}</span><i>{index < 4 ? <Check size={12} /> : ''}</i></div>)}
          </div>
          <div className="progress-foot"><Flame size={14} /> 6 day learning streak</div>
        </div>

        <div className="sidebar-bottom">
          <div className="mini-profile"><div className="avatar">DK</div><div><strong>My workspace</strong><span>Personal learning</span></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeSection}</strong></div>
          <div className="topbar-actions"><button className="icon-button" aria-label="View saved topics"><Bookmark size={18} /></button><button className="help-button">?</button><div className="top-avatar">DK</div></div>
        </header>

        <div className="content-wrap">
          <section className="hero-section">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> Tuesday, 25 November 2026</div>
              <h1>Make sense of<br /><em>what’s next</em> in AI.</h1>
              <p className="hero-description">A calm place to understand the latest AI shifts, try the tools yourself, and turn your learning into something worth sharing.</p>
              <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('trend-library')?.scrollIntoView({ behavior: 'smooth' })}>Explore today’s signals <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => openGenerator(trends[0])}><WandSparkles size={16} /> Generate content</button></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Sparkles size={36} /></div>
              <div className="art-float float-one"><span className="float-icon violet">✦</span><strong>Agents</strong><small>+32% interest</small></div>
              <div className="art-float float-two"><span className="float-icon coral">◌</span><strong>Multimodal</strong><small>Try a new workflow</small></div>
              <div className="art-float float-three"><span className="float-icon mint">◎</span><strong>Evaluation</strong><small>Worth your attention</small></div>
            </div>
          </section>

          <section className="stats-row" aria-label="Workspace overview">
            <div className="stat"><span className="stat-icon purple"><Layers3 size={16} /></span><div><strong>24</strong><span>topics explored</span></div></div>
            <div className="stat"><span className="stat-icon coral"><Target size={16} /></span><div><strong>68%</strong><span>learning progress</span></div></div>
            <div className="stat"><span className="stat-icon mint"><WandSparkles size={16} /></span><div><strong>12</strong><span>drafts created</span></div></div>
            <div className="pulse-stat"><div className="pulse-bars"><i /><i /><i /><i /><i /></div><div><strong>+18%</strong><span>AI interest this week</span></div><ArrowUpRight size={16} /></div>
          </section>

          <section className="library-section" id="trend-library">
            <div className="section-heading"><div><div className="section-kicker">Curated for your learning path</div><h2>Today’s AI signals</h2></div><button className="view-all-button">View all <ArrowUpRight size={15} /></button></div>
            <div className="toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, tools, or ideas" aria-label="Search topics, tools, or ideas" /></div><div className="category-pills">{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div></div>

            {filteredTrends.length === 0 ? <div className="empty-state"><Search size={25} /><h3>No signals found</h3><p>Try a different search term or category.</p></div> : <div className="trend-grid">{filteredTrends.map((trend) => <TrendCard key={trend.id} trend={trend} saved={saved.includes(trend.id)} onSave={() => toggleSaved(trend.id)} onCreate={() => openGenerator(trend)} />)}</div>}
          </section>

          <section className="bottom-grid">
            <div className="learning-card">
              <div className="learning-card-head"><div><div className="section-kicker">Your next small win</div><h2>Build your first AI workflow</h2></div><div className="step-count">1 <span>of</span> 3</div></div>
              <p>Try a small agent workflow and see how planning, tools, and human review fit together.</p>
              <div className="lesson-progress"><span style={{ width: '38%' }} /></div>
              <div className="learning-card-foot"><span><Clock3 size={15} /> 12 min activity</span><button className="dark-button"><Play size={15} fill="currentColor" /> Start activity</button></div>
            </div>
            <div className="principles-card"><div className="principle-orb"><Lightbulb size={20} /></div><div><div className="section-kicker">A useful principle</div><h3>Don’t chase every headline.</h3><p>Choose one thing you can try, one thing you can question, and one thing you can teach someone else.</p><button className="text-button small">Read the learning guide <ArrowUpRight size={14} /></button></div></div>
          </section>
        </div>
      </main>

      {isGeneratorOpen && <GeneratorModal trend={selectedTrend} channel={channel} setChannel={setChannel} copied={copied} onCopy={copyDraft} onClose={() => setIsGeneratorOpen(false)} />}
    </div>
  )
}

function TrendCard({ trend, saved, onSave, onCreate }) {
  return <article className="trend-card">
    <div className={`trend-art ${trend.accent}`}><span className="trend-art-symbol">{trend.icon}</span><div className="trend-art-lines" /></div>
    <div className="trend-card-body"><div className="card-meta"><span>{trend.eyebrow}</span><button className={`save-button ${saved ? 'saved' : ''}`} onClick={onSave} aria-label={saved ? `Remove ${trend.title} from saved topics` : `Save ${trend.title}`}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /></button></div><h3>{trend.title}</h3><p>{trend.description}</p><div className="tag-row">{trend.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-footer"><span className="level-pill">{trend.level}</span><span className="read-time"><Clock3 size={13} /> {trend.time}</span><button className="create-link" onClick={onCreate}>Create <ArrowUpRight size={14} /></button></div></div>
  </article>
}

function GeneratorModal({ trend, channel, setChannel, copied, onCopy, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="generator-modal" role="dialog" aria-modal="true" aria-labelledby="generator-title">
      <div className="modal-top"><div><div className="section-kicker">Create from a verified topic</div><h2 id="generator-title">Turn this into something shareable</h2></div><button className="close-button" onClick={onClose} aria-label="Close generator"><X size={19} /></button></div>
      <div className="source-chip"><span className={`source-dot ${trend.accent}`} /> <strong>{trend.title}</strong><span>·</span><span>{trend.sources} sources reviewed</span></div>
      <div className="generator-layout"><div className="generator-options"><label>Choose a format</label><div className="channel-list">{Object.keys(channelCopy).map((name) => <button key={name} className={channel === name ? 'active' : ''} onClick={() => setChannel(name)}><span>{name === 'Website' ? '◉' : name === 'LinkedIn' ? 'in' : name === 'X thread' ? '𝕏' : '▦'}</span><strong>{name}</strong>{channel === name && <Check size={16} />}</button>)}</div><label>Audience</label><button className="select-like">Curious beginners <ChevronDown size={15} /></button><label>Tone</label><button className="select-like">Clear and grounded <ChevronDown size={15} /></button><button className="generate-button"><Sparkles size={16} /> Generate draft</button></div><div className="draft-preview"><div className="draft-header"><span>Preview</span><span className="ai-label"><Sparkles size={12} /> AI-assisted draft</span></div><h3>{channelCopy[channel].label}</h3><div className="draft-content">{channelCopy[channel].body.split('\n').map((line, index) => <p key={`${line}-${index}`}>{line || '\u00a0'}</p>)}</div><div className="draft-footer"><span><Check size={14} /> Sources attached</span><button className="copy-button" onClick={onCopy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy draft'}</button></div></div></div>
    </section>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><LandingApp /></StrictMode>)
