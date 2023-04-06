import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

interface SocialLink {
  url?: string;
}

export interface Global {
  title: string;
  description: string;
  events: string;

  menu: string;

  date: string;

  filter: string;
  filterButton: string;
  filterReset: string;
  filterAll: string;
  teemunkierros: string;
  location: string;
  place: string;
  hervanta: string;
  center: string;
  elsewhere: string;
  registration: string;
  music: string;
  inside: string;
  outside: string;
  remote: string;
  free: string;
  accessible: string;
  party: string;
  exercise: string;
  searchPlaceholder: string;

  backToCalendar: string;

  social: string;
  instagramLabel: string;
  instagram: SocialLink;
  facebookLabel: string;
  facebook: SocialLink;
  telegramLabel: string;
  telegram: SocialLink;
  wappuradioLabel: string;
  wappuradio: SocialLink;

  consentInfo: StoryblokRichtext;
  consentDecline: string;
  consentAccept: string;
}
