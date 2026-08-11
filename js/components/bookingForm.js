/**
 * Форма бронирования квартиры (отдельный компонент для страницы квартиры)
 */

export function renderBookingModal() {
  return `
    <div class="modal" id="booking-modal" aria-hidden="true" role="dialog" aria-labelledby="booking-modal-title">
      <div class="modal__overlay" data-booking-close></div>
      <div class="modal__content modal__content--booking">
        <button class="modal__close" data-booking-close aria-label="Закрыть">&times;</button>
        <h2 class="modal__title" id="booking-modal-title">Забронировать квартиру</h2>
        <p class="modal__subtitle" id="booking-modal-subtitle"></p>
        <form class="form booking-form" id="booking-form" novalidate>
          <input type="hidden" name="apartmentId" id="booking-apartment-id">
          <div class="form__group">
            <label class="form__label" for="booking-name">Ваше имя</label>
            <input class="form__input" type="text" id="booking-name" name="name"
                   placeholder="Иван Иванов" required autocomplete="name">
            <span class="form__error" data-error="name"></span>
          </div>
          <div class="form__group">
            <label class="form__label" for="booking-phone">Телефон</label>
            <input class="form__input" type="tel" id="booking-phone" name="phone"
                   placeholder="+7 (___) ___-__-__" required autocomplete="tel">
            <span class="form__error" data-error="phone"></span>
          </div>
          <div class="form__group">
            <label class="form__label" for="booking-email">Email</label>
            <input class="form__input" type="email" id="booking-email" name="email"
                   placeholder="email@example.com" autocomplete="email">
            <span class="form__error" data-error="email"></span>
          </div>
          <div class="form__group">
            <label class="form__label" for="booking-comment">Комментарий</label>
            <textarea class="form__input form__textarea" id="booking-comment" name="comment"
                      placeholder="Удобное время для просмотра, вопросы..." rows="3"></textarea>
          </div>
          <div class="form__group form__group--checkbox">
            <label class="form__checkbox">
              <input type="checkbox" name="mortgage" id="booking-mortgage">
              <span>Интересует ипотека</span>
            </label>
          </div>
          <button class="btn btn--accent btn--full" type="submit">Забронировать</button>
          <p class="form__privacy">
            Бронирование не является договором. Менеджер подтвердит заявку по телефону.
          </p>
        </form>
      </div>
    </div>
  `;
}

function validateBookingForm(form) {
  let isValid = true;
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const emailInput = form.querySelector('[name="email"]');

  form.querySelectorAll('.form__error').forEach(el => el.textContent = '');
  form.querySelectorAll('.form__input').forEach(el => el.classList.remove('form__input--error'));

  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    showError(form, 'name', 'Введите ваше имя');
    isValid = false;
  }

  const phoneDigits = phoneInput.value.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    showError(form, 'phone', 'Введите корректный номер телефона');
    isValid = false;
  }

  const email = emailInput.value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(form, 'email', 'Введите корректный email');
    isValid = false;
  }

  return isValid;
}

function showError(form, field, message) {
  const errorEl = form.querySelector(`[data-error="${field}"]`);
  const inputEl = form.querySelector(`[name="${field}"]`);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.add('form__input--error');
}

function handleBookingSubmit(form, e) {
  e.preventDefault();
  if (!validateBookingForm(form)) return;

  const formData = new FormData(form);
  const data = {
    type: 'booking',
    apartmentId: formData.get('apartmentId'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    comment: formData.get('comment'),
    mortgage: formData.get('mortgage') === 'on',
    timestamp: new Date().toISOString()
  };

  console.log('[Booking Form] Заявка на бронирование:', data);

  form.innerHTML = `
    <div class="form__success">
      <div class="form__success-icon">✓</div>
      <h3>Квартира забронирована!</h3>
      <p>Менеджер свяжется с вами для подтверждения бронирования.</p>
    </div>
  `;
}

export function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => handleBookingSubmit(form, e));
  }
}

export function openBookingModal(apartment) {
  const modal = document.getElementById('booking-modal');
  if (!modal || !apartment) return;

  resetBookingForm();

  const subtitle = document.getElementById('booking-modal-subtitle');
  const aptIdInput = document.getElementById('booking-apartment-id');

  if (subtitle) {
    subtitle.textContent = `Квартира №${apartment.number}, ${apartment.building}, ${apartment.area} м²`;
  }
  if (aptIdInput) {
    aptIdInput.value = apartment.id;
  }

  modal.classList.add('modal--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

export function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  modal.querySelectorAll('[data-booking-close]').forEach(el => {
    el.addEventListener('click', () => closeBookingModal());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeBookingModal();
    }
  });
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

function resetBookingForm() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const content = modal.querySelector('.modal__content');
  if (!content || !content.querySelector('.form__success')) return;

  content.innerHTML = `
    <button class="modal__close" data-booking-close aria-label="Закрыть">&times;</button>
    <h2 class="modal__title" id="booking-modal-title">Забронировать квартиру</h2>
    <p class="modal__subtitle" id="booking-modal-subtitle"></p>
    <form class="form booking-form" id="booking-form" novalidate>
      <input type="hidden" name="apartmentId" id="booking-apartment-id">
      <div class="form__group">
        <label class="form__label" for="booking-name">Ваше имя</label>
        <input class="form__input" type="text" id="booking-name" name="name"
               placeholder="Иван Иванов" required autocomplete="name">
        <span class="form__error" data-error="name"></span>
      </div>
      <div class="form__group">
        <label class="form__label" for="booking-phone">Телефон</label>
        <input class="form__input" type="tel" id="booking-phone" name="phone"
               placeholder="+7 (___) ___-__-__" required autocomplete="tel">
        <span class="form__error" data-error="phone"></span>
      </div>
      <div class="form__group">
        <label class="form__label" for="booking-email">Email</label>
        <input class="form__input" type="email" id="booking-email" name="email"
               placeholder="email@example.com" autocomplete="email">
        <span class="form__error" data-error="email"></span>
      </div>
      <div class="form__group">
        <label class="form__label" for="booking-comment">Комментарий</label>
        <textarea class="form__input form__textarea" id="booking-comment" name="comment"
                  placeholder="Удобное время для просмотра, вопросы..." rows="3"></textarea>
      </div>
      <div class="form__group form__group--checkbox">
        <label class="form__checkbox">
          <input type="checkbox" name="mortgage" id="booking-mortgage">
          <span>Интересует ипотека</span>
        </label>
      </div>
      <button class="btn btn--accent btn--full" type="submit">Забронировать</button>
      <p class="form__privacy">
        Бронирование не является договором. Менеджер подтвердит заявку по телефону.
      </p>
    </form>
  `;

  modal.querySelectorAll('[data-booking-close]').forEach(el => {
    el.addEventListener('click', () => closeBookingModal());
  });

  initBookingForm();
}

export function bindBookingButton(apartment) {
  const btn = document.getElementById('book-apartment-btn');
  if (btn) {
    btn.addEventListener('click', () => openBookingModal(apartment));
  }
}
