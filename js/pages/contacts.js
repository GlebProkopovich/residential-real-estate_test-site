/**
 * Страница контактов
 */

import { COMPLEX } from '../data/complex.js';
import { renderCallbackFormSection } from '../components/callbackForm.js';

export function renderContactsPage() {
  return `
    <main>
      <section class="page-header">
        <div class="container">
          <h1 class="page-header__title">Контакты</h1>
          <p class="page-header__subtitle">Офис продаж ${COMPLEX.fullName}</p>
        </div>
      </section>

      <section class="section section--compact">
        <div class="container">
          <div class="contacts-grid">
            <div class="contacts-info">
              <div class="contacts-info__block">
                <h3>📍 Адрес офиса продаж</h3>
                <p>${COMPLEX.officeAddress}</p>
              </div>
              <div class="contacts-info__block">
                <h3>📞 Телефон</h3>
                <p><a href="tel:${COMPLEX.phoneRaw}">${COMPLEX.phone}</a></p>
              </div>
              <div class="contacts-info__block">
                <h3>✉️ Email</h3>
                <p><a href="mailto:${COMPLEX.email}">${COMPLEX.email}</a></p>
              </div>
              <div class="contacts-info__block">
                <h3>🕐 Режим работы</h3>
                <p>${COMPLEX.workHours}</p>
              </div>
              <div class="contacts-info__block">
                <h3>🚇 Как добраться</h3>
                <p>${COMPLEX.metro}</p>
                <p class="contacts-info__note">От метро «Хорошёво» — 7 минут пешком вдоль набережной.</p>
              </div>
            </div>

            <div class="contacts-map">
              <div class="contacts-map__placeholder" id="contacts-map">
                <div class="contacts-map__pin">📍</div>
                <p class="contacts-map__address">${COMPLEX.officeAddress}</p>
                <p class="contacts-map__coords">${COMPLEX.coords.lat}° N, ${COMPLEX.coords.lng}° E</p>
                <a href="https://yandex.ru/maps/?pt=${COMPLEX.coords.lng},${COMPLEX.coords.lat}&z=16&l=map"
                   target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm">
                  Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${renderCallbackFormSection()}
    </main>
  `;
}

export function initContactsPage() {
  // Map is static placeholder - no JS init needed
}
