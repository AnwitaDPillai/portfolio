/**
 * ANWITA D PILLAI — DIGITAL ARCHIVE & PORTFOLIO
 * Application Engine & Scroll Orchestrator (11 Viewports)
 *
 * Governing Metaphor: A scholarly archive whose documents have started moving.
 */

// Global Static Constants
const APP_CONFIG = {
    researchLogUrl: "https://research-log-delta.vercel.app/",
    projectImages: {
        "research-log": "assets/projects/research-log.jpg",
        "phenotype": "assets/projects/phenotype.jpg",
        "nethernet": "assets/projects/nethernet.jpg",
        "offtrack": "assets/projects/offtrack.jpg"
    },
    experienceImages: {
        "craft": "assets/projects/craft-project-ucla.jpg",
        "stanford-igem": "assets/projects/igem-project-slide.jpg",
        "stanford-molecular-imaging": "assets/projects/stanford-molecular-imaging-slides.png"
    },
    diagrams: {
        "gold-as-grammar": ["Gold", "Salt", "Cloth", "Grammar of Refusal"],
        "roots-reefs-restoration": ["Coconut-Fiber Nets", "Biofilm Cascades", "Clay Flocculation", "Community Action"],
        "dote": ["Colonial Extraction", "Ecological Debt Calculation", "Loss & Damage Policy"],
        "jargonaut": ["Institutional Legalese", "Plain Language AI", "Public Access"]
    },
    aboutKeywords: ["footnotes", "archives", "Substack", "monograph"],
    researchKeywords: ["power-based technological change", "bargaining power", "information asymmetry", "conversational interfaces"]
};

// Application State
const STATE = {
    mode: "immersive",
    lenis: null,
    scrollProgress: 0,
    cursorInitialized: false,
    mousePos: { x: 0, y: 0 },
    cursorPos: { x: 0, y: 0 },
    typedCover: false,
    currentDeckIndex: 0,
    isShuffling: false
};

// Safe DOM Query Utilities
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const getData = (key) => {
    switch (key) {
        case "siteConfig": return typeof siteConfig !== "undefined" ? siteConfig : null;
        case "affiliations": return typeof affiliations !== "undefined" ? affiliations : null;
        case "experience": return typeof experience !== "undefined" ? experience : null;
        case "projects": return typeof projects !== "undefined" ? projects : null;
        case "publications": return typeof publications !== "undefined" ? publications : null;
        case "awards": return typeof awards !== "undefined" ? awards : null;
        case "research": return typeof research !== "undefined" ? research : null;
        default: return null;
    }
};

const escapeHtml = (str) => String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const padNumber = (num, len = 2) => String(num ?? "").padStart(len, "0");
const lerp = (start, end, factor) => start + (end - start) * factor;

// Typography & Highlight Utilities
function highlightKeywords(text, keywords) {
    let sanitized = escapeHtml(text);
    keywords.forEach((term) => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        sanitized = sanitized.replace(regex, '<span class="hl">$1</span>');
    });
    return sanitized;
}

function renderTags(tagsArray, customClass = "tag-list") {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return "";
    return `<ul class="${customClass}">${tagsArray.map(tag => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>`;
}

function renderDetails(detailsArray) {
    if (!Array.isArray(detailsArray) || !detailsArray.length) return "";
    return `<ul class="detail-list">${detailsArray.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

// --------------------------------------------------------------------------
// MODAL ARTIFACT DIALOG
// --------------------------------------------------------------------------
function openArtifactModal(imageSrc, title, subtitle = "Archival Plate & Document Record") {
    const modal = $("#artifact-modal");
    const modalImg = $("#modal-image");
    const modalTitle = $("#modal-title");
    const modalSub = $("#modal-subtitle");

    if (!modal || !modalImg) return;

    modalImg.src = imageSrc;
    modalImg.alt = title || "Archival Image";
    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = subtitle;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (STATE.lenis) STATE.lenis.stop();
}

function closeArtifactModal() {
    const modal = $("#artifact-modal");
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (STATE.lenis) STATE.lenis.start();
}

function initModalEvents() {
    const modal = $("#artifact-modal");
    if (!modal) return;

    modal.addEventListener("click", (e) => {
        if (e.target.closest("[data-modal-close]")) {
            closeArtifactModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) {
            closeArtifactModal();
        }
    });

    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-modal-trigger]");
        if (trigger) {
            e.preventDefault();
            const src = trigger.dataset.img;
            const title = trigger.dataset.title;
            const subtitle = trigger.dataset.subtitle || "Archival Record";
            if (src) openArtifactModal(src, title, subtitle);
        }
    });
}

// --------------------------------------------------------------------------
// SECTION RENDERERS (Strictly Canonical Data-Driven)
// --------------------------------------------------------------------------

// 01 & 02: Identity & About
function hydrateIdentityAndAbout() {
    const config = getData("siteConfig");
    if (!config) return;

    // Cover Subtitle
    const titleElem = $("[data-site-title]");
    if (titleElem) titleElem.dataset.full = config.identity.title;

    // About Paragraphs with Highlight
    config.about.paragraphs.forEach((paragraph, index) => {
        const pElem = $(`[data-about-paragraph="${index}"]`);
        if (pElem) {
            pElem.innerHTML = highlightKeywords(paragraph, APP_CONFIG.aboutKeywords);
        }
    });

    // About Poetry & CTA
    const poetryElem = $("[data-about-poetry]");
    if (poetryElem) poetryElem.textContent = config.about.poetry;

    const ctaElem = $("[data-about-cta]");
    if (ctaElem) {
        ctaElem.textContent = config.about.cta?.label || "Read the Substack";
        ctaElem.href = config.about.cta?.url || "https://anwitadpillai.substack.com/";
    }
}

// 03: Affiliations (Continuous Rotating Bands with Hover Pause)
function hydrateAffiliations() {
    const container = $("[data-affiliation-bands]");
    const data = getData("affiliations");
    if (!container || !data) return;

    const categories = [
        { id: "band-research", label: "01 / Research Fellowships & Labs", items: data.filter(item => item.category === "Research"), dir: "left" },
        { id: "band-technology", label: "02 / Technology & Certifications", items: data.filter(item => item.category === "Technology" || item.category === "Environmental Policy" || item.category === "Certification"), dir: "right" },
        { id: "band-independent", label: "03 / Independent Scholarship & Provenance", items: data.filter(item => item.category === "Independent Research" || item.category === "Publication" || item.category === "Participation" || item.category === "Leadership" || !item.category), dir: "left" }
    ];

    container.innerHTML = categories.map((group, groupIdx) => {
        if (!group.items.length) return "";
        // Quadruple items to create an unbroken seamless continuous infinite marquee loop
        const trackItems = [...group.items, ...group.items, ...group.items, ...group.items];
        return `
            <div class="affiliation-band" data-band-index="${groupIdx}" id="${group.id}">
                <div class="band-label">${escapeHtml(group.label)}</div>
                <div class="band-track band-track--${group.dir}" data-track-index="${groupIdx}">
                    ${trackItems.map((item) => {
                        const displayName = item.shortName || item.name;
                        const contextInfo = `${item.role || ""} · ${item.institution || item.period || ""}`;
                        return `
                            <div class="band-item" data-cursor="VIEW">
                                <span class="band-name">${escapeHtml(displayName)}</span>
                                <span class="band-peek">${escapeHtml(contextInfo)}</span>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>
        `;
    }).join("");
}

// 04: Experience (The Stack)
function hydrateExperience() {
    const container = $("[data-experience-stack]");
    const data = getData("experience");
    if (!container || !data) return;

    container.innerHTML = data.map((item, index) => {
        const imageSrc = APP_CONFIG.experienceImages[item.id];
        return `
            <article class="dossier-card" data-cursor="FIELD NOTE">
                <div class="dossier-meta">
                    <span>DOSSIER / ${padNumber(index + 1, 3)}</span>
                    <span>${escapeHtml(item.period)}</span>
                </div>
                <h3 class="dossier-title">${escapeHtml(item.title)}</h3>
                <p class="dossier-org">${escapeHtml(item.organization || item.institution)} · ${escapeHtml(item.role)}</p>
                <p class="dossier-desc">${escapeHtml(item.originalDescription || (item.details || []).join(" "))}</p>
                
                ${renderDetails(item.details)}
                ${renderTags(item.tags, "tag-list")}
                
                <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <span class="stamp">${escapeHtml(item.status || item.category)}</span>
                    ${imageSrc ? `
                        <button type="button" class="dossier-media-btn" data-modal-trigger data-img="${imageSrc}" data-title="${escapeHtml(item.title)}" data-subtitle="${escapeHtml(item.organization || item.institution)}">
                            <span>View Artifact Plate ◱</span>
                        </button>
                    ` : ""}
                </div>
            </article>
        `;
    }).join("");
}

// 05: Projects (Sticky Stacking Cards)
function hydrateProjects() {
    const container = $("[data-major-projects]");
    const allProjects = getData("projects");
    if (!container || !allProjects) return;

    const majorProjectIds = ["gold-as-grammar", "roots-reefs-restoration", "dote", "jargonaut", "research-log"];
    const majorProjects = majorProjectIds
        .map(id => allProjects.find(p => p.id === id))
        .filter(Boolean);

    container.innerHTML = majorProjects.map((project, index) => {
        const isMonograph = project.id === "gold-as-grammar";
        const linkUrl = project.id === "research-log" ? (project.externalUrl || APP_CONFIG.researchLogUrl) : (project.url || project.externalUrl || "");
        const imageSrc = APP_CONFIG.projectImages[project.id];
        const diagramSteps = APP_CONFIG.diagrams[project.id];

        return `
            <article class="sticky-project-card ${isMonograph ? 'sticky-project-card--monograph' : ''}" data-cursor="PEEK">
                <div class="project-top">
                    <span class="meta">PROJECT / ${padNumber(index + 1, 2)}</span>
                    <span class="stamp">${escapeHtml(project.status || project.type)}</span>
                </div>
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-desc">${escapeHtml(project.description)}</p>

                ${diagramSteps ? `
                    <div class="project-diagram" aria-label="Conceptual Flow">
                        ${diagramSteps.map((step, i) => `${i ? '<span class="diagram-arrow">→</span>' : ''}<span>${escapeHtml(step)}</span>`).join("")}
                    </div>
                ` : ""}

                ${renderTags(project.tags)}

                <div class="project-actions-row">
                    ${linkUrl ? `
                        <a class="project-link" href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">
                            <span>Open Project ↗</span>
                        </a>
                    ` : ""}
                    ${imageSrc ? `
                        <button type="button" class="artifact-popup-trigger" data-modal-trigger data-img="${imageSrc}" data-title="${escapeHtml(project.title)}" data-subtitle="${escapeHtml(project.category || project.type)}">
                            <span>View Plate ◱</span>
                        </button>
                    ` : ""}
                </div>
            </article>
        `;
    }).join("");
}

// 06: Publications (The Ledger)
function hydratePublications() {
    const container = $("[data-publications]");
    const data = getData("publications");
    if (!container || !data) return;

    container.innerHTML = data.map((item) => `
        <article class="ledger-row" data-cursor="READ">
            <div class="ledger-year">${escapeHtml(item.year)}</div>
            <div class="ledger-main">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.publication)}${item.publisher ? ` · ${escapeHtml(item.publisher)}` : ""}${item.issue ? ` · ${escapeHtml(item.issue)}` : ""}</p>
                <p style="margin-top: 0.35rem; font-size: 0.95rem;">${escapeHtml(item.description || "")}</p>
            </div>
            <div class="ledger-result">${escapeHtml(item.status || item.distinction || item.type)}</div>
        </article>
    `).join("");
}

// 07: Awards (The Honours Ledger)
function hydrateAwards() {
    const container = $("[data-awards]");
    const data = getData("awards");
    if (!container || !data) return;

    container.innerHTML = data.map((item) => `
        <article class="ledger-row" data-cursor="VIEW">
            <div class="ledger-year">${escapeHtml(item.year)}</div>
            <div class="ledger-main">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.detail || item.organization || item.category)}</p>
            </div>
            <div class="ledger-result">${escapeHtml(item.result)}</div>
        </article>
    `).join("");
}

// 08: Research Papers & Grants (The Dark Archive)
function hydrateResearch() {
    const container = $("[data-research-ledger]");
    const data = getData("research");
    if (!container || !data) return;

    const rows = [
        ...(data.papers || []).map(p => ({ ...p, kind: "Working Paper" })),
        ...(data.proposals || []).map(g => ({ ...g, kind: "Grant Proposal" }))
    ];

    container.innerHTML = rows.map((item) => `
        <article class="ledger-row" data-cursor="READ">
            <div class="ledger-year">${escapeHtml(item.year)}</div>
            <div class="ledger-main">
                <h3 class="typewriter-title">${escapeHtml(item.title)}</h3>
                <p>${highlightKeywords(item.description || "", APP_CONFIG.researchKeywords)}</p>
                ${renderTags(item.themes, "tag-list tag-list--dark")}
            </div>
            <div class="ledger-result">
                <span class="stamp">${escapeHtml(item.status || item.kind)}</span>
            </div>
        </article>
    `).join("");
}

// 09: Hobbyist Projects (Interactive Click-Based Shuffling Deck)
function hydratePlayground() {
    const container = $("[data-experiments-deck]");
    const allProjects = getData("projects");
    if (!container || !allProjects) return;

    const experimentIds = ["phenotype", "nethernet", "offtrack"];
    const experiments = experimentIds
        .map(id => allProjects.find(p => p.id === id))
        .filter(Boolean);

    const deckAngles = [-2.5, 3.2, -1.8, 2.2];

    container.innerHTML = experiments.map((project, idx) => {
        const imageSrc = APP_CONFIG.projectImages[project.id];
        const angle = deckAngles[idx % deckAngles.length];
        const offset = idx * 12;

        return `
            <article class="shuffling-card" data-card-index="${idx}" style="z-index: ${experiments.length - idx}; transform: translateY(${offset}px) rotate(${angle}deg) scale(${1 - idx * 0.03});" data-cursor="SHUFFLE">
                <div>
                    <div class="shuffling-card-top">
                        <span class="meta">${escapeHtml(project.category || "Hobbyist Experiment")}</span>
                        <span class="stamp">${escapeHtml(project.status || "Interactive")}</span>
                    </div>
                    <h3 class="shuffling-card-title">${escapeHtml(project.title)}</h3>
                    <p class="shuffling-card-desc">${escapeHtml(project.description)}</p>
                    ${renderTags(project.technologies || project.tags)}
                </div>
                <div class="shuffling-card-footer">
                    ${project.url ? `
                        <a class="project-link" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" data-cursor="OPEN" onclick="event.stopPropagation()">
                            <span>Launch Simulation ↗</span>
                        </a>
                    ` : `<span></span>`}
                    ${imageSrc ? `
                        <button type="button" class="artifact-popup-trigger" data-modal-trigger data-img="${imageSrc}" data-title="${escapeHtml(project.title)}" data-subtitle="${escapeHtml(project.category)}" onclick="event.stopPropagation()">
                            <span>View Preview ◱</span>
                        </button>
                    ` : ""}
                </div>
            </article>
        `;
    }).join("");

    updateDeckTransforms(0);
}

function updateDeckTransforms(activeIndex) {
    const cards = $$('.shuffling-card');
    const total = cards.length;
    if (!total) return;

    const deckAngles = [-2.5, 3.2, -1.8];

    cards.forEach((card, i) => {
        const relativePos = (i - activeIndex + total) % total;
        
        if (relativePos === 0) {
            // Front & Active Card
            card.style.zIndex = 15;
            card.style.transform = `translateY(0px) rotate(0deg) scale(1)`;
            card.classList.remove("is-lifting");
        } else {
            // Background Cards in Deck
            const angle = deckAngles[relativePos % deckAngles.length];
            const yOffset = relativePos * 14;
            const scale = 1 - relativePos * 0.04;
            card.style.zIndex = 10 - relativePos;
            card.style.transform = `translateY(${yOffset}px) rotate(${angle}deg) scale(${scale})`;
            card.classList.remove("is-lifting");
        }
    });

    const counter = $("[data-deck-counter]");
    if (counter) {
        counter.textContent = `CARD ${padNumber(activeIndex + 1, 2)} / ${padNumber(total, 2)}`;
    }
}

function shuffleDeck() {
    if (STATE.isShuffling) return;
    const cards = $$('.shuffling-card');
    const total = cards.length;
    if (total <= 1) return;

    STATE.isShuffling = true;
    const currentCard = cards[STATE.currentDeckIndex];

    // Lift and slide current card under the deck
    currentCard.classList.add("is-lifting");

    setTimeout(() => {
        STATE.currentDeckIndex = (STATE.currentDeckIndex + 1) % total;
        updateDeckTransforms(STATE.currentDeckIndex);
        setTimeout(() => {
            STATE.isShuffling = false;
        }, 400);
    }, 280);
}

function initDeckInteraction() {
    const deck = $("[data-experiments-deck]");
    const shuffleBtn = $("[data-deck-shuffle]");

    if (deck) {
        deck.addEventListener("click", () => {
            shuffleDeck();
        });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            shuffleDeck();
        });
    }
}

// 10: Recent Writing (Substack Feed)
function hydrateSubstackFeed() {
    const config = getData("siteConfig");
    const container = $("[data-substack-feed]");
    if (!config || !container) return;

    const fallbackArticles = [
        { title: "On Archival Grudges and Colonial Currencies", date: "March 2026", link: config.substack.siteUrl },
        { title: "The Material Politics of Salt and Silence", date: "February 2026", link: config.substack.siteUrl },
        { title: "When Footnotes Become the Living Argument", date: "January 2026", link: config.substack.siteUrl }
    ];

    const renderArticles = (items) => {
        container.innerHTML = items.map(item => `
            <article class="essay-card" data-cursor="READ">
                <div class="ledger-year">${escapeHtml(item.date || item.pubDate?.split(" ")[0] || "")}</div>
                <div class="essay-title">
                    <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>
                </div>
                <div>
                    <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="meta" style="color: var(--ochre);">READ ↗</a>
                </div>
            </article>
        `).join("");
    };

    fetch(`${config.substack.rssProxy}${encodeURIComponent(config.substack.feedUrl)}`)
        .then(res => res.json())
        .then(data => {
            const feedItems = (data.items || []).slice(0, config.substack.displayCount);
            if (feedItems.length) {
                renderArticles(feedItems);
            } else {
                renderArticles(fallbackArticles);
            }
        })
        .catch(() => {
            renderArticles(fallbackArticles);
        });
}

// 11: Contact (The Colophon)
function hydrateContact() {
    const config = getData("siteConfig");
    if (!config) return;

    const headingElem = $("[data-contact-heading]");
    if (headingElem) headingElem.textContent = config.contactSection.heading;

    const bodyElem = $("[data-contact-body]");
    if (bodyElem) bodyElem.textContent = config.contactSection.body;

    const secondaryElem = $("[data-contact-secondary]");
    if (secondaryElem) secondaryElem.textContent = config.contactSection.secondaryText;

    const emailElem = $("[data-contact-email]");
    if (emailElem) {
        emailElem.href = `mailto:${config.contactSection.email}`;
        emailElem.querySelector(".btn-text").textContent = config.contactSection.buttonLabel;
    }

    const socialsElem = $("[data-contact-links]");
    if (socialsElem && Array.isArray(config.contactSection.links)) {
        socialsElem.innerHTML = config.contactSection.links.map(link => `
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">${escapeHtml(link.label)}</a>
        `).join("");
    }

    const quoteElem = $("[data-quote-text]");
    if (quoteElem) quoteElem.textContent = `“${config.quote.text}”`;

    const authorElem = $("[data-quote-author]");
    if (authorElem) authorElem.textContent = `— ${config.quote.author}`;

    const footerElem = $("[data-footer-text]");
    if (footerElem) footerElem.textContent = config.footer.text;
}

// --------------------------------------------------------------------------
// MOTION & SCROLL ORCHESTRATION
// --------------------------------------------------------------------------

function initIntersectionObservers() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-shown");
            }
        });
    }, { threshold: 0.15 });

    $$('.reveal').forEach(el => revealObserver.observe(el));

    // Slow, gradual ink highlighting
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-on");
            }
        });
    }, { threshold: 0.35 });

    $$('.hl').forEach(el => highlightObserver.observe(el));
}

function initScrollTriggers() {
    if (typeof ScrollTrigger === "undefined" || STATE.mode === "quiet") return;
    gsap.registerPlugin(ScrollTrigger);

    // 01 Opening cover pin
    ScrollTrigger.create({
        trigger: "#cover",
        start: "top top",
        end: "+=30%",
        pin: true,
        pinSpacing: true
    });

    // 08 Seamless Dark Archive background toggle with smoother gradient transition
    ScrollTrigger.create({
        trigger: "#research",
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => document.body.classList.add("is-dark"),
        onLeave: () => document.body.classList.remove("is-dark"),
        onEnterBack: () => document.body.classList.add("is-dark"),
        onLeaveBack: () => document.body.classList.remove("is-dark")
    });
}

function updateFrame() {
    const scrollY = STATE.lenis ? STATE.lenis.scroll : window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll progress bar
    STATE.scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    const progressElem = $("[data-scroll-progress]");
    if (progressElem) {
        progressElem.style.width = `${STATE.scrollProgress * 100}%`;
    }

    // Active Chapter Spine & Header Nav Sync (11 Chapters)
    const chapters = $$('.chapter');
    let currentChapter = chapters[0];
    chapters.forEach(ch => {
        const rect = ch.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
            currentChapter = ch;
        }
    });

    if (currentChapter) {
        const chapterId = currentChapter.dataset.chapter;
        const chapterIndex = currentChapter.dataset.index || "01";
        const chapterLabel = currentChapter.dataset.label || "CHAPTER";

        $$('[data-spine]').forEach(link => {
            link.classList.toggle("is-active", link.dataset.spine === chapterId);
        });

        const navIndexElem = $("[data-nav-index]");
        if (navIndexElem) {
            navIndexElem.textContent = `${chapterIndex} / 11 · ${chapterLabel}`;
        }
    }
}

// --------------------------------------------------------------------------
// INTERACTIVE CURSOR
// --------------------------------------------------------------------------

function initCursor() {
    if (STATE.cursorInitialized || window.matchMedia("(pointer: coarse)").matches) return;
    const cursorElem = $("[data-cursor]");
    const labelElem = $("[data-cursor-label]");
    if (!cursorElem) return;

    STATE.cursorInitialized = true;
    cursorElem.hidden = false;

    window.addEventListener("mousemove", (e) => {
        STATE.mousePos.x = e.clientX;
        STATE.mousePos.y = e.clientY;

        const target = e.target.closest("[data-cursor], a, button");
        if (target) {
            labelElem.textContent = target.dataset.cursor || (target.tagName === "A" ? "OPEN" : "READY");
            cursorElem.classList.add("is-active");
        } else {
            labelElem.textContent = "READ";
            cursorElem.classList.remove("is-active");
        }
    });
}

function typeCoverTitle() {
    const titleElem = $("[data-site-title]");
    const stampElem = $("[data-typewriter]");
    if (!titleElem || STATE.typedCover) return;
    STATE.typedCover = true;

    const fullTitle = titleElem.dataset.full || "";

    if (STATE.mode === "quiet") {
        titleElem.textContent = fullTitle;
        $$('[data-cover-line]').forEach(line => line.classList.add("is-in"));
        return;
    }

    stampElem.textContent = "ARCHIVE / ";
    let i = 0;
    const typeStamp = () => {
        stampElem.textContent = `ARCHIVE / ${"001".slice(0, i++)}`;
        if (i <= 3) {
            setTimeout(typeStamp, 80);
        } else {
            $$('[data-cover-line]').forEach((line, idx) => {
                setTimeout(() => line.classList.add("is-in"), idx * 220);
            });

            setTimeout(() => {
                let charIndex = 0;
                const typeSubtitle = () => {
                    titleElem.textContent = fullTitle.slice(0, charIndex++);
                    if (charIndex <= fullTitle.length) {
                        setTimeout(typeSubtitle, 26);
                    }
                };
                typeSubtitle();
            }, 600);
        }
    };
    typeStamp();
}

// --------------------------------------------------------------------------
// CORE APPLICATION LOOP & BOOTSTRAP
// --------------------------------------------------------------------------

function renderLoop() {
    updateFrame();

    if (STATE.cursorInitialized) {
        STATE.cursorPos.x = lerp(STATE.cursorPos.x, STATE.mousePos.x, 0.25);
        STATE.cursorPos.y = lerp(STATE.cursorPos.y, STATE.mousePos.y, 0.25);
        const cursorElem = $("[data-cursor]");
        if (cursorElem) {
            cursorElem.style.left = `${STATE.cursorPos.x}px`;
            cursorElem.style.top = `${STATE.cursorPos.y}px`;
        }
    }
}

function startApplication() {
    if (STATE.mode === "quiet") return;

    if (typeof Lenis !== "undefined") {
        STATE.lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        if (typeof ScrollTrigger !== "undefined") {
            STATE.lenis.on("scroll", ScrollTrigger.update);
        }

        gsap.ticker.add((time) => {
            STATE.lenis.raf(time * 1000);
            renderLoop();
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        gsap.ticker.add(renderLoop);
    }

    initScrollTriggers();
    initIntersectionObservers();
    initCursor();
    typeCoverTitle();
    // Start rotating status messages (if not already started)
    const loadingScreen = $('#loading-screen');
    if (loadingScreen) {
        // Record start time if not set
        if (!loadingScreen.dataset.start) loadingScreen.dataset.start = Date.now();
        const statusEl = $('.loading-status');
        const messages = [
            'Cataloguing…',
            'Verifying provenance…',
            'Cross-referencing…',
            'Finalising record…'
        ];
        let idx = 0;
        // Clear any previous interval just in case
        if (loadingScreen.dataset.intervalId) clearInterval(parseInt(loadingScreen.dataset.intervalId));
        const intervalId = setInterval(() => {
            statusEl.textContent = messages[idx]; if (messages[idx] === 'Cross-referencing…') { const stampEl = $('.loading-stamp'); if (stampEl) stampEl.classList.add('visible'); }
            idx = (idx + 1) % messages.length;
        }, 1000);
        loadingScreen.dataset.intervalId = intervalId;

        // Ensure the loader stays visible for at least 4 seconds
        const elapsed = Date.now() - parseInt(loadingScreen.dataset.start);
        const minDelay = Math.max(0, 4000 - elapsed);
        setTimeout(() => {
            clearInterval(intervalId);
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }, minDelay);
    }
}

function toggleQuietMode() {
    STATE.mode = STATE.mode === "quiet" ? "immersive" : "quiet";
    document.body.dataset.mode = STATE.mode;
    const modeBtn = $("[data-mode-toggle] .mode-label");

    if (STATE.mode === "quiet") {
        if (modeBtn) modeBtn.textContent = "Motion On";
        if (STATE.lenis) { STATE.lenis.destroy(); STATE.lenis = null; }
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.getAll().forEach(t => t.kill());

        $$('.reveal, [data-cover-line], .hl').forEach(el => el.classList.add("is-shown", "is-in", "is-on"));
        const titleElem = $("[data-site-title]");
        if (titleElem) titleElem.textContent = titleElem.dataset.full;
    } else {
        if (modeBtn) modeBtn.textContent = "Quiet Mode";
        startApplication();
    }
}

function boot() {
    // Hydrate all 11 viewports
    hydrateIdentityAndAbout();
    hydrateAffiliations();
    hydrateExperience();
    hydrateProjects();
    hydratePublications();
    hydrateAwards();
    hydrateResearch();
    hydratePlayground();
    hydrateSubstackFeed();
    hydrateContact();
    initModalEvents();
    initDeckInteraction();

    // Mode Toggle Button
    const modeToggle = $("[data-mode-toggle]");
    if (modeToggle) {
        modeToggle.addEventListener("click", toggleQuietMode);
    }

    // Scroll Cue in Hero
    const scrollCue = $(".cover-scroll-indicator");
    if (scrollCue) {
        scrollCue.addEventListener("click", () => {
            const nextSec = $("#about");
            if (nextSec) {
                if (STATE.lenis) STATE.lenis.scrollTo(nextSec);
                else nextSec.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Respect OS Reduced Motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        STATE.mode = "quiet";
        toggleQuietMode();
    } else {
        startApplication();
    }
}

document.addEventListener("DOMContentLoaded", boot);
