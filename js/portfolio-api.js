/* Fetches live data from Flask API and renders it into the portfolio */

// In production this points to your Railway backend URL
// In development it points to local Flask
const API_URL = window.PORTFOLIO_API_URL || 'http://localhost:5000/api/portfolio';

async function loadPortfolio() {
  try {
    const res  = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    renderProfile(data.profile);
    renderSkills(data.skills);
    renderTools(data.tools);
    renderExperience(data.experience);
    renderEducation(data.education);
    renderProjects(data.projects);
  } catch (err) {
    console.warn('Could not reach API, using static content.', err);
  }
}

/* ── Profile ─────────────────────────────────────────────────────────── */
function renderProfile(p) {
  if (!p || !p.name) return;

  setText('#profile-name',        p.name);
  setText('#profile-title',       p.title);
  setText('#profile-experience',  p.experience_years + ' Years Experience');
  setText('#profile-address',     p.address);
  setText('#profile-about-1',     p.about_text);
  setText('#profile-education-val',  'Master\'s in Computer Applications');
  setText('#stat-projects',       p.projects_count || '20+');
  setText('#stat-experience',     p.experience_years || '5+');

  // Detail rows
  setText('#detail-address',      p.address);
  setText('#detail-phone',        p.phone);
  setText('#detail-email',        p.email);

  // LinkedIn button href
  const li = document.getElementById('linkedin-btn');
  if (li && p.linkedin_url) li.href = p.linkedin_url;

  // Contact section
  setText('#contact-address',     p.address);
  const phoneLink = document.getElementById('contact-phone');
  if (phoneLink) { phoneLink.textContent = p.phone; phoneLink.href = 'tel:' + p.phone; }
  const emailLink = document.getElementById('contact-email');
  if (emailLink) { emailLink.textContent = p.email; emailLink.href = 'mailto:' + p.email; }
}

/* ── Skills ──────────────────────────────────────────────────────────── */
function renderSkills(skills) {
  if (!skills || !skills.length) return;
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skills.map(s => `
    <p class="text-gray-600 text-sm mb-1 font-medium">
      ${s.name} <span class="float-right text-indigo-500">${s.percentage}%</span>
    </p>
    <div class="skill-bar-track">
      <div class="skill-bar" data-width="${s.percentage}"></div>
    </div>
  `).join('');

  // Observe the container (has real dimensions).
  // Zero-width bars can't trigger IntersectionObserver by themselves.
  const containerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Double rAF: let browser paint width:0 first, then animate
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.querySelectorAll('.skill-bar').forEach(bar => {
              bar.style.width = bar.dataset.width + '%';
            });
          });
        });
        containerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  containerObserver.observe(container);
}

/* ── Tools ───────────────────────────────────────────────────────────── */
function renderTools(tools) {
  if (!tools || !tools.length) return;
  const container = document.getElementById('tools-container');
  if (!container) return;

  container.innerHTML = tools.map(t => `
    <a href="${t.link_url || '#'}" target="_blank" rel="noreferrer" class="tech-icon">
      <img src="${t.icon_url}" alt="${t.name}" width="36" height="36"/>
    </a>
  `).join('');
}

/* ── Experience ──────────────────────────────────────────────────────── */
function renderExperience(experience) {
  if (!experience || !experience.length) return;
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = experience.map((exp, i) => `
    <div class="glass-card p-6 w-full fade-up fade-up-delay-${(i % 2) + 1}">
      <span class="text-xs font-bold uppercase tracking-widest" style="color:var(--${i === 0 ? 'primary' : 'secondary'})">
        ${exp.start_date} – ${exp.end_date}
      </span>
      <h3 class="text-lg font-bold text-gray-800 mt-1">${exp.role}</h3>
      <h4 class="text-sm font-semibold text-gray-600 mb-1">${exp.company} · ${exp.location || ''}</h4>
      ${exp.summary ? `<p class="text-xs text-gray-500 mb-3">${exp.summary}</p>` : ''}
      <ul class="list-disc list-inside text-gray-600 text-sm space-y-1">
        ${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Re-trigger fade-up observer
  container.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
}

/* ── Education ───────────────────────────────────────────────────────── */
function renderEducation(education) {
  if (!education || !education.length) return;
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = education.map((edu, i) => `
    <div class="glass-card p-6 w-full fade-up fade-up-delay-${(i % 2) + 1}">
      <span class="text-xs font-bold uppercase tracking-widest" style="color:var(--${i === 0 ? 'primary' : 'secondary'})">
        ${edu.start_year} – ${edu.end_year}
      </span>
      <h4 class="text-md font-bold text-gray-800 mt-1">${edu.degree}</h4>
      <p class="text-gray-600 text-sm">${edu.institution}</p>
      <p class="text-gray-500 text-sm">${edu.location || ''}${edu.cgpa ? ' · CGPA: ' + edu.cgpa : ''}</p>
      ${edu.coursework ? `<p class="text-gray-500 text-xs mt-1">${edu.coursework}</p>` : ''}
    </div>
  `).join('');

  container.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
}

/* ── Projects ────────────────────────────────────────────────────────── */
function renderProjects(projects) {
  if (!projects || !projects.length) return;
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects.map((p, i) => `
    <div class="glass-card flex flex-col h-full overflow-hidden fade-up fade-up-delay-${(i % 3) + 1}">
      ${p.image_url ? `<img src="${p.image_url}" alt="${p.title}" class="w-full rounded-t-2xl object-cover" style="height:180px" onerror="this.style.display='none'">` : ''}
      <div class="p-5 flex-grow flex flex-col">
        <h3 class="font-bold text-base text-gray-800 mb-2">${p.title}</h3>
        <p class="text-gray-500 text-sm line-clamp-3">${p.description}</p>
        ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="mt-3 text-xs font-semibold" style="color:var(--primary)">View on GitHub →</a>` : ''}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
}

/* ── Helper ──────────────────────────────────────────────────────────── */
function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el && text) el.textContent = text;
}

// Shared fade observer (defined in index.html inline script, expose globally)
let fadeObserver;

document.addEventListener('DOMContentLoaded', () => {
  // ── Shared fade-up observer ──────────────────────────────────────────
  fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  // ── Static skill bars fallback (used before API data loads) ─────────
  // Observe the skills container; animate bars once it enters viewport
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    const staticBarObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              skillsContainer.querySelectorAll('.skill-bar').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
              });
            });
          });
          staticBarObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    staticBarObserver.observe(skillsContainer);
  }

  // ── Fetch live data from API and re-render sections ──────────────────
  loadPortfolio();
});
