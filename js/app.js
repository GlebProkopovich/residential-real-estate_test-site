/**
 * SPA Router — маршрутизация на hash-based routing для GitHub Pages
 */

import { renderHeader, initHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import {
  renderCallbackModal,
  initCallbackForms,
  initCallbackModal,
  bindHeaderCallbackButton
} from './components/callbackForm.js';
import {
  renderBookingModal,
  initBookingForm,
  initBookingModal
} from './components/bookingForm.js';
import { renderHomePage, initHomePage } from './pages/home.js';
import { renderApartmentsPage, initApartmentsPage } from './pages/apartments.js';
import { renderApartmentDetailPage, initApartmentDetailPage } from './pages/apartmentDetail.js';
import { renderContactsPage, initContactsPage } from './pages/contacts.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');

function parseRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const path = hash.split('?')[0];

  if (path === '/' || path === '') {
    return { name: 'home', params: {} };
  }
  if (path === '/apartments') {
    return { name: 'apartments', params: {} };
  }
  if (path === '/contacts') {
    return { name: 'contacts', params: {} };
  }

  const aptMatch = path.match(/^\/apartment\/(.+)$/);
  if (aptMatch) {
    return { name: 'apartment-detail', params: { id: aptMatch[1] } };
  }

  return { name: 'not-found', params: {} };
}

function renderPage(route) {
  let pageContent = '';
  let activeRoute = route.name;

  switch (route.name) {
    case 'home':
      pageContent = renderHomePage();
      break;
    case 'apartments':
      pageContent = renderApartmentsPage();
      activeRoute = 'apartments';
      break;
    case 'apartment-detail':
      pageContent = renderApartmentDetailPage(route.params.id);
      activeRoute = 'apartment-detail';
      break;
    case 'contacts':
      pageContent = renderContactsPage();
      break;
    default:
      pageContent = `
        <main>
          <section class="section">
            <div class="container not-found">
              <h1>Страница не найдена</h1>
              <p>Запрашиваемая страница не существует.</p>
              <a href="#/" class="btn btn--primary" data-link>На главную</a>
            </div>
          </section>
        </main>
      `;
      activeRoute = 'home';
  }

  app.innerHTML = renderHeader(activeRoute) + pageContent + renderFooter();

  if (!modalRoot.querySelector('#callback-modal')) {
    modalRoot.innerHTML = renderCallbackModal() + renderBookingModal();
    initCallbackModal();
    initBookingModal();
    initBookingForm();
  }

  initHeader();
  bindHeaderCallbackButton();
  initCallbackForms();

  switch (route.name) {
    case 'home':
      initHomePage();
      break;
    case 'apartments':
      initApartmentsPage();
      break;
    case 'apartment-detail':
      initApartmentDetailPage(route.params.id);
      break;
    case 'contacts':
      initContactsPage();
      break;
  }

  window.scrollTo(0, 0);
  updatePageTitle(route);
}

function updatePageTitle(route) {
  const titles = {
    home: 'ЖК «Северный Сад» — Жилая недвижимость в Москве',
    apartments: 'Выбор квартиры — ЖК «Северный Сад»',
    contacts: 'Контакты — ЖК «Северный Сад»',
    'apartment-detail': `Квартира — ЖК «Северный Сад»`
  };
  document.title = titles[route.name] || 'ЖК «Северный Сад»';
}

function navigate() {
  const route = parseRoute();
  renderPage(route);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      window.location.hash = href.slice(1);
    }
  }
});

window.addEventListener('hashchange', navigate);

navigate();
