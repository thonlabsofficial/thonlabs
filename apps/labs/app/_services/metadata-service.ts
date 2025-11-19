'use server';

import { Metadata } from '@/_interfaces/metadata';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';

interface MetadataResponse {
  items: Metadata[];
}

export async function fetchMetadata(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<MetadataResponse>(
    `/metadata/models`,
    serverEnvHeaders(environmentId),
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
