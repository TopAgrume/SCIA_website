import { type AINewsResponse } from '../types/aiNews';

const AI_NEWS_API_KEY = '19b5054c-4a13-4fbb-9b6a-e8fd7fb905f7'; // dirty but free api key
const BASE_URL = 'https://eventregistry.org/api/v1/event/getEvents';

export async function fetchLatestAINews(): Promise<AINewsResponse> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resultType: 'events',
      conceptUri: 'http://en.wikipedia.org/wiki/Artificial_intelligence',
      eventsPage: 1,
      eventsCount: 5,
      eventsSortBy: 'date',
      eventsSortByAsc: false,
      eventsArticleBodyLen: -1,
      apiKey: AI_NEWS_API_KEY,
      forceMaxDataTimeWindow: 31,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI news');
  }

  return response.json();
}
