/* ANTIGRAVITY — Luxury Interaction Controller */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initStickyHeader();
    initScrollProgress();
    initMobileMenu();
    initScrollReveal();
    initCounterAnimations();
    initLookbookFilter();
    initLightbox();
    initPreferenceSelector();
    initWishlistToggle();
    initScrollToTop();
    initPageTransition();
    markActiveNavLink();
});

/* ─── 1. Custom Luxury Cursor (neon dot + gold ring follower) ─── */
function initCustomCursor() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    (function updateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(updateFollower);
    })();

    const hoverTargets = 'a, button, .btn, .showcase-card, .product-card, .preference-option, .config-item-btn, .color-swatch-btn, .accordion-trigger';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ─── 2. Sticky Header with scroll class ─── */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ─── 3. Scroll Progress Bar ─── */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 2px; width: 0%;
        background: linear-gradient(90deg, var(--color-neon), var(--color-gold));
        z-index: 9997; transition: width 0.1s linear;
        box-shadow: 0 0 6px rgba(0,255,136,0.5);
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = `${Math.min(scrolled, 100)}%`;
    }, { passive: true });
}

/* ─── 4. Mobile Menu Toggle ─── */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ─── 5. Scroll Reveal with staggered children ─── */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stagger direct children if they have a delay attribute
                entry.target.querySelectorAll('[data-delay]').forEach(child => {
                    child.style.transitionDelay = child.getAttribute('data-delay');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* ─── 6. Counter Animations (for stat numbers) ─── */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.meta-item p[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1800;
                const start = performance.now();

                (function update(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
                    const current = Math.round(eased * target);
                    el.textContent = current + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                })(performance.now());

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ─── 7. Collections / Lookbook Filter ─── */
function initLookbookFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.lookbook-item');
    if (!filterButtons.length || !items.length) return;

    const applyFilter = (filterValue) => {
        items.forEach((item, i) => {
            const category = item.getAttribute('data-category');
            const match = filterValue === 'all' || category === filterValue;
            item.classList.toggle('hidden', !match);
            if (match) {
                item.style.animation = 'none';
                item.offsetHeight; // force reflow
                item.style.animationDelay = `${i * 0.07}s`;
                item.style.animation = 'gridSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            }
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    // Auto-apply from URL param (e.g. ?filter=bridal)
    const urlParam = new URLSearchParams(window.location.search).get('filter');
    if (urlParam) {
        const match = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === urlParam);
        if (match) match.click();
    }
}

/* ─── 8. Lightbox with keyboard & arrow nav ─── */
function initLightbox() {
    const items = document.querySelectorAll('.lookbook-item');
    if (!items.length) return;

    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image Preview');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <img src="" alt="Collection piece enlarged view">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    let currentIndex = 0;
    const visibleItems = () => Array.from(items).filter(i => !i.classList.contains('hidden'));

    function openLightbox(index) {
        const visible = visibleItems();
        if (!visible[index]) return;
        currentIndex = index;
        const img = visible[index].querySelector('img');
        const title = visible[index].querySelector('.product-meta-text h4');
        lightboxImg.src = img ? img.src : '';
        lightboxImg.alt = img ? img.alt : '';
        if (lightboxCaption && title) lightboxCaption.textContent = title.textContent;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 500);
    }

    items.forEach((item, i) => {
        // Open on image/card click but NOT on wishlist button
        item.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) return;
            const visible = visibleItems();
            const vIdx = visible.indexOf(item);
            if (vIdx !== -1) openLightbox(vIdx);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % visibleItems().length);
        if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + visibleItems().length) % visibleItems().length);
    });
}

/* ─── 9. Preference Selectors (Booking form option tiles) ─── */
function initPreferenceSelector() {
    document.querySelectorAll('.preference-option').forEach(option => {
        option.addEventListener('click', () => {
            const parent = option.parentElement;
            const isMulti = parent.hasAttribute('data-multi-select');
            if (!isMulti) {
                parent.querySelectorAll('.preference-option').forEach(o => o.classList.remove('selected'));
            }
            option.classList.toggle('selected');

            const inputId = parent.getAttribute('data-input-target');
            if (inputId) {
                const input = document.getElementById(inputId);
                if (input) {
                    if (isMulti) {
                        input.value = Array.from(parent.querySelectorAll('.preference-option.selected'))
                            .map(o => o.getAttribute('data-value')).join(',');
                    } else {
                        input.value = option.getAttribute('data-value') || '';
                    }
                }
            }
        });
    });
}

/* ─── 10. Wishlist Toggle (persisted in localStorage) ─── */
function initWishlistToggle() {
    const wishlist = JSON.parse(localStorage.getItem('ag_wishlist') || '[]');
    const counter = document.querySelector('.nav-action-btn[aria-label="Wishlist"] .wishlist-nav-count');

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const card = btn.closest('.product-card, .lookbook-item');
        const titleEl = card ? card.querySelector('h4') : null;
        const itemId = titleEl ? titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '-') : null;

        if (itemId && wishlist.includes(itemId)) {
            btn.classList.add('active');
            btn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
        }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.replace('fa-regular', 'fa-solid');
                if (itemId && !wishlist.includes(itemId)) wishlist.push(itemId);
                showToast('Added to Wishlist ♡', 'neon');
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
                const idx = wishlist.indexOf(itemId);
                if (idx > -1) wishlist.splice(idx, 1);
                showToast('Removed from Wishlist', 'silver');
            }
            localStorage.setItem('ag_wishlist', JSON.stringify(wishlist));
        });
    });
}

/* ─── 11. Toast Notifications ─── */
function showToast(message, accentType = 'gold') {
    const existing = document.querySelector('.ag-toast');
    if (existing) existing.remove();

    const colorMap = { gold: 'var(--color-gold)', neon: 'var(--color-neon)', silver: 'var(--color-silver)' };
    const color = colorMap[accentType] || colorMap.gold;

    const toast = document.createElement('div');
    toast.className = 'ag-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; z-index: 5000;
        background: var(--bg-card); color: var(--color-white);
        border: 1px solid ${color}; padding: 1rem 2rem;
        font-family: var(--font-ui); font-size: 0.8rem;
        letter-spacing: 1.5px; text-transform: uppercase;
        box-shadow: 0 4px 30px rgba(0,0,0,0.5);
        opacity: 0; transform: translateY(10px);
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

/* ─── 12. Scroll-to-Top Button ─── */
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed; bottom: 2rem; left: 2rem; z-index: 500;
        width: 44px; height: 44px; border-radius: 50%;
        background: transparent; border: 1px solid var(--border-silver);
        color: var(--color-silver); font-size: 1.1rem;
        cursor: pointer; opacity: 0; pointer-events: none;
        transition: all 0.4s ease;
        font-family: var(--font-ui);
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 400;
        btn.style.opacity = visible ? '1' : '0';
        btn.style.pointerEvents = visible ? 'all' : 'none';
    }, { passive: true });

    btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = 'var(--color-neon)';
        btn.style.color = 'var(--color-neon)';
        btn.style.boxShadow = '0 0 10px rgba(0,255,136,0.3)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'var(--border-silver)';
        btn.style.color = 'var(--color-silver)';
        btn.style.boxShadow = 'none';
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── 13. Page Transition Fade ─── */
function initPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = href; }, 350);
        });
    });
}

/* ─── 14. Mark Active Nav Link ─── */
function markActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href').split('?')[0];
        if (linkPath === path) link.classList.add('active');
    });
}
