/**
 * Geographic-related constants
 * Contains regions, locations, and related mappings for Ukraine
 */

export enum UkraineRegion {
  KYIV_CITY = 'kyiv_city',
  KYIV_REGION = 'kyiv_region',
  KHARKIV_REGION = 'kharkiv_region',
  ODESA_REGION = 'odesa_region',
  DNIPRO_REGION = 'dnipro_region',
  DONETSK_REGION = 'donetsk_region',
  ZAPORIZHZHIA_REGION = 'zaporizhzhia_region',
  LVIV_REGION = 'lviv_region',
  POLTAVA_REGION = 'poltava_region',
  CHERNIHIV_REGION = 'chernihiv_region',
  CHERKASY_REGION = 'cherkasy_region',
  KHMELNYTSKYI_REGION = 'khmelnytskyi_region',
  ZHYTOMYR_REGION = 'zhytomyr_region',
  RIVNE_REGION = 'rivne_region',
  VOLYN_REGION = 'volyn_region',
  TERNOPIL_REGION = 'ternopil_region',
  IVANO_FRANKIVSK_REGION = 'ivano_frankivsk_region',
  CHERNIVTSI_REGION = 'chernivtsi_region',
  TRANSCARPATHIA_REGION = 'transcarpathia_region',
  SUMY_REGION = 'sumy_region',
  KIROVOHRAD_REGION = 'kirovohrad_region',
  MYKOLAIV_REGION = 'mykolaiv_region',
  KHERSON_REGION = 'kherson_region',
  LUHANSK_REGION = 'luhansk_region',
  CRIMEA = 'crimea',
  ABROAD = 'abroad'
}

export const UKRAINE_REGION_LABELS = {
  [UkraineRegion.KYIV_CITY]: 'м. Київ',
  [UkraineRegion.KYIV_REGION]: 'Київська область',
  [UkraineRegion.KHARKIV_REGION]: 'Харківська область',
  [UkraineRegion.ODESA_REGION]: 'Одеська область',
  [UkraineRegion.DNIPRO_REGION]: 'Дніпропетровська область',
  [UkraineRegion.DONETSK_REGION]: 'Донецька область',
  [UkraineRegion.ZAPORIZHZHIA_REGION]: 'Запорізька область',
  [UkraineRegion.LVIV_REGION]: 'Львівська область',
  [UkraineRegion.POLTAVA_REGION]: 'Полтавська область',
  [UkraineRegion.CHERNIHIV_REGION]: 'Чернігівська область',
  [UkraineRegion.CHERKASY_REGION]: 'Черкаська область',
  [UkraineRegion.KHMELNYTSKYI_REGION]: 'Хмельницька область',
  [UkraineRegion.ZHYTOMYR_REGION]: 'Житомирська область',
  [UkraineRegion.RIVNE_REGION]: 'Рівненська область',
  [UkraineRegion.VOLYN_REGION]: 'Волинська область',
  [UkraineRegion.TERNOPIL_REGION]: 'Тернопільська область',
  [UkraineRegion.IVANO_FRANKIVSK_REGION]: 'Івано-Франківська область',
  [UkraineRegion.CHERNIVTSI_REGION]: 'Чернівецька область',
  [UkraineRegion.TRANSCARPATHIA_REGION]: 'Закарпатська область',
  [UkraineRegion.SUMY_REGION]: 'Сумська область',
  [UkraineRegion.KIROVOHRAD_REGION]: 'Кіровоградська область',
  [UkraineRegion.MYKOLAIV_REGION]: 'Миколаївська область',
  [UkraineRegion.KHERSON_REGION]: 'Херсонська область',
  [UkraineRegion.LUHANSK_REGION]: 'Луганська область',
  [UkraineRegion.CRIMEA]: 'АР Крим',
  [UkraineRegion.ABROAD]: 'За кордоном'
} as const;

// Major cities for common locations
export const MAJOR_CITIES = [
  'Київ',
  'Харків',
  'Одеса',
  'Дніпро',
  'Донецьк',
  'Запоріжжя',
  'Львів',
  'Кривий Ріг',
  'Миколаїв',
  'Херсон',
  'Полтава',
  'Чернігів',
  'Черкаси',
  'Хмельницький',
  'Житомир',
  'Рівне',
  'Луцьк',
  'Тернопіль',
  'Івано-Франківськ',
  'Чернівці',
  'Ужгород',
  'Суми',
  'Кропивницький',
  'Луганск'
] as const;

// Regional service centers
export const REGIONAL_SERVICE_CENTERS = {
  [UkraineRegion.KYIV_CITY]: ['Київ'],
  [UkraineRegion.KYIV_REGION]: ['Біла Церква', 'Бровари', 'Ірпінь'],
  [UkraineRegion.KHARKIV_REGION]: ['Харків', 'Куп\'янськ'],
  [UkraineRegion.ODESA_REGION]: ['Одеса', 'Ізмаїл'],
  [UkraineRegion.DNIPRO_REGION]: ['Дніпро', 'Кривий Ріг'],
  [UkraineRegion.LVIV_REGION]: ['Львів', 'Дрогобич'],
  [UkraineRegion.ZAPORIZHZHIA_REGION]: ['Запоріжжя'],
  [UkraineRegion.POLTAVA_REGION]: ['Полтава']
} as const; 