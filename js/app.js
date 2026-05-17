'use strict';

// ── Data loading ──────────────────────────────────────────────────────────────
const DATA_FILES = ['profile', 'experience', 'projects', 'skills', 'achievements', 'courses', 'conferences', 'publications', 'education'];

async function loadData() {
  const results = await Promise.all(
    DATA_FILES.map(f => fetch(`data/${f}.json`).then(r => r.json()))
  );
  return Object.fromEntries(DATA_FILES.map((k, i) => [k, results[i]]));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tagHTML(text, variant = '') {
  return `<span class="tag ${variant}">${esc(text)}</span>`;
}

function makePill(text) {
  return `<span class="skill-pill">${esc(text)}</span>`;
}

// ── Section renderers ─────────────────────────────────────────────────────────

function renderHero(p) {
  document.getElementById('hero').innerHTML = `
    <div class="container">
      <div class="hero-content fade-in">
        <div class="hero-badge">
          <span class="dot"></span>
          <span>Available for new opportunities</span>
        </div>
        <div class="hero-name">${esc(p.name)}</div>
        <div class="hero-title">${esc(p.title)}</div>
        <div class="hero-tagline">
          ${p.tagline.split(' · ').map((t, i) => tagHTML(t, ['', 'cyan', 'purple'][i] || '')).join('')}
        </div>
        <p class="hero-summary">${esc(p.summary)}</p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary">View Projects</a>
          <a href="${esc(p.resume)}" download class="btn btn-outline">Download Resume</a>
        </div>
        <div class="hero-stats">
          ${p.stats.map(s => `
            <div class="hero-stat">
              <span class="hero-stat-value">${esc(s.value)}</span>
              <span class="hero-stat-label">${esc(s.label)}</span>
            </div>`).join('')}
        </div>
        <div class="hero-links">
          ${heroLink(githubIcon(), p.github, 'GitHub')}
          ${heroLink(linkedinIcon(), p.linkedin, 'LinkedIn')}
          ${heroLink(emailIcon(), `mailto:${p.email}`, p.email)}
          ${p.website ? heroLink(webIcon(), p.website, 'kshitij.cc') : ''}
        </div>
      </div>
    </div>`;
}

function heroLink(icon, href, label) {
  return `<a href="${esc(href)}" class="hero-link" target="_blank" rel="noopener">${icon} ${esc(label)}</a>`;
}

function renderExperience(list) {
  const items = list.map((e, i) => `
    <div class="timeline-item fade-in" style="transition-delay:${i * 60}ms">
      <div class="timeline-dot ${e.current ? 'current' : ''}"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <span class="timeline-company">${esc(e.company)}</span>
          ${e.current ? tagHTML('Current', 'green') : ''}
        </div>
        <div class="timeline-role">${esc(e.role)}</div>
        <div class="timeline-meta">
          <span>${esc(e.started_at)} – ${esc(e.ended_at)}</span>
          <span>${esc(e.location)}</span>
        </div>
        ${e.context ? `<div class="timeline-context">${esc(e.context)}</div>` : ''}
        ${e.description.length ? `
          <ul class="timeline-desc">
            ${e.description.map(d => `<li>${esc(d)}</li>`).join('')}
          </ul>` : ''}
        ${e.technologies.length ? `
          <div class="timeline-tech">
            ${e.technologies.map(t => tagHTML(t)).join('')}
          </div>` : ''}
      </div>
    </div>`).join('');

  document.getElementById('experience-list').innerHTML = items;
}

function renderProjects(list) {
  const categories = ['All', ...new Set(list.map(p => p.category))];

  document.getElementById('project-filters').innerHTML = categories.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${esc(c)}">${esc(c)}</button>`
  ).join('');

  document.getElementById('projects-grid').innerHTML = list.map(p => `
    <div class="project-card fade-in" data-category="${esc(p.category)}">
      ${p.image ? `<img class="project-img" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : ''}
      <div class="project-header">
        <span class="project-name">${esc(p.title)}</span>
        <span class="project-date">${esc(p.started_at)}${p.ended_at !== p.started_at ? ' – ' + esc(p.ended_at) : ''}</span>
      </div>
      ${tagHTML(p.category, 'cyan')}
      <ul class="project-desc">
        ${p.description.map(d => `<li>${esc(d)}</li>`).join('')}
      </ul>
      <div class="project-tech">
        ${p.technologies.map(t => makePill(t)).join('')}
      </div>
      <div class="project-links">
        ${p.demo ? `<a href="${esc(p.demo)}" class="project-link" target="_blank" rel="noopener">${externalIcon()} Live Demo</a>` : ''}
        ${p.github ? `<a href="${esc(p.github)}" class="project-link" target="_blank" rel="noopener">${githubIcon()} Source</a>` : ''}
      </div>
    </div>`).join('');

  // Filter logic
  document.getElementById('project-filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'All' && card.dataset.category !== filter);
    });
  });
}

function renderSkills(data) {
  document.getElementById('skill-categories').innerHTML = data.categories.map(cat => `
    <div class="fade-in">
      <div class="skill-category-title"><span>${cat.icon}</span> ${esc(cat.name)}</div>
      <div class="skill-pills">${cat.skills.map(makePill).join('')}</div>
    </div>`).join('');
}

function renderCourses(list) {
  const categories = ['All', ...new Set(list.map(c => c.category))];

  document.getElementById('courses-filters').innerHTML = categories.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${esc(c)}">${esc(c)}</button>`
  ).join('');

  document.getElementById('courses-grid').innerHTML = list.map(c => `
    <div class="course-card fade-in" data-category="${esc(c.category)}">
      <div class="course-title">${esc(c.title)}</div>
      ${tagHTML(c.category, 'purple')}
      <div class="course-meta">
        <span class="course-platform">${esc(c.platform)}</span>
        <span class="course-date">${esc(c.date)}</span>
      </div>
    </div>`).join('');

  document.getElementById('courses-filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.course-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'All' && card.dataset.category !== filter);
    });
  });
}

function renderAchievements(list) {
  document.getElementById('achievements-grid').innerHTML = list.map(a => `
    <div class="achievement-card fade-in">
      <div class="achievement-icon">${a.icon}</div>
      <div>
        <div class="achievement-title">${esc(a.title)}</div>
        <div class="achievement-meta">${esc(a.org)} · ${esc(a.years)}</div>
        <div class="achievement-desc">${esc(a.description)}</div>
      </div>
    </div>`).join('');
}

function renderPublicationsConferences(pubs, confs) {
  document.getElementById('publications-list').innerHTML = pubs.map(p => `
    <div class="pub-card fade-in">
      <div class="pub-venue">${esc(p.venue)} · ${esc(p.date)}</div>
      <div class="pub-title">${esc(p.title)}</div>
      <p class="pub-desc">${esc(p.description)}</p>
      ${p.url ? `<a href="${esc(p.url)}" class="pub-doi" target="_blank" rel="noopener">DOI: ${esc(p.doi)}</a>` : ''}
    </div>`).join('');

  document.getElementById('conferences-list').innerHTML = `<div class="conf-list">` +
    confs.map(c => `
      <div class="conf-item fade-in">
        <span class="conf-role-badge ${c.role === 'Attendee' ? 'attendee' : ''}">${esc(c.role)}</span>
        <div>
          <div class="conf-title">${esc(c.title)}</div>
          <div class="conf-meta">${esc(c.org)} · ${esc(c.date)} · ${esc(c.location)}</div>
        </div>
      </div>`).join('') + `</div>`;
}

function renderContact(p) {
  document.getElementById('contact-links').innerHTML = [
    { icon: emailIcon(), href: `mailto:${p.email}`, label: p.email },
    { icon: linkedinIcon(), href: p.linkedin, label: 'LinkedIn' },
    { icon: githubIcon(), href: p.github, label: 'GitHub' },
    { icon: webIcon(), href: p.website, label: 'kshitij.cc' },
  ].map(l => `
    <a href="${esc(l.href)}" class="contact-link" target="_blank" rel="noopener">
      ${l.icon} ${esc(l.label)}
    </a>`).join('');
}

// ── Chart ─────────────────────────────────────────────────────────────────────
function renderChart(data) {
  const ctx = document.getElementById('expertise-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.expertise.map(d => d.label),
      datasets: [{
        data: data.expertise.map(d => d.value),
        backgroundColor: [
          'rgba(245,158,11,0.75)', 'rgba(251,146,60,0.75)', 'rgba(252,211,77,0.65)',
          'rgba(52,211,153,0.65)', 'rgba(253,186,116,0.55)'
        ],
        borderColor: [
          '#f59e0b', '#fb923c', '#fcd34d', '#34d399', '#fdba74'
        ],
        borderWidth: 1,
        borderRadius: 6,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.raw}%` }
        }
      },
      scales: {
        x: {
          min: 0, max: 100,
          grid: { color: 'rgba(255,200,100,0.05)' },
          ticks: { color: '#5c4a30', callback: v => `${v}%` }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#a89070', font: { size: 12 } }
        }
      }
    }
  });
}

// ── Navigation ────────────────────────────────────────────────────────────────
function setupNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Scroll animations ─────────────────────────────────────────────────────────
function setupScrollAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const githubIcon = () => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`;
const linkedinIcon = () => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const emailIcon = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
const webIcon = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const externalIcon = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

// ── Bootstrap ─────────────────────────────────────────────────────────────────
async function init() {
  try {
    const data = await loadData();
    renderHero(data.profile);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderSkills(data.skills);
    renderCourses(data.courses);
    renderAchievements(data.achievements);
    renderPublicationsConferences(data.publications, data.conferences);
    renderContact(data.profile);

    // Chart renders after Chart.js script loads
    const chartScript = document.getElementById('chartjs-script');
    if (chartScript) {
      chartScript.addEventListener('load', () => renderChart(data.skills));
    } else {
      renderChart(data.skills);
    }

    setupNav();
    // Small delay so rendered elements are in DOM before observing
    requestAnimationFrame(() => requestAnimationFrame(setupScrollAnimations));
  } catch (err) {
    console.error('Failed to load portfolio data:', err);
    document.getElementById('hero').innerHTML = `
      <div class="container" style="padding-top:40px; color: var(--text-2);">
        <p>⚠️ Portfolio requires a local HTTP server. Run: <code>python3 -m http.server 8000</code></p>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
