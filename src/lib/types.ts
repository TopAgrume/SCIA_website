type Event = {
  name: string;
  link: string;
  place: string;
  about: string;
  startDate: Date;
  endDate: Date;
  imagePath: string;
  by: string; // who made the event
  attending: boolean; // if the current user is attending to this event
  participants: Array<string>;
  isAuthor: boolean; // if the user made the post => he can modify or delete it
};

type Project = {
  name: string;
  about: string;
  link: string;
  by: string; // who made the project
  image?: string | null;
  date: Date;
  isAuthor: boolean; // same as for Event
};

type Suggestion = {
  type: 'ARTICLE' | 'VIDEO';
  link: string;
  name: string;
  summary: string;
  by: string; // the user who made the suggestion
  date: Date;
  isAuthor: boolean; // same as for Event
};

export type { Event, Project, Suggestion };
