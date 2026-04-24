/**
 * script.js — Kamilla Artist Portfolio
 *
 * Features:
 *  1. Smooth scroll is handled by CSS (scroll-behavior: smooth)
 *  2. Mobile navigation toggle
 *  3. Fine Art gallery panel open/close
 *  4. Theatre discipline tabs
 *  5. Lightbox / modal for artwork images
 *  6. Active nav link highlighting on scroll (IntersectionObserver)
 *  7. Lazy-load images (native loading="lazy" + IntersectionObserver polyfill fallback)
 *  8. Vimeo embed activation on click (deferred load for performance)
 */

(function () {
  'use strict';

  /* ============================================================
     UTILITY
     ============================================================ */

  /**
   * Shorthand querySelector.
   * @param {string} selector
   * @param {Element} [ctx=document]
   * @returns {Element|null}
   */
  function qs(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  /**
   * Shorthand querySelectorAll returning an Array.
   * @param {string} selector
   * @param {Element} [ctx=document]
   * @returns {Element[]}
   */
  function qsa(selector, ctx) {
    return Array.from((ctx || document).querySelectorAll(selector));
  }

  /* ============================================================
     1. MOBILE NAVIGATION TOGGLE
     ============================================================ */
  (function initMobileNav() {
    const toggle = qs('.nav-toggle');
    const navLinks = qs('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('nav-links--open', !isOpen);
    });

    // Close nav when a link is clicked
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-links--open');
      }
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav-links--open');
      }
    });
  })();

  /* ============================================================
     2. ACTIVE NAV LINK ON SCROLL
     ============================================================ */
  (function initActiveNav() {
    const sections = qsa('section[id]');
    const navLinks = qsa('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              const isActive = link.getAttribute('href') === '#' + id;
              link.setAttribute('aria-current', isActive ? 'page' : 'false');
            });
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // trigger when section is in middle of viewport
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  })();

  /* ============================================================
     3. FINE ART — GALLERY PANEL OPEN / CLOSE
     ============================================================ */
  (function initGalleryPanels() {
    const openButtons = qsa('[data-gallery].btn--text');
    const closeButtons = qsa('.gallery-close');

    /**
     * Open a gallery panel.
     * @param {string} key — matches data-gallery attribute
     */
    function openGallery(key) {
      const panel = document.getElementById('gallery-' + key);
      if (!panel) return;

      // Close all others first
      qsa('.gallery-panel').forEach(function (p) {
        if (p !== panel) {
          p.hidden = true;
        }
      });

      // Reset all open buttons
      qsa('[data-gallery].btn--text').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'View Works →';
      });

      panel.hidden = false;

      // Mark the triggering button as expanded
      const triggerBtn = qs('[data-gallery="' + key + '"].btn--text');
      if (triggerBtn) {
        triggerBtn.setAttribute('aria-expanded', 'true');
        triggerBtn.textContent = '← Back';
      }

      // Smooth scroll to the gallery panel
      setTimeout(function () {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }

    /**
     * Close a gallery panel.
     * @param {string} key
     */
    function closeGallery(key) {
      const panel = document.getElementById('gallery-' + key);
      if (!panel) return;

      panel.hidden = true;

      const triggerBtn = qs('[data-gallery="' + key + '"].btn--text');
      if (triggerBtn) {
        triggerBtn.setAttribute('aria-expanded', 'false');
        triggerBtn.textContent = 'View Works →';
      }
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-gallery');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeGallery(key);
        } else {
          openGallery(key);
        }
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-gallery');
        closeGallery(key);

        // Scroll back to the section containing this gallery panel
        const panel = document.getElementById('gallery-' + key);
        const section = panel && panel.closest('section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();

  /* ============================================================
     4. THEATRE — DISCIPLINE TABS
     ============================================================ */
  (function initTheatreTabs() {
    const tabButtons = qsa('.tab-btn');
    const tabPanels = qsa('.tab-panel');

    if (!tabButtons.length) return;

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('aria-controls');

        // Deactivate all tabs
        tabButtons.forEach(function (b) {
          b.classList.remove('tab-btn--active');
          b.setAttribute('aria-selected', 'false');
        });

        // Hide all panels
        tabPanels.forEach(function (p) {
          p.hidden = true;
          p.classList.remove('tab-panel--active');
        });

        // Activate clicked tab
        btn.classList.add('tab-btn--active');
        btn.setAttribute('aria-selected', 'true');

        // Show target panel
        const panel = document.getElementById(targetId);
        if (panel) {
          panel.hidden = false;
          panel.classList.add('tab-panel--active');
        }
      });

      // Keyboard navigation: arrow keys move between tabs
      btn.addEventListener('keydown', function (e) {
        let newIndex = -1;
        const index = tabButtons.indexOf(btn);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        }

        if (newIndex !== -1) {
          e.preventDefault();
          tabButtons[newIndex].focus();
          tabButtons[newIndex].click();
        }
      });
    });
  })();

  /* ============================================================
     5. LIGHTBOX / MODAL
     ============================================================ */
  (function initLightbox() {
    const lightbox        = document.getElementById('lightbox');
    const overlay         = document.getElementById('lightbox-overlay');
    const lightboxImg     = qs('.lightbox__img');
    const lightboxTitle   = qs('.lightbox__title');
    const lightboxMeta    = qs('.lightbox__meta');
    const closeBtn        = qs('.lightbox__close');
    const prevBtn         = qs('.lightbox__prev');
    const nextBtn         = qs('.lightbox__next');

    if (!lightbox) return;

    let currentGalleryItems = [];
    let currentIndex = 0;

    /**
     * Open the lightbox for a given artwork card.
     * @param {Element[]} items — array of .artwork-card elements in the same gallery
     * @param {number} index — index of the clicked card
     */
    function openLightbox(items, index) {
      currentGalleryItems = items;
      currentIndex = index;
      showImage(index);

      lightbox.hidden = false;
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';

      // Focus the close button for accessibility
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      overlay.hidden = true;
      document.body.style.overflow = '';

      // Return focus to the card that triggered the lightbox
      if (currentGalleryItems[currentIndex]) {
        currentGalleryItems[currentIndex].focus();
      }
    }

    function showImage(index) {
      const card = currentGalleryItems[index];
      if (!card) return;

      const img      = qs('img', card);
      const title    = qs('.artwork-title', card);
      const meta     = qs('.artwork-meta', card);

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
      }

      lightboxTitle.textContent = title ? title.textContent : '';
      lightboxMeta.textContent  = meta  ? meta.textContent  : '';

      // Update prev/next visibility
      prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
      nextBtn.style.visibility = index < currentGalleryItems.length - 1 ? 'visible' : 'hidden';
    }

    // Delegate artwork card clicks
    document.addEventListener('click', function (e) {
      const card = e.target.closest('.artwork-card');
      if (!card) return;

      // Find which gallery panel this card belongs to
      const panel  = card.closest('.gallery-panel');
      const items  = panel ? qsa('.artwork-card', panel) : [];
      const index  = items.indexOf(card);

      openLightbox(items, index);
    });

    // Keyboard activate on artwork cards
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = document.activeElement && document.activeElement.closest('.artwork-card');
        if (card) {
          e.preventDefault();
          card.click();
        }
      }
    });

    // Close
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (overlay)  overlay.addEventListener('click', closeLightbox);

    // Previous / next
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          showImage(currentIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentIndex < currentGalleryItems.length - 1) {
          currentIndex++;
          showImage(currentIndex);
        }
      });
    }

    // Keyboard navigation inside lightbox
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;

      if (e.key === 'Escape') { closeLightbox(); }
      if (e.key === 'ArrowLeft')  { prevBtn && prevBtn.click(); }
      if (e.key === 'ArrowRight') { nextBtn && nextBtn.click(); }
    });
  })();

  /* ============================================================
     6. VIMEO DEFERRED EMBED
     Replaces the .vimeo-placeholder with an actual iframe
     only when the user clicks the placeholder — saves bandwidth
     on page load.
     ============================================================ */
  (function initVimeoEmbeds() {
    /**
     * Build a Vimeo iframe element.
     * @param {string} videoId
     * @param {string} title
     * @returns {HTMLIFrameElement}
     */
    function buildVimeoIframe(videoId, title) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&title=0&byline=0&portrait=0';
      iframe.width = '100%';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = title || 'Vimeo video';
      iframe.loading = 'lazy';

      // Make iframe fill the wrapper
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';

      return iframe;
    }

    // Delegate click on vimeo placeholders
    document.addEventListener('click', function (e) {
      const placeholder = e.target.closest('.vimeo-placeholder');
      if (!placeholder) return;

      const wrapper = placeholder.closest('.vimeo-embed');
      if (!wrapper) return;

      const videoId = wrapper.getAttribute('data-vimeo-id');
      // Skip if ID is still the placeholder text
      if (!videoId || videoId === 'REPLACE_WITH_VIMEO_ID') {
        console.info(
          'Vimeo: Replace the data-vimeo-id attribute on this element with the actual Vimeo video ID.',
          wrapper
        );
        return;
      }

      const title = wrapper.getAttribute('data-title') || 'Video';
      const iframe = buildVimeoIframe(videoId, title);

      // Remove placeholder, add iframe
      placeholder.remove();
      wrapper.appendChild(iframe);
    });
  })();

  /* ============================================================
     7. IMAGE PLACEHOLDER FALLBACK
     Adds a .img-placeholder class to containers when an image
     fails to load, so the CSS can show a styled placeholder.
     (onerror on <img> tags in HTML handles most cases;
     this is a JS-side belt-and-suspenders approach.)
     ============================================================ */
  (function initImageFallbacks() {
    qsa('img[loading="lazy"]').forEach(function (img) {
      img.addEventListener('error', function () {
        const parent = img.parentElement;
        if (parent) {
          parent.classList.add('img-placeholder');
        }
      });
    });
  })();

  /* ============================================================
     8. EMAIL OBFUSCATION
     Assembles mailto: links from data-user / data-domain
     attributes on click, keeping raw addresses out of the HTML
     source so scrapers cannot harvest them.
     ============================================================ */
  (function initEmailLinks() {
    qsa('[data-user][data-domain]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var addr = el.dataset.user + '@' + el.dataset.domain;
        window.location.href = 'mailto:' + addr;
      });
    });
  })();

})();
