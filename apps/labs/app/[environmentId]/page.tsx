import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '',
};

export default function Home({
  params,
}: {
  params: { environmentId: string };
}) {
  return redirect(`/${params.environmentId}/dashboard`);
}
