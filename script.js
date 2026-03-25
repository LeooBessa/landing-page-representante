/* ============================================================
   script.js — Landing Page: Representante Comercial
   Funcionalidades:
     1. Header com sombra ao rolar
     2. Menu hamburguer (mobile)
     3. Link ativo na navegação (scrollspy)
     4. Animações de entrada via Intersection Observer (AOS-like)
     5. Ano dinâmico no footer
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. HEADER — adiciona classe "scrolled" ao rolar a página
  ────────────────────────────────────────────────────────── */
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Executa ao carregar caso já esteja rolado


  /* ──────────────────────────────────────────────────────────
     2. MENU HAMBURGUER — abre/fecha o menu em telas mobile
  ────────────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('nav--open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });


  /* ──────────────────────────────────────────────────────────
     3. SCROLLSPY — marca o link ativo conforme a seção visível
  ────────────────────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  const setActiveLink = () => {
    // Offset do header fixo (aproximado)
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();


  /* ──────────────────────────────────────────────────────────
     4. ANIMAÇÕES DE ENTRADA — Intersection Observer
        Replica o comportamento básico do AOS sem dependência
  ────────────────────────────────────────────────────────── */
  const animatedEls = document.querySelectorAll('[data-aos]');

  const observerOptions = {
    threshold: 0.12,       // elemento precisa estar 12% visível
    rootMargin: '0px 0px -40px 0px'
  };

  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.aosDelay || '0', 10);

      setTimeout(() => {
        el.classList.add('aos-animate');
      }, delay);

      // Para de observar após animar (animação one-shot)
      observer.unobserve(el);
    });
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  animatedEls.forEach(el => observer.observe(el));


  /* ──────────────────────────────────────────────────────────
     5. ANO DINÂMICO no footer
  ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}); // fim DOMContentLoaded
