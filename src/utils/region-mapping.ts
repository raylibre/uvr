/**
 * Відповідність ID областей із SVG-карти до backend region_id.
 * SVG використовує значення типу 'dnipropetrovsk', 'kyiv-city', тощо.
 * Backend очікує 'dnipropetrovsk_region', 'kyiv_city', і т.д.
 */
const SVG_TO_BACKEND_REGION: Record<string, string> = {
  'cherkasy': 'cherkasy_region',
  'chernihiv': 'chernihiv_region',
  'chernivtsi': 'chernivtsi_region',
  'dnipropetrovsk': 'dnipropetrovsk_region',
  'donetsk': 'donetsk_region',
  'ivano-frankivsk': 'ivano_frankivsk_region',
  'kharkiv': 'kharkiv_region',
  'kherson': 'kherson_region',
  'khmelnytskyi': 'khmelnytskyi_region',
  'kirovohrad': 'kirovohrad_region',
  'kyiv': 'kyiv_region',
  'kyiv-city': 'kyiv_city',
  'luhansk': 'luhansk_region',
  'lviv': 'lviv_region',
  'mykolaiv': 'mykolaiv_region',
  'odessa': 'odesa_region',
  'poltava': 'poltava_region',
  'rivne': 'rivne_region',
  'sumy': 'sumy_region',
  'ternopil': 'ternopil_region',
  'vinnytsia': 'vinnytsia_region',
  'volyn': 'volyn_region',
  'zakarpattia': 'zakarpattia_region',
  'zaporizhia': 'zaporizhzhia_region',
  'zhytomyr': 'zhytomyr_region',
  'crimea': 'crimea'
};

export function mapSvgRegionToBackend(id: string): string | null {
  return SVG_TO_BACKEND_REGION[id] || null;
}

