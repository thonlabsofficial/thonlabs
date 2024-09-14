import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function AuthNestedLayout({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return children;
}
