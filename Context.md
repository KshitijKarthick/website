# Context.md — Kshitij Karthick Portfolio

Full background and decision history for reference when resuming work in a new session.

---

## Identity

- **Name:** Kshitij Karthick
- **Primary title:** Lead Data Scientist (EPAM Systems, Feb 2025–Present)
- **Self-description:** ML Engineer — productionising large-scale data-centric ML applications
- **Location:** Bengaluru, Karnataka, India (previously Berlin, Germany at Zalando)
- **Email:** kshitij.karthick@gmail.com | **Phone:** +91-7795066036
- **GitHub:** github.com/kshitijkarthick | **LinkedIn:** linkedin.com/in/kshitijkarthick | **Web:** kshitij.cc

---

## Career Chronology

| Period | Company | Role |
|---|---|---|
| Feb 2025–Present | EPAM Systems | Lead Data Scientist |
| May 2023–Jan 2025 | Publicis Sapient (Client: Albertsons) | Senior Consultant — Data Science |
| Jun 2018–May 2022 | Zalando SE, Berlin | Applied Scientist |
| Mar 2017–Mar 2018 | racetrack.ai (FuteMind Technologies) | Research Scientist |
| Jul 2016–Feb 2017 | Jnaapti | Product Engineer |
| Sep 2015–Jan 2016 | Studeyo | Intern |
| Jul 2015–Aug 2015 | Indian Institute of Science | Research Intern |
| Jan 2015–Jun 2015 | Jnaapti | Intern |

---

## Key Accomplishments

- **Publicis Sapient / Albertsons:** Model Deployment Framework presented at **DATA+AI Summit 2024, San Francisco**; improved demand forecaster performance by **80.56%** using Databricks Serverless.
- **Zalando:** Forecasting model for **500,000+ articles across 14 countries**; experiment platform increased experiments by **70%**; reduced ML maintenance from 6h/week to 1h/week; logistic cost model at **82% accuracy**.
- **racetrack.ai:** NLP classification engine at **85%+ accuracy**; server performance improved **8×**.
- **Jnaapti:** Code evaluation performance improved **400%** via multiprocessing; trained **200+ participants**.

---

## Top Skills

Large Language Model Operations (LLMOps), Hugging Face, vllm, MLOps, Experiment Platforms, NLP, Databricks, Spark, Python

---

## Publications

- **"Establishing Semantic Relationships Across Languages Using Word Vectors"**
  IEEE CSITSS 2016 · DOI: 10.1109/CSITSS.2016.7779382
  (basis for the T-Vecs open-source project and IISc internship)

---

## Education

- B.E. Computer Science & Engineering — Visvesvaraya Technological University (2012–2016)

## Languages

English · Kannada · Hindi · French

---

## Site Architecture Decisions

- **Vanilla HTML/CSS/JS** — no framework, no build step. Chosen for simplicity, fast load, and zero maintenance overhead.
- **Data-driven via JSON** — all content in `data/*.json`. `index.html` is a static shell; no HTML edits needed for content updates.
- **Chart.js 4.x** via CDN with `defer` — both Chart.js and app.js are deferred; app.js checks `typeof Chart !== 'undefined'` directly rather than listening for the load event (which fires before app.js runs when both are deferred).
- **JSON over YAML** — native browser parsing, zero dependencies, data is simple enough.
- **Old CommonJS data files** (`data/*.js` with `exports.X`) — fully deleted; superseded by JSON. The old `experience.js` was missing EPAM Systems and Publicis Sapient — both added to `experience.json`.

---

## Theme History

Four themes were explored and iterated. **Warm Dark is the current theme.**

| Theme | Status | Notes |
|---|---|---|
| Warm Dark (amber/orange on near-black brown) | **Current** | `--accent: #f59e0b`, `--bg-0: #0f0b06` |
| Glassmorphism | Tried, reverted | `backdrop-filter: blur()` — visually rich but felt excessive |
| Terminal / Monospace | Tried, reverted | Green-on-black with Fira Code — too niche |
| Original light | Replaced | Starting point, replaced in full rebuild |

---

## Mobile Responsiveness

Key fixes applied (CSS):
- `* { min-width: 0; }` globally — prevents flex/grid children from overflowing their container (the root cause of most mobile overflow issues)
- `p, li, span { overflow-wrap: break-word; word-break: break-word; }` — text wraps instead of clipping
- `@media (max-width: 768px)` — hero stats use a 2-column CSS Grid; hero links `flex-wrap: wrap`; email link truncates with ellipsis via `.email-link` class
- `@media (max-width: 480px)` — single-column grids for projects/achievements/courses; stacked CTA buttons

The `heroLink()` function in `app.js` accepts an optional `cls` parameter so the email link gets the `email-link` class for mobile truncation.

---

## Favicon

`assets/favicon.svg` — bold amber **K** (`#f59e0b`) on dark brown (`#231a0f`) background with rounded corners (rx=7). SVG format: crisp at all sizes, no separate `.ico` needed. Referenced in `index.html` as `<link rel="icon" type="image/svg+xml">`.

---

## Caching & Cloudflare

Cloudflare sits in front of the site. To prevent stale CSS/JS being served after a deploy:

1. **`index.html`** references assets with `?v=__BUILD__` placeholders.
2. **Dockerfile** runs `sed` at build time to replace `__BUILD__` with the git short hash passed via `--build-arg BUILD_VERSION`.
3. **`deploy.sh`** computes the version, passes it to the build, and restarts the container.
4. **nginx** serves HTML with `Cache-Control: no-cache, no-store` (via `location /`) so visitors always get the latest HTML with current asset hashes.
5. **Cloudflare** — recommended: add a Cache Rule to bypass cache for `/` and `/*.html` in the Cloudflare dashboard.

CSS/JS are still served with `immutable, 1y` — safe because the URL changes on every deploy.

---

## Deployment

### Quick deploy
```bash
./deploy.sh
```

`deploy.sh` auto-detects `docker compose` (v2) vs `docker-compose` (v1) and uses whichever is available on the host.

### File sync only (no rebuild)
```bash
rsync -avz --checksum ./ user@host:/path/to/portfolio/
```

### Infrastructure
- Reverse proxy: **Traefik** with `web` external Docker network; certresolver named `myresolver`
- Domains: `kshitij.cc`, `kshitijkarthick.me` (+ www variants)
- TLS: Let's Encrypt via Traefik
- nginx config and logs are volume-mounted (`server/nginx.conf`, `server/logs/`) so they persist and can be monitored outside the container

### Pending prod checklist
- [ ] Remove `ports: - "8000:80"` from `docker-compose.yml` (added for local testing only)
- [ ] Add Cloudflare Cache Rule to bypass HTML caching

---

## Known Issues & Fixes Applied

| Issue | Root cause | Fix |
|---|---|---|
| Chart "Expertise by Domain" empty | `defer` fires Chart.js `load` event before app.js runs | Check `typeof Chart !== 'undefined'` directly instead of event listener |
| nginx `getpwnam("nginx") failed` | `user nginx;` directive in volume-mounted config | Removed `user nginx;` line from nginx.conf |
| `docker-compose` KeyError `ContainerConfig` | v1.29.2 bug with newer Docker | Run `docker-compose down` first, or upgrade to Compose v2 |
| SCP `Received message too long` | Remote `~/.bashrc` prints `Agent pid ...` to stdout | Add `> /dev/null` to `eval $(ssh-agent)` line in `.bashrc`, or wrap in `[[ $- == *i* ]]` interactive shell guard |
| Mobile overflow at 400px | `min-width: auto` on flex children | `* { min-width: 0; }` global reset |
| Stale CSS/JS after deploy (Cloudflare) | `immutable, 1y` cache with no URL change | `?v=__BUILD__` query string stamped at Docker build time |
