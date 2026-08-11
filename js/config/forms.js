/**
 * Настройки отправки форм через внешний сервис Web3Forms.
 * https://web3forms.com — бесплатный сервис без своего сервера.
 *
 * 1. Зарегистрируйтесь на https://web3forms.com
 * 2. Создайте Access Key (бесплатно)
 * 3. Вставьте ключ в WEB3FORMS_ACCESS_KEY ниже
 */

export const FORM_CONFIG = {
  accessKey: '978864f2-2c0f-42ad-95d3-321c6eb6b793',
  endpoint: 'https://api.web3forms.com/submit',
  enabled: true
};

/** Проверка, настроена ли отправка */
export function isFormServiceConfigured() {
  return FORM_CONFIG.enabled &&
    FORM_CONFIG.accessKey &&
    FORM_CONFIG.accessKey !== 'YOUR_ACCESS_KEY_HERE';
}
