export interface SocialLink {
  id: number;
  icon: string;
  url: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 1,
    icon: 'fab fa-facebook',
    url: 'https://www.facebook.com/people/%D0%A3%D0%BA%D1%80%D0%B0%Dї%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D0%92%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%BE%D0%B2%D0%B8%D0%B9-%D0%A0%D1%83%D1%85/61575094014594/',
    label: 'Facebook'
  },
  {
    id: 2,
    icon: 'fab fa-telegram',
    url: 'https://t.me/ukrainianmilitarymovement',
    label: 'Telegram'
  }
]; 