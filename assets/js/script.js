/**
 * Beauty Studio — Main JavaScript
 * Handles: Navbar, Burger Menu, Carousel, Gallery Filter, Lightbox, Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     NAVBAR — Scroll shadow & active link
     ============================================= */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* =============================================
     BURGER MENU (mobile)
     ============================================= */
  const burger    = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');

  if (burger && navMobile) {
    burger.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* =============================================
     CAROUSEL
     ============================================= */
  const track      = document.getElementById('carouselTrack');
  const prevBtn    = document.getElementById('prevBtn');
  const nextBtn    = document.getElementById('nextBtn');
  const dotsWrap   = document.getElementById('carouselDots');

  if (track) {
    const slides    = Array.from(track.children);
    let current     = 0;
    let autoTimer   = null;
    const total     = slides.length;

    // Build dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function goNext() { goTo(current + 1); }
    function goPrev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });

    // Autoplay
    function startAuto() {
      autoTimer = setInterval(goNext, 4500);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    startAuto();

    // Pause on hover
    const carousel = document.getElementById('mainCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
      carousel.addEventListener('mouseleave', startAuto);
    }

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? goNext() : goPrev();
        resetAuto();
      }
    }, { passive: true });

    // Keyboard arrows (only when carousel is in view)
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { goNext(); resetAuto(); }
      if (e.key === 'ArrowLeft')  { goPrev(); resetAuto(); }
    });
  }

  /* =============================================
     GALLERY FILTER
     ============================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.opacity    = match ? '1'     : '0';
          item.style.transform  = match ? 'scale(1)' : 'scale(0.9)';
          item.style.pointerEvents = match ? 'all' : 'none';
          item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

          // Reset display after animation
          if (!match) {
            setTimeout(() => {
              if (item.dataset.category !== filter && filter !== 'all') {
                item.style.display = 'none';
              }
            }, 350);
          } else {
            item.style.display = '';
          }
        });

        // Simpler approach — hide/show with transition
        galleryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* =============================================
     PRODUCT SEARCH FILTER (price page)
     ============================================= */
  const productSearchInput = document.getElementById('productSearch');
  const productCards       = document.querySelectorAll('.product-card');
  const productSearchEmpty = document.getElementById('productSearchEmpty');

  if (productSearchInput && productCards.length) {
    productSearchInput.addEventListener('input', () => {
      const query = productSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      productCards.forEach(card => {
        const match = !query || card.textContent.toLowerCase().includes(query);
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (productSearchEmpty) {
        productSearchEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  /* =============================================
     LIGHTBOX
     ============================================= */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && galleryItems.length) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src || item.querySelector('img').src;
        const alt = item.querySelector('img').alt;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* =============================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================= */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach((el, i) => {
      // Staggered delay for grid children
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;
      observer.observe(el);
    });
  }

  /* =============================================
     SMOOTH SCROLL for anchor links
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
