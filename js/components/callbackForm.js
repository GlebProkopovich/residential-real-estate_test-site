/**
 * Форма обратного звонка (используется на всех страницах перед подвалом)
 */

import { COMPLEX } from '../data/complex.js';
import {
  submitForm,
  setFormLoading,
  showFormSuccess,
  showFormError,
  clearFormError
} from '../utils/formSubmit.js';

export function renderCallbackFormSection() {
  return `
    <section class="section section--callback">
      <div class="container">
        <div class="callback-block">
          <div class="callback-block__info">
            <h2 class="section__title">Заказать обратный звонок</h2>
            <p class="callback-block__text">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут
              в рабочее время. Консультация бесплатная.
            </p>
            <p class="callback-block__phone">
              Или позвоните нам: <a href="tel:${COMPLEX.phoneRaw}">${COMPLEX.phone}</a>
            </p>
          </div>
          <form class="form callback-form" id="callback-form-inline" novalidate>
            <div class="form__group">
              <label class="form__label" for="callback-name">Ваше имя</label>
              <input class="form__input" type="text" id="callback-name" name="name"
                     placeholder="Иван Иванов" required autocomplete="name">
              <span class="form__error" data-error="name"></span>
            </div>
            <div class="form__group">
              <label class="form__label" for="callback-phone">Телефон</label>
              <input class="form__input" type="tel" id="callback-phone" name="phone"
                     placeholder="+7 (___) ___-__-__" required autocomplete="tel">
              <span class="form__error" data-error="phone"></span>
            </div>
            <div class="form__group">
              <label class="form__label" for="callback-time">Удобное время</label>
              <select class="form__input form__select" id="callback-time" name="time">
                <option value="any">Любое время</option>
                <option value="morning">Утро (10:00 – 13:00)</option>
                <option value="day">День (13:00 – 17:00)</option>
                <option value="evening">Вечер (17:00 – 20:00)</option>
              </select>
            </div>
            <button class="btn btn--primary btn--full" type="submit">Жду звонка</button>
            <p class="form__privacy">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function renderCallbackModal() {
  return `
    <div class="modal" id="callback-modal" aria-hidden="true" role="dialog" aria-labelledby="callback-modal-title">
      <div class="modal__overlay" data-modal-close></div>
      <div class="modal__content">
        <button class="modal__close" data-modal-close aria-label="Закрыть">&times;</button>
        <h2 class="modal__title" id="callback-modal-title">Обратный звонок</h2>
        <p class="modal__subtitle">Мы перезвоним вам в ближайшее время</p>
        <form class="form callback-form" id="callback-form-modal" novalidate>
          <div class="form__group">
            <label class="form__label" for="modal-callback-name">Ваше имя</label>
            <input class="form__input" type="text" id="modal-callback-name" name="name"
                   placeholder="Иван Иванов" required autocomplete="name">
            <span class="form__error" data-error="name"></span>
          </div>
          <div class="form__group">
            <label class="form__label" for="modal-callback-phone">Телефон</label>
            <input class="form__input" type="tel" id="modal-callback-phone" name="phone"
                   placeholder="+7 (___) ___-__-__" required autocomplete="tel">
            <span class="form__error" data-error="phone"></span>
          </div>
          <div class="form__group">
            <label class="form__label" for="modal-callback-time">Удобное время</label>
            <select class="form__input form__select" id="modal-callback-time" name="time">
              <option value="any">Любое время</option>
              <option value="morning">Утро (10:00 – 13:00)</option>
              <option value="day">День (13:00 – 17:00)</option>
              <option value="evening">Вечер (17:00 – 20:00)</option>
            </select>
          </div>
          <button class="btn btn--primary btn--full" type="submit">Жду звонка</button>
        </form>
      </div>
    </div>
  `;
}

function validateCallbackForm(form) {
  let isValid = true;
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');

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

  return isValid;
}

function showError(form, field, message) {
  const errorEl = form.querySelector(`[data-error="${field}"]`);
  const inputEl = form.querySelector(`[name="${field}"]`);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.add('form__input--error');
}

async function handleCallbackSubmit(form, e) {
  e.preventDefault();
  if (!validateCallbackForm(form)) return;

  clearFormError(form);
  setFormLoading(form, true);

  const formData = new FormData(form);
  const result = await submitForm({
    formType: 'callback',
    subject: `[ЖК Северный Сад] Обратный звонок — ${formData.get('name')}`,
    fields: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      preferred_time: formData.get('time'),
      source: form.id === 'callback-form-modal' ? 'modal' : 'inline'
    }
  });

  setFormLoading(form, false);

  if (result.success) {
    showFormSuccess(form, {
      title: 'Заявка принята!',
      text: 'Мы свяжемся с вами в ближайшее время.'
    });
    return;
  }

  showFormError(form, result.message);
}

export function initCallbackForms() {
  const inlineForm = document.getElementById('callback-form-inline');
  const modalForm = document.getElementById('callback-form-modal');

  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => handleCallbackSubmit(inlineForm, e));
  }
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => handleCallbackSubmit(modalForm, e));
  }
}

export function openCallbackModal() {
  const modal = document.getElementById('callback-modal');
  if (modal) {
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

export function initCallbackModal() {
  const modal = document.getElementById('callback-modal');
  if (!modal) return;

  modal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', () => closeCallbackModal());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeCallbackModal();
    }
  });
}

function closeCallbackModal() {
  const modal = document.getElementById('callback-modal');
  if (modal) {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

export function bindHeaderCallbackButton() {
  const btn = document.getElementById('header-callback-btn');
  if (btn) {
    btn.addEventListener('click', openCallbackModal);
  }
}
