interface SocialLink {
  url?: string;
}

export interface Global {
  title: string;
  description: string;
  events: string;

  menu: string;

  teemunkierros: string;
  hervanta: string;
  center: string;
  elsewhere: string;
  registration: string;
  music: string;
  inside: string;
  outside: string;
  remote: string;

  backToCalendar: string;

  searchPlaceholder: string;

  social: string;
  instagramLabel: string;
  instagram: SocialLink;
  facebookLabel: string;
  facebook: SocialLink;
  telegramLabel: string;
  telegram: SocialLink;
  wappuradioLabel: string;
  wappuradio: SocialLink;
}
