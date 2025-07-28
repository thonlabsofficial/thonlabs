import { useSWRConfig } from 'swr';
import type { MutatorOptions } from 'swr/_internal';

export default function useOptimisticUpdate() {
  const { cache, mutate: swrMutate } = useSWRConfig();

  function hasCache(cacheKey: string) {
    return cache.get(cacheKey) !== undefined;
  }

  function makeMutations(
    data: {
      cacheKey: string;
      populateCache: MutatorOptions['populateCache'];
    }[]
  ) {
    data.forEach(({ cacheKey, populateCache }) => {
      if (hasCache(cacheKey)) {
        swrMutate(cacheKey, null, {
          revalidate: false,
          populateCache,
        });
      }
    });
  }

  return { makeMutations, swrMutate };
}
