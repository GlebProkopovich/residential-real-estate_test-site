/**
 * Страница каталога квартир с фильтрами
 */

import { APARTMENTS, COMPLEX, formatPrice, getRoomLabel } from '../data/complex.js';
import { renderCallbackFormSection } from '../components/callbackForm.js';

function renderApartmentCard(apt) {
  return `
    <a href="#/apartment/${apt.id}" class="apartment-card" data-link>
      <div class="apartment-card__layout">
        ${renderLayoutSvg(apt.layout, apt.rooms)}
      </div>
      <div class="apartment-card__body">
        <div class="apartment-card__header">
          <span class="apartment-card__number">№ ${apt.number}</span>
          <span class="apartment-card__building">${apt.building}</span>
        </div>
        <h3 class="apartment-card__title">${getRoomLabel(apt.rooms)}, ${apt.area} м²</h3>
        <div class="apartment-card__details">
          <span>Этаж ${apt.floor}/${apt.totalFloors}</span>
          <span>${apt.features.slice(0, 2).join(' · ')}</span>
        </div>
        <div class="apartment-card__price">${formatPrice(apt.price)}</div>
      </div>
    </a>
  `;
}

function renderLayoutSvg(layout, rooms) {
  const layouts = {
    '1K': '<rect x="20" y="20" width="80" height="60" rx="4" fill="var(--color-sage-light)" stroke="var(--color-sage)" stroke-width="2"/><rect x="20" y="85" width="35" height="25" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="60" y="85" width="40" height="25" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/>',
    '2K': '<rect x="15" y="15" width="90" height="55" rx="4" fill="var(--color-sage-light)" stroke="var(--color-sage)" stroke-width="2"/><rect x="15" y="75" width="40" height="35" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="60" y="75" width="45" height="35" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="60" y="15" width="45" height="30" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/>',
    '3K': '<rect x="10" y="10" width="95" height="50" rx="4" fill="var(--color-sage-light)" stroke="var(--color-sage)" stroke-width="2"/><rect x="10" y="65" width="30" height="45" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="45" y="65" width="30" height="45" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="80" y="65" width="25" height="45" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/>',
    '4K': '<rect x="8" y="8" width="100" height="45" rx="4" fill="var(--color-sage-light)" stroke="var(--color-sage)" stroke-width="2"/><rect x="8" y="58" width="25" height="52" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="38" y="58" width="25" height="52" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="68" y="58" width="20" height="52" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/><rect x="93" y="58" width="15" height="52" rx="2" fill="var(--color-cream)" stroke="var(--color-sage)" stroke-width="1.5"/>'
  };

  return `
    <svg viewBox="0 0 120 120" class="layout-svg" aria-label="Планировка ${rooms}-комнатной квартиры">
      ${layouts[layout] || layouts['2K']}
    </svg>
  `;
}

export function renderApartmentsPage() {
  const buildingOptions = COMPLEX.buildings.map(b =>
    `<option value="${b}">${b}</option>`
  ).join('');

  return `
    <main>
      <section class="page-header">
        <div class="container">
          <h1 class="page-header__title">Выбор квартиры</h1>
          <p class="page-header__subtitle">${APARTMENTS.length} квартир в продаже · ${COMPLEX.fullName}</p>
        </div>
      </section>

      <section class="section section--compact">
        <div class="container">
          <div class="filters" id="filters">
            <div class="filters__group">
              <label class="filters__label">Комнатность</label>
              <div class="filters__buttons" id="filter-rooms">
                <button class="filter-btn filter-btn--active" data-value="">Все</button>
                <button class="filter-btn" data-value="1">1</button>
                <button class="filter-btn" data-value="2">2</button>
                <button class="filter-btn" data-value="3">3</button>
                <button class="filter-btn" data-value="4">4</button>
              </div>
            </div>

            <div class="filters__group">
              <label class="filters__label" for="filter-building">Корпус</label>
              <select class="form__input form__select filters__select" id="filter-building">
                <option value="">Все корпуса</option>
                ${buildingOptions}
              </select>
            </div>

            <div class="filters__group">
              <label class="filters__label" for="filter-floor-min">Этаж</label>
              <div class="filters__range">
                <input class="form__input filters__input" type="number" id="filter-floor-min"
                       placeholder="от" min="1" max="25">
                <span>—</span>
                <input class="form__input filters__input" type="number" id="filter-floor-max"
                       placeholder="до" min="1" max="25">
              </div>
            </div>

            <div class="filters__group">
              <label class="filters__label" for="filter-price-min">Цена, ₽</label>
              <div class="filters__range">
                <input class="form__input filters__input" type="number" id="filter-price-min"
                       placeholder="от" step="100000">
                <span>—</span>
                <input class="form__input filters__input" type="number" id="filter-price-max"
                       placeholder="до" step="100000">
              </div>
            </div>

            <div class="filters__group">
              <label class="filters__label" for="filter-sort">Сортировка</label>
              <select class="form__input form__select filters__select" id="filter-sort">
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
                <option value="area-asc">Площадь ↑</option>
                <option value="area-desc">Площадь ↓</option>
              </select>
            </div>

            <button class="btn btn--outline filters__reset" id="filter-reset" type="button">Сбросить</button>
          </div>

          <div class="apartments-count" id="apartments-count"></div>

          <div class="apartments-grid" id="apartments-grid">
          </div>

          <div class="apartments-empty" id="apartments-empty" hidden>
            <div class="apartments-empty__icon">🔍</div>
            <h3>Квартиры не найдены</h3>
            <p>Попробуйте изменить параметры фильтра</p>
          </div>
        </div>
      </section>

      ${renderCallbackFormSection()}
    </main>
  `;
}

function getFiltersFromDOM() {
  const roomsActive = document.querySelector('#filter-rooms .filter-btn--active');
  return {
    rooms: roomsActive ? roomsActive.dataset.value : '',
    building: document.getElementById('filter-building')?.value || '',
    floorMin: document.getElementById('filter-floor-min')?.value || '',
    floorMax: document.getElementById('filter-floor-max')?.value || '',
    priceMin: document.getElementById('filter-price-min')?.value || '',
    priceMax: document.getElementById('filter-price-max')?.value || '',
    sort: document.getElementById('filter-sort')?.value || 'price-asc'
  };
}

function filterApartments(filters) {
  let result = [...APARTMENTS];

  if (filters.rooms) {
    result = result.filter(apt => apt.rooms === parseInt(filters.rooms));
  }
  if (filters.building) {
    result = result.filter(apt => apt.building === filters.building);
  }
  if (filters.floorMin) {
    result = result.filter(apt => apt.floor >= parseInt(filters.floorMin));
  }
  if (filters.floorMax) {
    result = result.filter(apt => apt.floor <= parseInt(filters.floorMax));
  }
  if (filters.priceMin) {
    result = result.filter(apt => apt.price >= parseInt(filters.priceMin));
  }
  if (filters.priceMax) {
    result = result.filter(apt => apt.price <= parseInt(filters.priceMax));
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'area-asc':
      result.sort((a, b) => a.area - b.area);
      break;
    case 'area-desc':
      result.sort((a, b) => b.area - a.area);
      break;
  }

  return result;
}

function renderFilteredApartments() {
  const filters = getFiltersFromDOM();
  const filtered = filterApartments(filters);
  const grid = document.getElementById('apartments-grid');
  const empty = document.getElementById('apartments-empty');
  const count = document.getElementById('apartments-count');

  if (count) {
    const word = getApartmentWord(filtered.length);
    count.textContent = `Найдено: ${filtered.length} ${word}`;
  }

  if (grid && empty) {
    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
    } else {
      grid.innerHTML = filtered.map(renderApartmentCard).join('');
      empty.hidden = true;
    }
  }
}

function getApartmentWord(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return 'квартир';
  if (mod10 === 1) return 'квартира';
  if (mod10 >= 2 && mod10 <= 4) return 'квартиры';
  return 'квартир';
}

function applyQueryParams() {
  const hash = window.location.hash;
  const queryStart = hash.indexOf('?');
  if (queryStart === -1) return;

  const params = new URLSearchParams(hash.slice(queryStart));
  const building = params.get('building');
  if (building) {
    const select = document.getElementById('filter-building');
    if (select) select.value = building;
  }
}

export function initApartmentsPage() {
  applyQueryParams();
  renderFilteredApartments();

  document.querySelectorAll('#filter-rooms .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#filter-rooms .filter-btn').forEach(b =>
        b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      renderFilteredApartments();
    });
  });

  ['filter-building', 'filter-floor-min', 'filter-floor-max',
   'filter-price-min', 'filter-price-max', 'filter-sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', renderFilteredApartments);
      el.addEventListener('input', renderFilteredApartments);
    }
  });

  const resetBtn = document.getElementById('filter-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('#filter-rooms .filter-btn').forEach(b =>
        b.classList.remove('filter-btn--active'));
      document.querySelector('#filter-rooms .filter-btn[data-value=""]')
        ?.classList.add('filter-btn--active');
      document.getElementById('filter-building').value = '';
      document.getElementById('filter-floor-min').value = '';
      document.getElementById('filter-floor-max').value = '';
      document.getElementById('filter-price-min').value = '';
      document.getElementById('filter-price-max').value = '';
      document.getElementById('filter-sort').value = 'price-asc';
      renderFilteredApartments();
    });
  }
}

export { renderLayoutSvg };
