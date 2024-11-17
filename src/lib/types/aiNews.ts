export type AINewsItem = {
  uri: string;
  title: {
    eng: string;
  };
  summary: {
    eng: string;
  };
  eventDate: string;
  totalArticleCount: number;
  sentiment: number | null;
  concepts: Array<{
    uri: string;
    type: string;
    label: {
      eng: string;
    };
  }>;
};

export type AINewsResponse = {
  events: {
    results: AINewsItem[];
  };
};
