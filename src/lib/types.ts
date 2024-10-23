type Event = {
  name: string;
  link: string;
  place: string;
  about: string;
  start_date: Date;
  end_date: Date | null;
  by: string;
  attending: boolean;
  participants: Array<string>;
  is_author: boolean;
};

type User = {
  login: string;
  mail: string;
};

type Project = {
  name: string;
  about: string;
  link: string;
  by: string;
  photo: string | null;
  date: Date;
  is_author: boolean;
};

type Suggestion = {
  type: 'article' | 'video' | 'other';
  link: string;
  name: string;
  summary: string;
  by: string;
  date: Date;
  is_author: boolean;
};

export type { Event, Project, Suggestion };
