/**
 * Страница конкретной квартиры
 */

import { getApartmentById, formatPrice, getRoomLabel, getApartmentAdvantages } from '../data/complex.js';
import { renderLayoutSvg } from './apartments.js';
import { renderCallbackFormSection } from '../components/callbackForm.js';

export function renderApartmentDetailPage(id) {
  const apartment = getApartmentById(id);

  if (!apartment) {
    return `
      <main>
        <section class="section">
          <div class="container not-found">
            <h1>Квартира не найдена</h1>
            <p>Запрашиваемая квартира не существует или уже продана.</p>
            <a href="#/apartments" class="btn btn--primary" data-link>Вернуться к каталогу</a>
          </div>
        </section>
      </main>
    `;
  }

  const advantages = getApartmentAdvantages(apartment).map(adv => `
    <div class="advantage-card advantage-card--compact">
      <div class="advantage-card__icon">${adv.icon}</div>
      <h3 class="advantage-card__title">${adv.title}</h3>
      <p class="advantage-card__text">${adv.text}</p>
    </div>
  `).join('');

  const features = apartment.features.map(f =>
    `<span class="tag">${f}</span>`
  ).join('');

  return `
    <main>
      <section class="page-header page-header--compact">
        <div class="container">
          <nav class="breadcrumbs">
            <a href="#/" data-link>Главная</a>
            <span>/</span>
            <a href="#/apartments" data-link>Квартиры</a>
            <span>/</span>
            <span>№ ${apartment.number}</span>
          </nav>
        </div>
      </section>

      <section class="section section--compact">
        <div class="container">
          <div class="apartment-detail">
            <div class="apartment-detail__layout">
              <div class="apartment-detail__layout-inner">
                ${renderLayoutSvg(apartment.layout, apartment.rooms)}
              </div>
              <p class="apartment-detail__layout-note">Схематичная планировка · ${apartment.area} м²</p>
            </div>

            <div class="apartment-detail__info">
              <h1 class="apartment-detail__title">
                ${getRoomLabel(apartment.rooms)}, ${apartment.area} м²
              </h1>
              <p class="apartment-detail__desc">${apartment.description}</p>

              <div class="apartment-detail__specs">
                <div class="spec-item">
                  <span class="spec-item__label">Номер</span>
                  <span class="spec-item__value">№ ${apartment.number}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item__label">Корпус</span>
                  <span class="spec-item__value">${apartment.building}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item__label">Этаж</span>
                  <span class="spec-item__value">${apartment.floor} из ${apartment.totalFloors}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item__label">Комнат</span>
                  <span class="spec-item__value">${apartment.rooms}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item__label">Площадь</span>
                  <span class="spec-item__value">${apartment.area} м²</span>
                </div>
                <div class="spec-item spec-item--price">
                  <span class="spec-item__label">Цена</span>
                  <span class="spec-item__value spec-item__value--price">${formatPrice(apartment.price)}</span>
                </div>
              </div>

              <div class="apartment-detail__tags">
                ${features}
              </div>

              <button class="btn btn--accent btn--lg btn--full" id="book-apartment-btn" type="button">
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--alt">
        <div class="container">
          <h2 class="section__title">Преимущества этой квартиры</h2>
          <div class="advantages-grid advantages-grid--compact">
            ${advantages}
          </div>
        </div>
      </section>

      ${renderCallbackFormSection()}
    </main>
  `;
}

export function initApartmentDetailPage(id) {
  const apartment = getApartmentById(id);
  if (!apartment) return;

  import('../components/bookingForm.js').then(({ bindBookingButton }) => {
    bindBookingButton(apartment);
  });
}
