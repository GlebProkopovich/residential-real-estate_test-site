/**
 * Утилита отправки форм на внешний сервис (Web3Forms)
 */

import { FORM_CONFIG, isFormServiceConfigured } from '../config/forms.js';

/**
 * @param {Object} options
 * @param {string} options.formType - 'callback' | 'booking'
 * @param {string} options.subject - тема письма
 * @param {Record<string, string|boolean>} options.fields - поля формы
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitForm({ formType, subject, fields }) {
  if (!isFormServiceConfigured()) {
    return {
      success: false,
      message: 'Сервис отправки не настроен. Укажите access key в js/config/forms.js'
    };
  }

  const payload = {
    access_key: FORM_CONFIG.accessKey,
    subject,
    form_type: formType,
    ...fields
  };

  try {
    const response = await fetch(FORM_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message || 'Заявка успешно отправлена'
      };
    }

    return {
      success: false,
      message: data.message || `Сервер отклонил заявку (код ${response.status}). Попробуйте позже.`
    };
  } catch {
    return {
      success: false,
      message: 'Не удалось связаться с сервером. Проверьте интернет-соединение.'
    };
  }
}

export function setFormLoading(form, isLoading) {
  const submitBtn = form.querySelector('[type="submit"]');
  if (!submitBtn) return;

  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.classList.add('btn--loading');
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.originalText || submitBtn.textContent;
    submitBtn.classList.remove('btn--loading');
  }
}

export function showFormSuccess(form, { title, text }) {
  form.innerHTML = `
    <div class="form__success">
      <div class="form__success-icon">✓</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
}

export function showFormError(form, message) {
  let errorEl = form.querySelector('.form__submit-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form__submit-error';
    errorEl.setAttribute('role', 'alert');
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn?.insertAdjacentElement('beforebegin', errorEl);
  }
  errorEl.innerHTML = `<strong>Ошибка отправки.</strong> ${message}`;
  errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function clearFormError(form) {
  const errorEl = form.querySelector('.form__submit-error');
  if (errorEl) errorEl.remove();
}
