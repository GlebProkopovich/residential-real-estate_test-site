/**
 * Главная страница
 */

import { COMPLEX } from '../data/complex.js';
import { renderCallbackFormSection } from '../components/callbackForm.js';

export function renderHomePage() {
  const advantages = COMPLEX.advantages.map(adv => `
    <div class="advantage-card">
      <div class="advantage-card__icon">${adv.icon}</div>
      <h3 class="advantage-card__title">${adv.title}</h3>
      <p class="advantage-card__text">${adv.text}</p>
    </div>
  `).join('');

  return `
    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="hero__bg"></div>
        <div class="container hero__content">
          <span class="hero__badge">${COMPLEX.class}</span>
          <h1 class="hero__title">${COMPLEX.fullName}</h1>
          <p class="hero__subtitle">${COMPLEX.description}</p>
          <div class="hero__meta">
            <span>📍 ${COMPLEX.address}</span>
            <span>🚇 ${COMPLEX.metro}</span>
            <span>🏗️ Сдача ${COMPLEX.yearCompletion}</span>
          </div>
          <div class="hero__actions">
            <a href="#/apartments" class="btn btn--primary btn--lg" data-link>Выбрать квартиру</a>
            <button class="btn btn--outline btn--lg" id="hero-callback-btn" type="button">Обратный звонок</button>
          </div>
        </div>
      </section>

      <!-- Genplan -->
      <section class="section">
        <div class="container">
          <h2 class="section__title section__title--center">Генеральный план</h2>
          <p class="section__subtitle">Три корпуса на благоустроенной территории с парком и инфраструктурой</p>
          <div class="genplan">
            <div class="genplan__map">
              <div class="genplan__building genplan__building--1" data-building="Корпус 1">
                <span>Корпус 1</span>
                <small>25 этажей</small>
              </div>
              <div class="genplan__building genplan__building--2" data-building="Корпус 2">
                <span>Корпус 2</span>
                <small>22 этажа</small>
              </div>
              <div class="genplan__building genplan__building--3" data-building="Корпус 3">
                <span>Корпус 3</span>
                <small>18 этажей</small>
              </div>
              <div class="genplan__park">🌳 Парк</div>
              <div class="genplan__road">ул. Набережная</div>
            </div>
            <div class="genplan__legend">
              <div class="genplan__legend-item">
                <span class="genplan__legend-dot genplan__legend-dot--1"></span>
                Корпус 1 — 25 этажей, 1–3 комн.
              </div>
              <div class="genplan__legend-item">
                <span class="genplan__legend-dot genplan__legend-dot--2"></span>
                Корпус 2 — 22 этажа, 1–3 комн.
              </div>
              <div class="genplan__legend-item">
                <span class="genplan__legend-dot genplan__legend-dot--3"></span>
                Корпус 3 — 18 этажей, 1–4 комн.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Advantages -->
      <section class="section section--alt">
        <div class="container">
          <h2 class="section__title section__title--center">Преимущества ЖК</h2>
          <p class="section__subtitle">Всё для комфортной жизни в одном месте</p>
          <div class="advantages-grid">
            ${advantages}
          </div>
        </div>
      </section>

      ${renderCallbackFormSection()}
    </main>
  `;
}

export function initHomePage() {
  const heroBtn = document.getElementById('hero-callback-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      import('../components/callbackForm.js').then(({ openCallbackModal }) => {
        openCallbackModal();
      });
    });
  }

  document.querySelectorAll('.genplan__building').forEach(building => {
    building.addEventListener('click', () => {
      const buildingName = building.dataset.building;
      window.location.hash = `#/apartments?building=${encodeURIComponent(buildingName)}`;
    });
  });
}
