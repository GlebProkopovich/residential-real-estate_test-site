/**
 * Данные жилого комплекса «Северный Сад»
 */

export const COMPLEX = {
  name: 'Северный Сад',
  fullName: 'ЖК «Северный Сад»',
  class: 'Бизнес+',
  address: 'г. Москва, Хорошёво-Мнёвники, ул. Набережная, 12',
  officeAddress: 'г. Москва, Хорошёво-Мнёвники, ул. Набережная, 12, офис продаж',
  phone: '+7 (495) 123-45-67',
  phoneRaw: '+74951234567',
  email: 'info@severny-sad.ru',
  workHours: 'Пн–Вс: 10:00 – 20:00',
  metro: 'Метро «Хорошёво» — 7 мин пешком',
  coords: { lat: 55.7767, lng: 37.4965 },
  description: 'Современный жилой комплекс бизнес-класса в зелёном районе Москвы с собственным парком, детскими площадками и развитой инфраструктурой.',
  yearCompletion: '2026',
  buildings: ['Корпус 1', 'Корпус 2', 'Корпус 3'],
  advantages: [
    {
      icon: '🌳',
      title: 'Собственный парк',
      text: '3 гектара благоустроенной территории с аллеями, прудом и зонами отдыха для всей семьи.'
    },
    {
      icon: '🏗️',
      title: 'Архитектура',
      text: 'Авторский проект с панорамным остеклением, террасами и фасадами из натуральных материалов.'
    },
    {
      icon: '🚇',
      title: 'Транспорт',
      text: '7 минут до метро «Хорошёво», прямой выезд на Звенигородское шоссе и МКАД.'
    },
    {
      icon: '🏫',
      title: 'Инфраструктура',
      text: 'Школы, детские сады, торговые центры и медицинские учреждения в шаговой доступности.'
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      text: 'Закрытая территория, видеонаблюдение 24/7, консьерж-сервис и подземный паркинг.'
    },
    {
      icon: '⚡',
      title: 'Технологии',
      text: 'Умный дом, система приточной вентиляции и энергоэффективные решения в каждой квартире.'
    }
  ]
};

export const APARTMENTS = [
  {
    id: '101',
    number: '101',
    building: 'Корпус 1',
    rooms: 1,
    floor: 3,
    totalFloors: 25,
    area: 38.5,
    price: 9850000,
    layout: '1K',
    features: ['Балкон', 'Вид во двор', 'White box'],
    description: 'Компактная однокомнатная квартира с продуманной планировкой и просторным балконом.'
  },
  {
    id: '102',
    number: '102',
    building: 'Корпус 1',
    rooms: 2,
    floor: 5,
    totalFloors: 25,
    area: 54.2,
    price: 13200000,
    layout: '2K',
    features: ['Лоджия', 'Вид на парк', 'White box'],
    description: 'Двухкомнатная квартира с видом на парк и просторной лоджией для семейного отдыха.'
  },
  {
    id: '205',
    number: '205',
    building: 'Корпус 1',
    rooms: 3,
    floor: 12,
    totalFloors: 25,
    area: 78.8,
    price: 18900000,
    layout: '3K',
    features: ['Панорамные окна', 'Две лоджии', 'White box'],
    description: 'Просторная трёхкомнатная квартира с панорамным остеклением и двумя лоджиями.'
  },
  {
    id: '301',
    number: '301',
    building: 'Корпус 2',
    rooms: 1,
    floor: 8,
    totalFloors: 22,
    area: 41.0,
    price: 10500000,
    layout: '1K',
    features: ['Балкон', 'Вид на реку', 'White box'],
    description: 'Однокомнатная квартира с видом на Москва-реку и уютным балконом.'
  },
  {
    id: '315',
    number: '315',
    building: 'Корпус 2',
    rooms: 2,
    floor: 15,
    totalFloors: 22,
    area: 62.5,
    price: 15800000,
    layout: '2K',
    features: ['Терраса', 'Вид на парк', 'White box'],
    description: 'Двухкомнатная квартира с террасой и панорамным видом на парк.'
  },
  {
    id: '402',
    number: '402',
    building: 'Корпус 2',
    rooms: 3,
    floor: 18,
    totalFloors: 22,
    area: 85.3,
    price: 21500000,
    layout: '3K',
    features: ['Панорамные окна', 'Гардеробная', 'White box'],
    description: 'Трёхкомнатная квартира с гардеробной и панорамными окнами на верхнем этаже.'
  },
  {
    id: '501',
    number: '501',
    building: 'Корпус 3',
    rooms: 1,
    floor: 2,
    totalFloors: 18,
    area: 36.8,
    price: 9200000,
    layout: '1K',
    features: ['Балкон', 'Вид во двор', 'White box'],
    description: 'Уютная однокомнатная квартира на низком этаже — идеально для молодых семей.'
  },
  {
    id: '512',
    number: '512',
    building: 'Корпус 3',
    rooms: 2,
    floor: 10,
    totalFloors: 18,
    area: 58.0,
    price: 14500000,
    layout: '2K',
    features: ['Лоджия', 'Вид на парк', 'White box'],
    description: 'Двухкомнатная квартира с удобной планировкой и видом на зелёную зону.'
  },
  {
    id: '601',
    number: '601',
    building: 'Корпус 3',
    rooms: 4,
    floor: 14,
    totalFloors: 18,
    area: 112.0,
    price: 28900000,
    layout: '4K',
    features: ['Терраса', 'Панорамные окна', 'Два санузла', 'White box'],
    description: 'Просторная четырёхкомнатная квартира с террасой для большой семьи.'
  },
  {
    id: '118',
    number: '118',
    building: 'Корпус 1',
    rooms: 2,
    floor: 7,
    totalFloors: 25,
    area: 56.8,
    price: 13800000,
    layout: '2K',
    features: ['Балкон', 'Вид во двор', 'White box'],
    description: 'Двухкомнатная квартира с балконом и тихим видом во внутренний двор.'
  },
  {
    id: '225',
    number: '225',
    building: 'Корпус 2',
    rooms: 1,
    floor: 4,
    totalFloors: 22,
    area: 39.5,
    price: 9900000,
    layout: '1K',
    features: ['Балкон', 'Вид на парк', 'White box'],
    description: 'Однокомнатная квартира с видом на парк и функциональной планировкой.'
  },
  {
    id: '308',
    number: '308',
    building: 'Корпус 3',
    rooms: 3,
    floor: 6,
    totalFloors: 18,
    area: 74.2,
    price: 17800000,
    layout: '3K',
    features: ['Лоджия', 'Вид на реку', 'White box'],
    description: 'Трёхкомнатная квартира с видом на реку и просторной лоджией.'
  }
];

export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export function getApartmentById(id) {
  return APARTMENTS.find(apt => apt.id === id) || null;
}

export function getRoomLabel(rooms) {
  if (rooms === 1) return '1 комната';
  if (rooms >= 2 && rooms <= 4) return `${rooms} комнаты`;
  return `${rooms} комнат`;
}

export function getApartmentAdvantages(apartment) {
  const advantages = [];

  if (apartment.features.includes('Панорамные окна')) {
    advantages.push({
      icon: '🪟',
      title: 'Панорамное остекление',
      text: 'Максимум естественного света и потрясающие виды из окон.'
    });
  }
  if (apartment.features.includes('Терраса')) {
    advantages.push({
      icon: '🌅',
      title: 'Терраса',
      text: 'Собственная терраса для отдыха на свежем воздухе.'
    });
  }
  if (apartment.features.includes('Вид на парк') || apartment.features.includes('Вид на реку')) {
    advantages.push({
      icon: '🌿',
      title: 'Живописный вид',
      text: 'Прекрасный вид на зелёные зоны и водную гладь.'
    });
  }
  if (apartment.area >= 70) {
    advantages.push({
      icon: '📐',
      title: 'Просторная планировка',
      text: 'Большая площадь для комфортной жизни всей семьи.'
    });
  }
  if (apartment.floor >= 10) {
    advantages.push({
      icon: '🏙️',
      title: 'Высокий этаж',
      text: 'Тишина, свежий воздух и панорамные виды на город.'
    });
  }
  advantages.push({
    icon: '✨',
    title: 'White box',
    text: 'Чистовая отделка white box — готовность к вашему дизайну.'
  });

  return advantages.slice(0, 4);
}
