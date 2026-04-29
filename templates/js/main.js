/**
 * TCP/UP - Main Script
 * Chargement dynamique des composants (header/footer) selon la langue de la page.
 * Le dossier racine /components/ est utilisé pour le français (lang="fr").
 * Pour toute autre langue (ex. en, es, de), les composants sont chargés depuis
 * /i18n/<lang>/components/<nom>_<lang>.html
 */

/* ---------------------------------------------------------
   GOATCOUNTER (Gestion Prod vs Test)
--------------------------------------------------------- */
(function() {
    const isProd = window.location.hostname === 'tcp-up.org' || 
                   window.location.hostname === 'www.tcp-up.org';

    if (!isProd) {
        console.log('🛠️ GoatCounter désactivé (environnement local)');
        return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = 'https://tcp-up.goatcounter.com/count';
    document.head.appendChild(script);
})();

document.addEventListener("DOMContentLoaded", () => {
    // 1. Déterminer la langue active via l'attribut lang de <html> (fr par défaut)
    const lang = document.documentElement.lang || 'fr';

    // 2. Charger les composants selon la langue
    loadComponent(lang, "header", "header-target", setupBurger);
    loadComponent(lang, "footer", "footer-target");

    // 3. Initialiser les autres fonctionnalités
    setupBackToTop();
    setupDocumentationFlyout();
    setupFaqSearch();
});

/**
 * Charge un fichier HTML de composant dans un élément cible.
 * @param {string} lang - code de langue (ex: 'fr', 'en', 'es')
 * @param {string} name - nom du composant ('header' ou 'footer')
 * @param {string} targetId - ID de l'élément à remplir
 * @param {Function|null} callback - fonction optionnelle après chargement
 */
async function loadComponent(lang, name, targetId, callback = null) {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Construire l'URL absolue du fichier
    let url;
    if (lang === 'fr') {
        url = `/components/${name}.html`;                 // /components/header.html
    } else {
        url = `/i18n/${lang}/components/${name}_${lang}.html`; // /i18n/en/components/header_en.html
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Erreur chargement ${name}: ${response.statusText}`);
            return;
        }
        const html = await response.text();
        target.innerHTML = html;

        if (callback) callback();
    } catch (error) {
        console.error(`Erreur réseau pour ${name}:`, error);
    }
}

/**
 * Gestion du Menu Burger et des Dropdowns Responsives
 */
function setupBurger() {
    const burgerBtn = document.getElementById('burger-btn');
    const navLinks = document.getElementById('nav-links');
    const dropdowns = document.querySelectorAll('.has-dropdown');

    if (!burgerBtn || !navLinks) return;

    const closeMenu = () => {
        burgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
        dropdowns.forEach(d => d.classList.remove('open'));
    };

    burgerBtn.onclick = (e) => {
        e.stopPropagation();
        burgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (!trigger) return;

        trigger.onclick = (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
                dropdown.classList.toggle('open');
            }
        };
    });

    const navItems = document.querySelectorAll('#nav-links a:not(.dropdown-trigger)');
    navItems.forEach(link => { link.onclick = () => closeMenu(); });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !burgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Gestion du bouton Back to Top
 */
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    let isScrolling;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');

        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (!btn.matches(':hover')) btn.classList.remove('visible');
        }, 2000);
    }, { passive: true });

    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Gestion du menu documentation (flyout)
 */
function setupDocumentationFlyout() {
    const toggleBtn = document.getElementById('flyout-toggle');
    const closeBtn = document.getElementById('flyout-close');
    const menu = document.getElementById('flyout-menu');
    const overlay = document.getElementById('flyout-overlay');
    const links = document.querySelectorAll('.toc-link');

    if (!toggleBtn || !closeBtn || !menu || !overlay) return;

    toggleBtn.addEventListener('click', () => {
        menu.classList.add('active');
        overlay.classList.add('active');
    });

    const closeMenu = () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
}

/**
 * Système de recherche dynamique dans la FAQ
 */
function setupFaqSearch() {
    const searchInput = document.getElementById('faq-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.faq-card');
        const sections = document.querySelectorAll('.faq-category-section');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? "block" : "none";
        });

        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.faq-card[style="display: block;"]');
            section.style.display = visibleCards.length > 0 || query === '' ? "block" : "none";
        });
    });
}