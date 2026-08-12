/**
 * Синхронизация значений полей форм в HTML-атрибуты
 * для доступа через DOM (getAttribute), а не только через .value
 */

export function syncFieldToAttribute(field) {
  if (!(field instanceof HTMLElement)) return;

  if (field.type === 'checkbox') {
    field.toggleAttribute('checked', field.checked);
    field.setAttribute('value', field.checked ? 'true' : 'false');
    return;
  }

  if (field.type === 'radio') {
    field.toggleAttribute('checked', field.checked);
    field.setAttribute('value', field.value);
    return;
  }

  if (field.tagName === 'TEXTAREA') {
    field.setAttribute('value', field.value);
    return;
  }

  if (field.tagName === 'SELECT') {
    field.setAttribute('value', field.value);
    return;
  }

  field.setAttribute('value', field.value);
}

export function bindFormAttributeSync(form) {
  if (!(form instanceof HTMLFormElement)) return;
  if (form.dataset.valueSync === 'true') return;
  form.dataset.valueSync = 'true';

  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach((field) => {
    syncFieldToAttribute(field);
    field.addEventListener('input', () => syncFieldToAttribute(field));
    field.addEventListener('change', () => syncFieldToAttribute(field));
  });
}

export function initFormAttributeSync(root = document) {
  root.querySelectorAll('form').forEach(bindFormAttributeSync);
}
