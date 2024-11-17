import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchLatestAINews } from '@/lib/api/aiNews';
import { type AINewsItem } from '@/lib/types/aiNews';

export function useAINews() {
  return useSuspenseQuery<AINewsItem[]>({
    queryKey: ['aiNews'],
    queryFn: async () => {
      const response = await fetchLatestAINews();
      return response.events.results;
    },
    staleTime: 24 * 60 * 60 * 1000, // Consider data fresh for 24 hours
    gcTime: 24 * 60 * 60 * 1000, // Keep data in cache for 24 hours
  });
}
