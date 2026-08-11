/**
 * Компонент шапки сайта
 */

import { COMPLEX } from '../data/complex.js';

export function renderHeader(activeRoute) {
  const navItems = [
    { path: '/', label: 'Главная', route: 'home' },
    { path: '/apartments', label: 'Квартиры', route: 'apartments' },
    { path: '/contacts', label: 'Контакты', route: 'contacts' }
  ];

  const navLinks = navItems.map(item => {
    const isActive = activeRoute === item.route ||
      (item.route === 'apartments' && activeRoute === 'apartment-detail');
    return `<a href="#${item.path}" class="nav-link${isActive ? ' nav-link--active' : ''}" data-link>${item.label}</a>`;
  }).join('');

  return `
    <header class="header">
      <div class="container header__inner">
        <a href="#/" class="header__logo" data-link>
          <span class="header__logo-icon">🌿</span>
          <span class="header__logo-text">
            <span class="header__logo-name">${COMPLEX.fullName}</span>
            <span class="header__logo-class">${COMPLEX.class}</span>
          </span>
        </a>

        <button class="header__burger" id="burger-btn" aria-label="Открыть меню" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="header__nav" id="main-nav">
          ${navLinks}
        </nav>

        <div class="header__actions">
          <a href="tel:${COMPLEX.phoneRaw}" class="header__phone">${COMPLEX.phone}</a>
          <button class="btn btn--primary btn--sm" id="header-callback-btn" type="button">
            Обратный звонок
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initHeader() {
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('header__nav--open');
      burger.classList.toggle('header__burger--open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('header__nav--open');
        burger.classList.remove('header__burger--open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
