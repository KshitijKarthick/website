# Kshitij Karthick — Portfolio

Personal portfolio site for [kshitij.cc](https://kshitij.cc) — Lead Data Scientist & ML Engineer.

Static single-page site with no build step. All content is driven by JSON config files; the HTML shell never needs editing for content updates.

## Running Locally

Requires a local HTTP server (fetch() is blocked on `file://`):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Alternatives: `npx serve .` or `npx http-server .`

## Updating Content

Edit the relevant file in `data/` — the site re-renders on next load.

| What to change | File |
|---|---|
| Bio, title, summary, contact links | `data/profile.json` |
| New job or role change | `data/experience.json` (add at top) |
| New project | `data/projects.json` |
| Skill or skill category | `data/skills.json` |
| Course or certification | `data/courses.json` |
| Achievement or award | `data/achievements.json` |
| Conference | `data/conferences.json` |
| Research publication | `data/publications.json` |

Adding a new `category` value in `projects.json` or `courses.json` automatically creates a new filter button — no JS changes needed.

## Structure

```
index.html          # HTML shell — empty section divs, no content
css/styles.css      # All styles; edit :root variables for theming
js/app.js           # Fetches JSON, renders sections, chart, nav, filters
data/
  profile.json
  experience.json
  projects.json
  skills.json
  achievements.json
  courses.json
  conferences.json
  publications.json
  education.json
  Resume_20241021.pdf
  Profile.pdf
CLAUDE.md           # Guidance for AI assistants working in this repo
Context.md          # Full resume context and career notes
```

## Tech

Vanilla HTML · CSS · JavaScript — no frameworks, no bundler, no dependencies.  
[Chart.js 4](https://www.chartjs.org/) loaded from CDN for the skills expertise chart.
