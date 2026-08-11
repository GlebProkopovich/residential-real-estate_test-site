/**
 * Компонент подвала сайта
 */

import { COMPLEX } from '../data/complex.js';

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">${COMPLEX.fullName}</div>
            <p class="footer__desc">${COMPLEX.description}</p>
            <span class="footer__class">${COMPLEX.class} · Сдача ${COMPLEX.yearCompletion}</span>
          </div>

          <div class="footer__contacts">
            <h3 class="footer__title">Контакты</h3>
            <ul class="footer__list">
              <li>
                <span class="footer__label">Телефон</span>
                <a href="tel:${COMPLEX.phoneRaw}">${COMPLEX.phone}</a>
              </li>
              <li>
                <span class="footer__label">Email</span>
                <a href="mailto:${COMPLEX.email}">${COMPLEX.email}</a>
              </li>
              <li>
                <span class="footer__label">Адрес</span>
                <span>${COMPLEX.officeAddress}</span>
              </li>
              <li>
                <span class="footer__label">Режим работы</span>
                <span>${COMPLEX.workHours}</span>
              </li>
              <li>
                <span class="footer__label">Метро</span>
                <span>${COMPLEX.metro}</span>
              </li>
            </ul>
          </div>

          <div class="footer__nav">
            <h3 class="footer__title">Навигация</h3>
            <ul class="footer__list footer__list--links">
              <li><a href="#/" data-link>Главная</a></li>
              <li><a href="#/apartments" data-link>Квартиры</a></li>
              <li><a href="#/contacts" data-link>Контакты</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} ${COMPLEX.fullName}. Все права защищены.</p>
          <p class="footer__legal">Информация на сайте не является публичной офертой.</p>
        </div>
      </div>
    </footer>
  `;
}
