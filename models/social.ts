interface Social {
  id?: string;
  media?: SocialMedium;
  link?: string;
  groupId?: string;
  memberId?: string;
  group?: Group;
  member?: Member;
}

enum SocialMedium {
  Facebook,
  Github,
  Instagram,
  LinkedIn,
  Reddit,
  Signal,
  Snapchat,
  Telegram,
  TikTok,
  Twitter,
  Website,
  Whatsapp,
  Youtube,
}