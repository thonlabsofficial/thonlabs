export const api = <T>(
  url: string,
  {
    environmentId,
    publicKey,
  }: {
    environmentId: string;
    publicKey: string;
  },
) =>
  fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_TL_API
        : 'https://api.thonlabs.io'
    }${url}`,
    {
      headers: {
        'tl-env-id': environmentId,
        'tl-public-key': publicKey,
      },
    },
  ).then((res) => res.json() as Promise<T>);

export const fetcher =
  ({
    environmentId,
    publicKey,
  }: {
    environmentId: string;
    publicKey: string;
  }) =>
  (url: string) =>
    fetch(
      `${
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_TL_API
          : 'https://api.thonlabs.io'
      }${url}`,
      {
        headers: {
          'tl-env-id': environmentId,
          'tl-public-key': publicKey,
        },
      },
    ).then((res) => res.json());
