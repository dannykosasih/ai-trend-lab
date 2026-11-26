import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Flame,
  Menu,
  Play,
  Search,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react'
import './landing.css'

const categories = ['All topics', 'AI agents', 'Generative AI', 'AI coding', 'Multimodal', 'AI safety']
const trends = [
  { id: 'agents', category: 'AI agents', title: 'AI agents are becoming workflow teammates', eyebrow: 'Most saved this week', description: 'Learn how agents plan, use tools, keep context, and hand work back to people.', level: 'Beginner', time: '8 min read', accent: 'violet', icon: '✦', sources: 4, tags: ['orchestration', 'tools', 'human-in-the-loop'] },
  { id: 'multimodal', category: 'Multimodal', title: 'The interface is no longer just a chat box', eyebrow: 'New learning path', description: 'See what changes when models can understand images, audio, video, and screens together.', level: 'Intermediate', time: '11 min read', accent: 'coral', icon: '◌', sources: 6, tags: ['vision', 'voice', 'interaction'] },
  { id: 'coding', category: 'AI coding', title: 'From autocomplete to delegated coding', eyebrow: 'Try it yourself', description: 'Build a tiny feature with an AI coding partner and learn where review still matters.', level: 'Beginner', time: '14 min read', accent: 'lime', icon: '</>', sources: 5, tags: ['vibe coding', 'review', 'shipping'] },
  { id: 'safety', category: 'AI safety', title: 'Why evaluation is becoming a daily habit', eyebrow: 'Worth understanding', description: 'Move beyond demos: learn how teams test reliability, bias, and failure modes before launch.', level: 'Advanced', time: '13 min read', accent: 'blue', icon: '◎', sources: 8, tags: ['evaluation', 'red teaming', 'risk'] },
]

const channelCopy = {
  Website: { label: 'Website article', body: 'AI agents are moving from clever demos into real workflows. The useful mental model is simple: an agent can plan a task, use tools, keep track of context, and ask a person for help when a decision needs judgment.\n\nStart small. Give an agent one repeatable workflow, clear boundaries, and an evaluation checklist.' },
  LinkedIn: { label: 'LinkedIn post', body: 'AI agents are not just chatbots with a bigger prompt.\n\nThey can plan, use tools, keep context, and hand control back to people.\n\nStart with one repeatable workflow, clear boundaries, and visible review.' },
  'X thread': { label: 'X thread', body: '1/ AI agents are becoming workflow teammates.\n\n2/ The shift is not just better answers. Agents can plan a task, use tools, keep context, and ask for help.\n\n3/ Start small: one workflow, clear boundaries, visible review.' },
  Carousel: { label: 'Instagram carousel', body: 'Slide 1 — AI agents are becoming workflow teammates\nSlide 2 — They can plan a task\nSlide 3 — They can use tools\nSlide 4 — People still set the boundaries\nSlide 5 — Try it, evaluate it, then scale it' },
}

export function LandingApp() {
  const [activeCategory, setActiveCategory] = useState('All topics')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState(['agents'])
  const [selectedTrend, setSelectedTrend] = useState(trends[0])
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [channel, setChannel] = useState('Website')
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredTrends = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return trends.filter((trend) => {
      const matchesCategory = activeCategory === 'All topics' || trend.category === activeCategory
      const matchesQuery = !normalized || `${trend.title} ${trend.description} ${trend.tags.join(' ')}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const scrollToSignals = () => document.getElementById('signals')?.scrollIntoView({ behavior: 'smooth' })
  const toggleSaved = (id) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const openGenerator = (trend) => { setSelectedTrend(trend); setIsGeneratorOpen(true); setCopied(false) }
  const copyDraft = async () => { await navigator.clipboard?.writeText(channelCopy[channel].body); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }

  return <div className="site-shell">
    <div className="top-note"><span className="top-note-dot" /> The AI world is moving fast. We made a calmer place to keep up. <button onClick={scrollToSignals}>See what's new <ArrowRight size={13} /></button></div>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="AI Trend Lab home"><span className="wordmark-icon"><Sparkles size={17} /></span><span>AI Trend Lab</span><i className="wordmark-scribble" /></a><nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation"><a href="#learn">Learn <ChevronDown size={13} /></a><a href="#signals">Trends</a><a href="#create">Create</a><a href="#share">Share</a><a href="#my-lab">My Lab</a></nav><div className="header-actions"><button className="header-search" aria-label="Search"><Search size={18} /></button><button className="signin-button">Sign in</button><button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>
    <main id="top">
      <section className="hero-section landing-grid"><div className="hero-copy"><div className="hand-label"><span>✦</span> A learning lab for curious humans</div><h1>Make sense of<br /><span>what's next</span> in AI.</h1><p>AI is moving fast. Your brain doesn't have to. Understand the shifts, try the tools, and turn one good idea into something worth sharing.</p><div className="hero-actions"><button className="primary-cta" onClick={scrollToSignals}>Explore today's signals <ArrowUpRight size={18} /></button><button className="sketch-cta" onClick={() => openGenerator(trends[0])}><WandSparkles size={16} /> Try something weird</button></div><div className="hero-proof"><div className="proof-avatars"><span>✦</span><span>DK</span><span>AI</span></div><span>Made for people who want to learn by doing.</span></div></div><div className="hero-visual" aria-label="Illustration of an AI signal crystal ball"><div className="doodle doodle-crown">⌁</div><div className="doodle doodle-arrow">↘</div><div className="sticky sticky-understand"><span>✓</span> Understand<br /><span>✓</span> Try<br /><span>✓</span> Share</div><div className="sticky sticky-question">What's<br />changing<br />in AI?</div><div className="sticky sticky-shift">✓ New tools<br />✓ Big shifts<br />✓ Real use cases</div><div className="signal-orbit orbit-a" /><div className="signal-orbit orbit-b" /><div className="signal-ball"><div className="signal-stars">✦ <small>✦</small> ✧</div><strong>AI</strong><i /></div><div className="signal-base">AI Trend Lab</div><div className="tiny-bot"><div className="bot-head">⌃⌃</div><div className="bot-body"><span>✦</span></div></div></div></section>
      <section className="principle-strip" id="learn"><div className="strip-label">The loop</div><div className="strip-step"><span className="strip-number purple">01</span><strong>Understand</strong><small>Get the useful mental model.</small></div><ArrowRight className="strip-arrow" size={18} /><div className="strip-step"><span className="strip-number coral">02</span><strong>Try</strong><small>Make it real in 10 minutes.</small></div><ArrowRight className="strip-arrow" size={18} /><div className="strip-step"><span className="strip-number lime">03</span><strong>Share</strong><small>Give the idea a life outside your tab.</small></div><span className="margin-note">no gatekeeping <span>↗</span></span></section>
      <section className="signals-section" id="signals"><div className="section-intro"><div><div className="hand-label small"><span>✦</span> Curated for your learning path</div><h2>Today's AI signals</h2></div><button className="view-all" onClick={scrollToSignals}>Open the rabbit hole <ArrowUpRight size={15} /></button></div><div className="signals-toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, tools, or ideas" aria-label="Search topics, tools, or ideas" /></div><div className="category-pills">{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div></div>{filteredTrends.length === 0 ? <div className="empty-state"><Search size={24} /><h3>No signals found</h3><p>Try a different phrase. The internet is big, but this list is curated.</p></div> : <div className="signal-cards">{filteredTrends.map((trend, index) => <TrendCard key={trend.id} trend={trend} index={index} saved={saved.includes(trend.id)} onSave={() => toggleSaved(trend.id)} onCreate={() => openGenerator(trend)} />)}</div>}</section>
      <section className="learn-band" id="my-lab"><div className="learn-band-note">My learning <span>↗</span></div><div className="learn-band-main"><div className="hand-label small"><span>✦</span> Your next small win</div><h2>Build your first AI workflow</h2><p>Try a small agent workflow and see where planning, tools, and human review fit together.</p><div className="learning-progress"><span style={{ width: '60%' }} /></div><div className="learning-meta"><span><Flame size={15} /> 6 day learning streak</span><span>60% complete</span></div></div><div className="learn-band-action"><div className="scribble-circle">12<br /><small>min</small></div><button className="dark-cta"><Play size={15} fill="currentColor" /> Start activity</button><div className="tiny-note">human review, always <span>↗</span></div></div></section>
      <section className="share-section" id="share"><div className="share-copy"><div className="hand-label small"><span>✦</span> From learning to publishing</div><h2>Turn this into something <span>shareable.</span></h2><p>One approved topic. Four useful formats. Zero content hamster wheel.</p><button className="primary-cta" onClick={() => openGenerator(trends[0])}>Make a first draft <WandSparkles size={17} /></button></div><div className="share-stack"><div className="paper-card paper-one"><span className="paper-tag violet">WEBSITE</span><strong>AI agents are becoming workflow teammates.</strong><small>4 sources reviewed · 8 min read</small></div><div className="paper-card paper-two"><span className="paper-tag coral">LINKEDIN</span><strong>What would you delegate first?</strong><small>AI-assisted draft · human review ready</small></div><div className="paper-card paper-three"><span className="paper-tag lime">CAROUSEL</span><strong>Try it. Evaluate it. Then scale it.</strong><small>7 slides · source links attached</small></div><div className="share-doodle">one source<br />many lives <ArrowDownRight size={17} /></div></div></section>
      <footer className="site-footer"><a className="wordmark" href="#top"><span className="wordmark-icon"><Sparkles size={15} /></span><span>AI Trend Lab</span></a><span>Understand. Try. Share.</span><div><a href="#signals">Signals</a><a href="#learn">Learning guide</a><a href="#create">Content studio</a></div></footer>
    </main>
    {isGeneratorOpen && <GeneratorModal trend={selectedTrend} channel={channel} setChannel={setChannel} copied={copied} onCopy={copyDraft} onClose={() => setIsGeneratorOpen(false)} />}
  </div>
}

function TrendCard({ trend, index, saved, onSave, onCreate }) {
  return <article className={`signal-card ${trend.accent} card-${index + 1}`}><div className="card-paperclip">{trend.icon}</div><div className="card-topline"><span>{trend.eyebrow}</span><button className={`save-button ${saved ? 'saved' : ''}`} onClick={onSave} aria-label={saved ? `Remove ${trend.title} from saved topics` : `Save ${trend.title}`}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button></div><h3>{trend.title}</h3><p>{trend.description}</p><div className="card-tags">{trend.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-bottom"><span className="level-pill">{trend.level}</span><span className="read-time"><Clock3 size={13} /> {trend.time}</span><button className="card-link" onClick={onCreate}>Open <ArrowUpRight size={14} /></button></div></article>
}

function GeneratorModal({ trend, channel, setChannel, copied, onCopy, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="generator-modal" role="dialog" aria-modal="true" aria-labelledby="generator-title"><div className="modal-top"><div><div className="hand-label small"><span>✦</span> Create from a verified topic</div><h2 id="generator-title">Turn this into something shareable</h2></div><button className="close-button" onClick={onClose} aria-label="Close generator"><X size={19} /></button></div><div className="source-chip"><span className={`source-dot ${trend.accent}`} /><strong>{trend.title}</strong><span>·</span><span>{trend.sources} sources reviewed</span></div><div className="generator-layout"><div className="generator-options"><label>Choose a format</label><div className="channel-list">{Object.keys(channelCopy).map((name) => <button key={name} className={channel === name ? 'active' : ''} onClick={() => setChannel(name)}><span>{name === 'Website' ? '◉' : name === 'LinkedIn' ? 'in' : name === 'X thread' ? '𝕏' : '▦'}</span><strong>{name}</strong>{channel === name && <Check size={16} />}</button>)}</div><label>Audience</label><button className="select-like">Curious beginners <ChevronDown size={15} /></button><label>Tone</label><button className="select-like">Clear and grounded <ChevronDown size={15} /></button><button className="generate-button"><Sparkles size={16} /> Generate draft</button></div><div className="draft-preview"><div className="draft-header"><span>Preview</span><span className="ai-label"><Sparkles size={12} /> AI-assisted draft</span></div><h3>{channelCopy[channel].label}</h3><div className="draft-content">{channelCopy[channel].body.split('\n').map((line, index) => <p key={`${line}-${index}`}>{line || '\u00a0'}</p>)}</div><div className="draft-footer"><span><Check size={14} /> Sources attached</span><button className="copy-button" onClick={onCopy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy draft'}</button></div></div></div></section></div>
}
