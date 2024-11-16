import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Globe } from 'lucide-react';
import CustomDomainSettings from '@/_components/custom-domain-settings';
import EmailDomainSettings from '@/_components/email-domain-settings';

export const metadata: Metadata = {
  title: 'Domains',
};

export default async function Domains() {
  return (
    <>
      <PageHeader title="Domains" icon={Globe} withContainer />
      <PageWrapper withContainer className="grid gap-12">
        <section>
          <EmailDomainSettings />
        </section>
        <section>
          <CustomDomainSettings />
        </section>
      </PageWrapper>
    </>
  );
}
