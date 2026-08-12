/**
 * Отправка ecommerce-событий в Яндекс.Метрику через dataLayer
 */

const DESKTOP_BREAKPOINT = window.matchMedia('(min-width: 769px)');

const PURCHASE_ACTION_ID = 'a41885jjhga2_55';

/**
 * @param {{ number: string, price: number }} apartment
 */
export function pushBookingPurchaseEvent(apartment) {
  if (!DESKTOP_BREAKPOINT.matches || !apartment) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: {
      currencyCode: 'RUB',
      purchase: {
        actionField: {
          id: PURCHASE_ACTION_ID
        },
        products: [
          {
            id: apartment.number,
            price: apartment.price
          }
        ]
      }
    }
  });
}
