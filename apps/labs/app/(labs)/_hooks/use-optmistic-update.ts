import { useSWRConfig } from 'swr';
import { MutatorOptions } from 'swr/_internal';

export default function useOptimisticUpdate() {
  const { mutate: swrMutate } = useSWRConfig();

  function makeMutations(
    data: {
      cacheKey: string;
      populateCache: MutatorOptions['populateCache'];
    }[],
  ) {
    data.forEach(({ cacheKey, populateCache }) => {
      swrMutate(cacheKey, null, {
        revalidate: false,
        populateCache,
      });
    });
  }

  return { makeMutations };
}
