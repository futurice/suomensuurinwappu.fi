export interface Image {
  filename: string;
  alt?: string | null;
}

export enum LinkType {
  Email = 'email',
  Story = 'story',
  URL = 'url',
}

export type Link = {
  linktype: LinkType;
  email?: string;
  url?: string;
  cached_url?: string;
};
