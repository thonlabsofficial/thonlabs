import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { InputSwitch } from '@repo/ui/input-switch';
import { typoVariants } from '@repo/ui/typo';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Controller } from 'react-hook-form';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';
import { useOrganizations } from '@/_hooks/use-organizations';

interface Props {
  form: any;
  loading?: boolean;
  disabled?: boolean;
}

export default function EnableSignUpB2BOnlySwitch({
  form,
  loading,
  disabled,
}: Props) {
  const { environmentId } = useParams();
  const { organizations, isLoadingOrganizations } = useOrganizations();
  const organizationsMissingDomains = organizations?.every(
    (org) => org.domains.length === 0
  );

  return (
    <div className='flex flex-col gap-0.5'>
      <Controller
        name='enableSignUpB2BOnly'
        control={form.control}
        render={({ field }) => (
          <InputSwitch
            label='Restrict sign ups to B2B only'
            description={
              <>
                Allow only users with email matching your organization's
                approved domains.
              </>
            }
            value={field.value}
            onCheckedChange={field.onChange}
            checked={!!field.value}
            loading={loading || isLoadingOrganizations}
            disabled={
              disabled ||
              organizations?.length === 0 ||
              organizationsMissingDomains
            }
          />
        )}
      />

      {!isLoadingOrganizations && organizations?.length === 0 && (
        <Alert variant='info' className='mt-2' size={'sm'}>
          <AlertDescription>
            Want to enable sign up for B2B only?{' '}
            <NewOrganizationDrawer
              trigger={
                <button
                  type='button'
                  className={typoVariants({ variant: 'link' })}
                >
                  Create an organization first.
                </button>
              }
            />
          </AlertDescription>
        </Alert>
      )}

      {!isLoadingOrganizations &&
        organizations?.length > 0 &&
        organizationsMissingDomains && (
          <Alert variant='warning' className='mt-2' size={'sm'}>
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              None of your organizations have domains configured. To enable B2B
              sign ups,{' '}
              <Link
                href={`/${environmentId}/organizations`}
                className={typoVariants({ variant: 'link' })}
              >
                add domains to your organizations
              </Link>
              . Without domain configuration, users won't be able to sign up
              automatically.
            </AlertDescription>
          </Alert>
        )}
    </div>
  );
}
