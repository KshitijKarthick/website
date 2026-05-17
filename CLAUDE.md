# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static, single-page portfolio website for **Kshitij Karthick** — Lead Data Scientist / ML Engineer with 8+ years of experience. The site is entirely data-driven: all content lives in JSON files under `data/`, and the HTML shell never needs editing to update portfolio content.

## Running Locally

The site uses `fetch()` to load JSON data and **requires a local HTTP server** (file:// protocol blocks fetch):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or: `npx serve .` / `npx http-server .`

No build step, no bundler, no dependencies to install.

## Architecture

```
index.html          # Static HTML shell — sections are empty divs populated by JS
css/styles.css      # All styles: CSS custom properties, responsive grid/flex, animations
js/app.js           # Fetches all JSON in parallel, renders every section, sets up chart + nav
data/
  profile.json      # Name, title, summary, contact links, hero stats
  experience.json   # Work history array (most recent first)
  projects.json     # Side projects with tech stack, links, category
  skills.json       # Skill categories + expertise levels for the bar chart
  achievements.json # Awards/hackathons/recognition
  courses.json      # Courses and certifications
  conferences.json  # Conferences attended or presented at
  publications.json # Research papers with DOI
  education.json    # Academic history
```

Chart.js 4.x is loaded from CDN (`defer`) for the horizontal expertise bar chart in the Skills section.

## How to Update Content

**Never edit `index.html` or `css/styles.css` for content changes.** Edit the relevant JSON file only:

| What to update | File |
|---|---|
| Bio, title, contact, links | `data/profile.json` |
| New job / role change | `data/experience.json` (add entry at top) |
| New project | `data/projects.json` |
| New skill or category | `data/skills.json` |
| New course / cert | `data/courses.json` |
| New achievement | `data/achievements.json` |
| Conference | `data/conferences.json` |
| Publication | `data/publications.json` |

## Key Design Decisions

- **Vanilla JS only** — no React/Vue/build tools; keeps initial load fast and maintenance simple.
- **CSS custom properties** (`--accent`, `--bg-card`, etc.) in `:root` — change the entire color scheme from one place in `styles.css`.
- **IntersectionObserver** for scroll-triggered fade-ins; `defer` on all scripts; fonts use `display=swap`.
- **Category filter buttons** on Projects and Courses sections are auto-generated from the data — add a new `category` value in JSON and a filter button appears automatically.
- The `hidden` CSS class on cards is toggled by filter buttons — no re-render needed.
- Old CommonJS `.js` data files (`data/*.js` with `exports.`) are superseded by the JSON files and can be deleted.

## Persona / Tone

- Primary identity: **ML Engineering first**, Data Science second, MLOps strong suit.
- Current role: Lead Data Scientist at EPAM Systems (Feb 2025–Present).
- Key differentiators: productionising ML at scale, MLOps tooling, experiment platforms, cross-language NLP research.
- Resume PDF: `data/Resume_20241021.pdf` (linked from hero and nav).
