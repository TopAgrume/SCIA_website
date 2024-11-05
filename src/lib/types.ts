type Event = {
  name: string;
  link: string;
  place: string;
  about: string;
  startDate: Date;
  endDate: Date | null;
  by: string;
  attending: boolean;
  participants: Array<string> | never[];
  isAuthor: boolean;
};

type Project = {
  name: string;
  about: string;
  link: string;
  by: string;
  photo: string | null;
  date: Date;
  isAuthor: boolean;
};

type Suggestion = {
  type: 'article' | 'video' | 'other';
  link: string;
  name: string;
  summary: string;
  by: string;
  date: Date;
  isAuthor: boolean;
};

export type { Event, Project, Suggestion };
