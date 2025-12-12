import { useSWRConfig } from 'swr';

export default function useMutation() {
  const { cache, mutate } = useSWRConfig();

  function invalidateQueries(urls: string[]) {
    urls.forEach((url) => {
      const keys = Array.from(cache.keys()).filter((key: string) =>
        key.startsWith(url),
      );
      keys.forEach((key: string) => {
        mutate(key);
      });
    });
  }

  return { invalidateQueries };
}
