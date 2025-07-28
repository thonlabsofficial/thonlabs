import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;
  return redirect(`/${environmentId}/dashboard`);
}
