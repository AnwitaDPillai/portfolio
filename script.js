/**
 * Anwita D Pillai — Portfolio Engine
 * Core Architecture & Motion Orchestration
 * Based on agents.md specifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initSmoothScroll();
  initNavStates();
  initScrollHighlights();
  initDataEngine();
});

/**
 * Sticky Navigation Scroll Elevation
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Smooth Navigation & Offset Calculation for Sticky Header
 */
function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('a[href^="#"]');

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      let targetId = trigger.getAttribute('href');
      if (!targetId || targetId === '#') return;

      // Map #index to #publications if #index is not a full section
      if (targetId === '#index') {
        const publicationsSection = document.getElementById('publications');
        if (publicationsSection) {
          targetId = '#publications';
        }
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without abrupt jumping
        history.pushState(null, '', targetId);
      }
    });
  });
}

/**
 * Dynamic Nav Link Active State Manager
 */
function initNavStates() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Track scroll position to toggle active state between sections
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        let activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        // If viewing publications, awards, or writings, highlight INDEX if no specific link
        if (!activeLink && (id === 'publications' || id === 'awards' || id === 'recent-writings')) {
          activeLink = document.querySelector('.nav-link[href="#index"]');
        }

        if (activeLink) {
          navLinks.forEach((l) => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section[id]');
  sections.forEach((sec) => sectionObserver.observe(sec));
}

/**
 * Task 1: Motion - Gold Highlights Reveal on Scroll via IntersectionObserver
 */
function initScrollHighlights() {
  const highlightElements = document.querySelectorAll('.highlight-gold');
  if (!highlightElements.length) return;

  const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -40px 0px'
  };

  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-highlight-index') || '1', 10);
        // Staggered reveal based on occurrence index
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, (index - 1) * 160);

        highlightObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  highlightElements.forEach((el) => highlightObserver.observe(el));
}

/**
 * ==========================================================================
 * DATA RENDERING LOGIC: Publications, Awards, and Recent Writings
 * ==========================================================================
 */

/**
 * Render Publications Table Rows
 * For Publications: Render the Title and Publisher. Make Title an <a> tag linking to link.
 */
function renderPublications(items) {
  const container = document.getElementById('publications-body');
  if (!container) return;

  if (!items || !items.length) {
    container.innerHTML = `
      <div class="table-row" role="row">
        <div class="table-cell table-cell-primary" role="cell">No publications archived yet.</div>
        <div class="table-cell table-cell-meta" role="cell">—</div>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const link = item.link || '#';
      const isExternal = link !== '#' && !link.startsWith('#');
      const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

      return `
        <div class="table-row" role="row">
          <div class="table-cell table-cell-primary" role="cell">
            <a href="${link}" class="table-cell-link" ${targetAttr}>${item.title}</a>
          </div>
          <div class="table-cell table-cell-meta" role="cell">${item.publisher || '—'}</div>
        </div>
      `;
    })
    .join('');
}

/**
 * Render Awards Table Rows
 * For Awards: Render the Honour and Year.
 */
function renderAwards(items) {
  const container = document.getElementById('awards-body');
  if (!container) return;

  if (!items || !items.length) {
    container.innerHTML = `
      <div class="table-row" role="row">
        <div class="table-cell table-cell-primary" role="cell">No honours recorded yet.</div>
        <div class="table-cell table-cell-meta" role="cell">—</div>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      return `
        <div class="table-row" role="row">
          <div class="table-cell table-cell-primary" role="cell">${item.honour}</div>
          <div class="table-cell table-cell-meta" role="cell">${item.year || '—'}</div>
        </div>
      `;
    })
    .join('');
}

/**
 * Render Recent Writings Table Rows
 * Only display article titles (single column, no date column)
 */
function renderRecentWritings(items) {
  const container = document.getElementById('writings-body');
  if (!container) return;

  if (!items || !items.length) {
    container.innerHTML = `
      <div class="table-row" role="row">
        <div class="table-cell table-cell-primary" role="cell">No recent writings available.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const link = item.link || 'https://anwitadpillai.substack.com/';
      const isExternal = link !== '#' && !link.startsWith('#');
      const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

      return `
        <div class="table-row" role="row">
          <div class="table-cell table-cell-primary" role="cell">
            <a href="${link}" class="table-cell-link" ${targetAttr}>${item.title}</a>
          </div>
        </div>
      `;
    })
    .join('');
}

/**
 * Date Formatter for Substack Articles
 */
function formatSubstackDate(dateStr) {
  if (!dateStr) return '';
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Fetch Publications dataset and render into DOM
 */
async function fetchPublications() {
  try {
    const response = await fetch('/data/publications.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch publications.json (HTTP ${response.status})`);
    }
    const data = await response.json();
    console.log('[Data Engine] Publications successfully fetched:', data);
    renderPublications(data);
    return data;
  } catch (error) {
    console.error('[Data Engine] Error fetching publications:', error);
    renderPublications([]);
    return [];
  }
}

/**
 * Fetch Awards dataset and render into DOM
 */
async function fetchAwards() {
  try {
    const response = await fetch('/data/awards.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch awards.json (HTTP ${response.status})`);
    }
    const data = await response.json();
    console.log('[Data Engine] Awards successfully fetched:', data);
    renderAwards(data);
    return data;
  } catch (error) {
    console.error('[Data Engine] Error fetching awards:', error);
    renderAwards([]);
    return [];
  }
}

/**
 * Fetch Recent Writings
 * Fetches latest 5 articles from the Substack RSS feed via rss2json API:
 * https://api.rss2json.com/v1/api.json?rss_url=https://anwitadpillai.substack.com/feed
 * Dynamically renders article titles into the Recent Writings table.
 */
async function fetchRecentWritings() {
  const substackFeedUrl = 'https://anwitadpillai.substack.com/feed';
  const rssApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(substackFeedUrl)}`;

  try {
    const response = await fetch(rssApiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const liveArticles = data.items.slice(0, 5).map((post) => ({
          title: post.title,
          link: post.link
        }));
        console.log('[Substack API] Successfully fetched latest 5 live articles:', liveArticles);
        renderRecentWritings(liveArticles);
        return liveArticles;
      }
    }
  } catch (err) {
    console.warn('[Substack API] Live feed query unreachable, falling back to local dataset:', err);
  }

  // Resilient fallback to local ./data/writings.json
  try {
    const response = await fetch('/data/writings.json');
    if (response.ok) {
      const data = await response.json();
      const articles = data.slice(0, 5).map((item) => ({
        title: item.title,
        link: item.link
      }));
      console.log('[Data Engine] Loaded local fallback writings:', articles);
      renderRecentWritings(articles);
      return articles;
    }
  } catch (fallbackError) {
    console.error('[Data Engine] Error fetching writings fallback:', fallbackError);
  }

  renderRecentWritings([]);
  return [];
}

/**
 * Render Experience Accordion Items
 * Header: Employer name and role, Body: Details framed by a red line
 */
function renderExperience(items) {
  const container = document.getElementById('experience-accordion');
  if (!container) return;

  if (!items || !items.length) {
    container.innerHTML = `
      <div class="accordion-item">
        <div class="accordion-header">
          <span class="accordion-employer">No experience records available.</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map((item, idx) => {
      const isOpen = false;
      return `
        <div class="accordion-item ${isOpen ? 'is-open' : ''}" data-accordion-item>
          <button class="accordion-header" aria-expanded="${isOpen}" aria-controls="experience-body-${idx}" id="experience-header-${idx}">
            <span class="accordion-header-copy">
              <span class="accordion-employer">${item.employer}</span>
              <span class="accordion-role">${item.role}</span>
            </span>
            <span class="accordion-icon" aria-hidden="true">[ + ]</span>
          </button>
          <div class="accordion-body" id="experience-body-${idx}" role="region" aria-labelledby="experience-header-${idx}">
            <div class="accordion-content">
              <div class="accordion-red-line" aria-hidden="true"></div>
              <div class="accordion-details">
                <p class="accordion-desc">${item.details}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  initAccordionEvents();
}

/**
 * Accordion Event Handler with Smooth Height Transitions and Icon Rotation
 */
function initAccordionEvents() {
  const accordion = document.getElementById('experience-accordion');
  if (!accordion) return;

  accordion.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const item = header.closest('.accordion-item');
    const isCurrentlyOpen = item.classList.contains('is-open');

    // Toggle clicked item
    if (isCurrentlyOpen) {
      item.classList.remove('is-open');
      header.setAttribute('aria-expanded', 'false');
    } else {
      // Close sibling items for classic archival accordion behavior
      accordion.querySelectorAll('.accordion-item').forEach((sibling) => {
        sibling.classList.remove('is-open');
        const siblingHeader = sibling.querySelector('.accordion-header');
        if (siblingHeader) siblingHeader.setAttribute('aria-expanded', 'false');
      });

      item.classList.add('is-open');
      header.setAttribute('aria-expanded', 'true');
    }
  });
}

/**
 * Render Projects digital filmstrip.
 * The second set of cards creates a seamless desktop marquee loop.
 */
function renderProjects(items) {
  const container = document.getElementById('projects-deck');
  const dialog = document.getElementById('project-description-dialog');
  if (!container) return;

  const projects = items && items.length
    ? items
    : [{ name: 'Archival Dossier Empty', description: 'No active project artefacts logged.', link: '' }];

  const renderCardSet = (isDuplicate = false) => projects
    .map((item, idx) => {
      const cardAttributes = `
        class="project-card"
        data-project-index="${idx}"
        aria-label="Project: ${item.name}"
        ${isDuplicate ? 'aria-hidden="true" tabindex="-1"' : ''}
      `;
      const title = item.link
        ? `<a class="project-card-title" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.name}</a>`
        : `<h3 class="project-card-title">${item.name}</h3>`;
      const cardContent = `
        <span class="project-card-number" aria-hidden="true">[ ${String(idx + 1).padStart(2, '0')} ]</span>
        ${title}
        <p class="project-card-desc">${item.description}</p>
      `;

      return `<article ${cardAttributes} role="article">${cardContent}</article>`;
    })
    .join('');

  container.innerHTML = `${renderCardSet()}${renderCardSet(true)}`;

  if (!dialog) return;

  if (!container.dataset.dialogInitialized) {
    container.addEventListener('click', (event) => {
      if (event.target.closest('a.project-card-title')) return;

      const card = event.target.closest('.project-card');
      if (!card || !container.contains(card)) return;

      const project = projects[Number(card.dataset.projectIndex)];
      if (!project) return;

      dialog.querySelector('.project-dialog-title').textContent = project.name;
      dialog.querySelector('.project-dialog-description').textContent = project.description;
      dialog.showModal();
    });
    container.dataset.dialogInitialized = 'true';
  }

  if (!dialog.dataset.initialized) {
    const closeDialog = () => dialog.close();
    dialog.querySelector('.project-dialog-close').addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.dataset.initialized = 'true';
  }
}

/**
 * Fetch Experience dataset and render accordion into DOM
 */
async function fetchExperience() {
  try {
    const response = await fetch('/data/experience.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch experience.json (HTTP ${response.status})`);
    }
    const data = await response.json();
    console.log('[Data Engine] Experience successfully fetched:', data);
    renderExperience(data);
    return data;
  } catch (error) {
    console.error('[Data Engine] Error fetching experience:', error);
    renderExperience([]);
    return [];
  }
}

/**
 * Fetch Projects dataset and render the digital filmstrip into DOM
 */
async function fetchProjects() {
  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch projects.json (HTTP ${response.status})`);
    }
    const data = await response.json();
    console.log('[Data Engine] Projects successfully fetched:', data);
    renderProjects(data);
    return data;
  } catch (error) {
    console.error('[Data Engine] Error fetching projects:', error);
    renderProjects([]);
    return [];
  }
}

/**
 * Initialize and verify Data Engine architecture
 */
async function initDataEngine() {
  console.log('[Data Engine] Initializing and rendering all data views...');
  try {
    const [publications, awards, writings, experience, projects] = await Promise.all([
      fetchPublications(),
      fetchAwards(),
      fetchRecentWritings(),
      fetchExperience(),
      fetchProjects()
    ]);

    console.log('[Data Engine] All portfolio views successfully rendered:', {
      publicationsCount: publications.length,
      awardsCount: awards.length,
      writingsCount: writings.length,
      experienceCount: experience.length,
      projectsCount: projects.length
    });

    return { publications, awards, writings, experience, projects };
  } catch (err) {
    console.error('[Data Engine] Initialization failed:', err);
  }
}

// Expose functions globally for interactive console inspection and testing
window.fetchPublications = fetchPublications;
window.fetchAwards = fetchAwards;
window.fetchRecentWritings = fetchRecentWritings;
window.fetchExperience = fetchExperience;
window.fetchProjects = fetchProjects;
window.renderExperience = renderExperience;
window.renderProjects = renderProjects;
window.initDataEngine = initDataEngine;
