# AI Trend Lab Business Requirements Document

Version 2.0  
Date: 26 November 2026  
Status: Build baseline for Codex implementation

## 1 Executive summary

AI Trend Lab is a web platform that helps learners understand current AI developments, try practical AI workflows, and turn approved learning topics into clear website and social-media content.

The product should feel like a premium editorial magazine mixed with a playful AI sketchbook. Its interface must be elegant, warm, expressive, and witty without becoming childish or visually noisy. The experience is built around three actions:

1. Understand what is changing.
2. Try a small experiment.
3. Share what was learned.

The first build should prioritize a memorable landing page and an Explore experience, followed by persistent content, learning progress, and a source-grounded content generator.

## 2 Product vision

Make current AI developments understandable, testable, and shareable for people who want to learn by doing.

## 3 Product positioning

AI Trend Lab is not another generic AI news feed or sterile SaaS dashboard. It is a guided learning studio where trustworthy AI signals become practical experiments and useful content.

### Product personality

- Intelligent but not intimidating.
- Premium but not corporate.
- Playful but not childish.
- Current but not obsessed with hype.
- Witty, human, and slightly unexpected.

## 4 Target users

| User | Primary needs |
| --- | --- |
| Curious learner | Understand AI developments in plain language and know what to try next. |
| Student or professional | Build practical AI fluency through guided exercises and small projects. |
| Educator or facilitator | Recommend learning paths, assign activities, and monitor progress. |
| Content creator | Turn verified topics into articles, posts, carousels, and scripts. |
| Editor | Review sources, improve explanations, and approve AI-assisted content. |
| Administrator | Manage users, content, roles, prompts, sources, and analytics. |

## 5 Goals and success outcomes

- Help users understand important AI trends without reading fragmented technical material.
- Give users a practical first user experience with current AI workflows.
- Reduce the time needed to convert a researched topic into multiple content formats.
- Preserve trust through sources, review status, dates, and human approval.
- Create a repeatable learning habit through progress, streaks, recommendations, and small wins.

### Initial success measures

| Outcome | Measure |
| --- | --- |
| Learning engagement | Topic completion, quiz completion, saved topics, repeat visits. |
| Practical learning | Percentage of learners who complete a hands-on activity. |
| Content efficiency | Time from approved topic to first usable draft. |
| Quality | Editor approval rate, correction rate, and reported inaccuracies. |
| Trust | Source coverage, freshness, and time to correction. |
| Product usage | Monthly active learners, generated drafts, and returning users. |

## 6 Experience model

### 6.1 Understand

Users discover a curated AI signal, select the appropriate learning level, read a plain-language explanation, see why it matters, and review its sources.

### 6.2 Try

Users complete a small prompt exercise, workflow experiment, comparison, or quiz. Activities should be concrete enough to finish in 5 to 20 minutes.

### 6.3 Share

Users turn an approved topic into a website article, LinkedIn post, X thread, Instagram carousel, newsletter, or video outline. Generated content is always labeled AI-assisted and remains subject to human review.

## 7 Visual and interaction requirements

### 7.1 Design direction

The visual system combines editorial luxury with playful Gen Z sketchbook energy.

The visual balance should be approximately:

- 70 percent editorial luxury.
- 20 percent playful doodle energy.
- 10 percent visual surprise.

### 7.2 Color system

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#17151F` | Main text, navigation, strong contrast. |
| Warm ivory | `#F8F5EF` | Primary page background. |
| Soft paper | `#F0ECE4` | Secondary surfaces and paper cards. |
| Electric violet | `#7257FF` | Primary action, links, active states. |
| Soft lavender | `#B9A8FF` | Supporting highlight and learning surfaces. |
| Acid lime | `#D9F36A` | Playful emphasis, underlines, stickers. |
| Coral | `#FF806D` | Secondary highlight and warmth. |
| Cobalt blue | `#6D9FEF` | Information and safety content. |
| Muted graphite | `#77727D` | Secondary copy and metadata. |

Bright colors should appear as intentional moments, not as a full-page rainbow.

### 7.3 Typography

Use a more playful display typeface for hero headlines, category labels, stickers, and handwritten-style annotations. The display face should have rounded, expressive letterforms and be highly readable at large sizes.

Recommended direction:

- Display: rounded playful font such as Baloo 2, Fredoka, Lilita One, or a similar expressive face.
- Body and interface: DM Sans, Geist, or Space Grotesk.
- Metadata: DM Mono used sparingly for dates, source counts, and status labels.

Do not use the playful display font for long paragraphs, tables, or dense controls.

### 7.4 Doodle language

Doodles should behave like annotations in a premium magazine or notebook margin.

Approved motifs include:

- Hand-drawn arrows pointing to the next action.
- Stars, sparkles, circles, brackets, and imperfect underlines.
- Tiny AI characters, robots, flasks, crystal balls, and browser windows.
- Paper scraps, tape marks, sticker labels, and torn-edge cards.
- Margin notes such as `start here`, `tiny revelation`, `wait... it can do that?`, and `human review, always`.

Doodles must support hierarchy and personality. They must not cover important text, reduce contrast, or make the interface feel like a children's product.

### 7.5 Tone of voice

Copy should be clear, conversational, and lightly witty.

Preferred examples:

- `Make sense of what's next in AI.`
- `AI is moving fast. Your brain doesn't have to.`
- `Explore today's signals.`
- `Try something weird.`
- `Open the rabbit hole.`
- `Turn this into something shareable.`
- `I made a first draft. Please read me before publishing me.`

Avoid exaggerated claims, empty hype, and fear-based language.

## 8 MVP scope

### 8.1 In scope

- Responsive landing page with the new visual direction.
- Explore page with searchable and filterable AI trend cards.
- Trend detail page with layered explanations and source records.
- Learner account, bookmarks, reading history, and progress.
- Short activities and quizzes.
- Content generator for website, LinkedIn, X thread, and Instagram carousel copy.
- Draft editing, regeneration, source insertion, and export to Markdown and HTML.
- Editor review workflow with Draft, In review, Changes requested, Approved, and Archived states.
- Basic analytics for views, saves, completion, generation volume, and approval time.
- GitHub Pages deployment through GitHub Actions.

### 8.2 Out of scope for MVP

- Autonomous public publishing.
- Native mobile applications.
- Advanced model benchmarking.
- Community forum and peer review.
- Paid plans and external accreditation.
- Automated video production.
- Full source crawling across the public web without editorial controls.

## 9 Landing page requirements

The landing page is the first priority because it establishes the product's identity and explains the product model quickly.

### Required sections

1. Header with AI Trend Lab wordmark, Learn, Trends, Create, Share, My Lab, search, and sign-in.
2. Hero with the headline `Make sense of what's next in AI.`
3. Witty supporting line: `AI is moving fast. Your brain doesn't have to.`
4. Primary CTA: `Explore today's signals`.
5. Secondary CTA: `Try something weird`.
6. Hero visual: expressive AI signal orb or crystal ball with doodle annotations and a small AI character.
7. Today's AI Signals row with four topic cards: AI Agents, Multimodal, AI Coding, and AI Safety.
8. Learning progress section with streak, progress percentage, and next activity.
9. Content-generation teaser labeled `Turn this into something shareable`.
10. Footer with source policy, learning principles, privacy, and project links.

### Landing page acceptance criteria

- A first-time visitor understands the product purpose within 10 seconds.
- The page feels clearly different from a generic AI SaaS dashboard.
- The main CTA is visually dominant and keyboard accessible.
- Doodles and stickers enhance hierarchy without obscuring content.
- The layout remains usable on mobile widths.
- Headlines use the playful display font while body copy remains highly readable.

## 10 Functional requirements

| ID | Requirement | Priority | Acceptance summary |
| --- | --- | --- | --- |
| FR-01 | Trend library | Must | Users can browse, search, and filter approved trends by category, difficulty, and date. |
| FR-02 | Trend detail | Must | Each trend has a title, summary, layered explanation, practical example, limitations, and sources. |
| FR-03 | Source records | Must | Each trend stores source URL, publisher, source type, publication date, and review status. |
| FR-04 | Learning activities | Must | Editors can attach a prompt exercise, workflow, practical task, or quiz to a trend. |
| FR-05 | Learner progress | Must | Signed-in learners can complete activities and see progress, streaks, and completion status. |
| FR-06 | Bookmarks | Must | Users can save and remove trends and view saved topics. |
| FR-07 | Content generator | Must | Users can generate content from an approved trend and selected audience. |
| FR-08 | Channel adaptation | Must | Output adapts to Website, LinkedIn, X thread, Instagram carousel, newsletter, or video outline. |
| FR-09 | Draft editing | Must | Users can edit, regenerate selected sections, simplify, sharpen, translate, and add a call to action. |
| FR-10 | Review workflow | Must | Editors can move drafts through Draft, In review, Changes requested, Approved, and Archived. |
| FR-11 | Provenance | Must | Generated drafts retain source references and generation metadata. |
| FR-12 | Export | Must | Approved content exports to Markdown and HTML with citations preserved. |
| FR-13 | Admin controls | Must | Administrators can manage roles, categories, prompts, source policies, and model settings. |
| FR-14 | Analytics | Should | Authorized users can view engagement, learning, content, quality, and cost metrics. |
| FR-15 | Recommendations | Should | The product recommends related topics based on activity, category, and difficulty. |
| FR-16 | Direct publishing | Could | Approved drafts can be sent to a CMS or connected social platform. |

## 11 Content and AI governance

### Source-grounded generation

- Trend explanations must be grounded in reviewed sources.
- The system must show publication date and last-reviewed date for time-sensitive content.
- Facts, interpretation, examples, and predictions must be distinguishable.
- Generated content must not introduce unsupported claims.
- Every public draft must have a human approval step.

### AI-assisted content controls

- Show an `AI-assisted draft` label where appropriate.
- Log source set, model identifier, prompt template, generation time, and reviewer decision.
- Allow inaccurate or unsafe content to be reported.
- Apply stricter review to medical, legal, financial, security, and personal-data topics.
- Do not copy source material verbatim beyond short permitted excerpts.

## 12 Roles and permissions

| Role | View | Create or edit | Approve | Admin settings |
| --- | --- | --- | --- | --- |
| Learner | Public content and own progress | Own drafts | No | No |
| Educator | Public and assigned content | Activities and assignments | Optional by policy | No |
| Editor | All assigned content and sources | Content and drafts | Yes | Limited |
| Publisher | Approved content | Channel formatting | Publish approved content | No |
| Administrator | All records | All records | Yes | Yes |

## 13 Data model

Core entities:

- `User`
- `Role`
- `Trend`
- `Source`
- `LearningPath`
- `LearningActivity`
- `Quiz`
- `Question`
- `ProgressRecord`
- `Bookmark`
- `ContentDraft`
- `GenerationRequest`
- `PromptTemplate`
- `ModelConfiguration`
- `ReviewEvent`
- `AnalyticsEvent`

## 14 Technical requirements for Codex implementation

### Current baseline

- React and Vite frontend.
- `lucide-react` for interface icons.
- GitHub repository: `dannykosasih/ai-trend-lab`.
- GitHub Pages deployment via `.github/workflows/deploy-pages.yml`.
- Current MVP data is local mock data and must be replaced with a persistent data layer.

### Recommended next architecture

- React frontend with route-based pages for Landing, Explore, Trend Detail, Learn, Create, and My Lab.
- Server-side API layer for source ingestion and AI generation.
- PostgreSQL for users, trends, sources, progress, drafts, and review events.
- Vector search for related topics and source-grounded retrieval.
- Authentication with role-based access control.
- Background jobs for source collection, freshness checks, and generation queues.
- Analytics events designed around learning and content outcomes rather than vanity metrics.

### Suggested project structure

```text
src/
  app/
    routes/
      landing/
      explore/
      trend/
      learn/
      create/
      my-lab/
  components/
    doodles/
    layout/
    trend-cards/
    learning/
    generator/
  data/
  lib/
    api/
    analytics/
    content/
  styles/
    tokens.css
    doodles.css
```

## 15 Non-functional requirements

- Responsive and mobile-first.
- WCAG 2.2 AA-oriented accessibility.
- Keyboard navigable controls and visible focus states.
- Good contrast despite the playful palette.
- Fast public page load and lazy loading for non-critical media.
- Secure authentication and protected model credentials.
- Rate limits and usage budgets for AI generation.
- Retryable background jobs and observable failures.
- Audit history for editor actions and publishing decisions.
- Privacy controls for prompts, drafts, and learner progress.

## 16 MVP delivery sequence

### Phase 1 Landing and visual system

- Implement new color tokens, playful display font, paper surfaces, doodle primitives, stickers, and hero composition.
- Replace the current generic dashboard hero with the stronger landing-page direction.
- Add responsive navigation and CTA routing.

### Phase 2 Explore and trend detail

- Add route-based Explore page.
- Add trend detail pages with source sections and learning level switcher.
- Add search, filter, bookmarks, and saved topics.

### Phase 3 Learn

- Add learning paths, activities, quizzes, streaks, and progress persistence.

### Phase 4 Create

- Add server-side generation workflow.
- Add channel templates, editing actions, citation retention, review states, and export.

### Phase 5 Operations

- Add authentication, role permissions, admin controls, analytics, source freshness checks, and deployment hardening.

## 17 MVP acceptance checklist

- [ ] Landing page matches the approved editorial luxury and playful doodle direction.
- [ ] Playful display font is used for hero and high-level labels only.
- [ ] Explore page supports search and category filtering.
- [ ] Trend cards show source count, difficulty, reading time, and action.
- [ ] Trend details include plain-language and deeper explanations.
- [ ] Learners can save topics and track activity completion.
- [ ] Content drafts are generated from approved topics only.
- [ ] Drafts retain citations and show AI-assisted status.
- [ ] Editors can approve, request changes, archive, and review history.
- [ ] Production build passes and GitHub Pages deployment is healthy.
- [ ] Mobile and keyboard QA passes for critical flows.

## 18 Open decisions

1. Which learner segment is primary for the pilot: students, professionals, educators, or creators?
2. Which two publishing channels should be prioritized after Website content?
3. Which source tiers are approved for automated collection?
4. Which model provider and monthly generation budget will be used?
5. Should the visual doodle system be implemented with CSS/SVG primitives or a small illustration asset library?
6. Which authentication provider and database should be used for the production build?

## 19 Codex starting instruction

Build the next increment from the GitHub repository `dannykosasih/ai-trend-lab`. Start with the visual system and landing page. Preserve the working Explore interactions while introducing route structure, reusable design tokens, a playful display font, doodle primitives, and responsive layout. Do not connect live AI generation until the source, review, and provenance model is defined. Keep all AI-assisted content clearly labeled and require human approval before publication.
