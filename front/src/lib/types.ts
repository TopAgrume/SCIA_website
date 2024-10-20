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
  photo: string;
};

type Suggestion = {
  type: "article" | "video" | "other";
  link: string;
  name: string;
  summary: string;
  by: string;
};

export type { Event };
