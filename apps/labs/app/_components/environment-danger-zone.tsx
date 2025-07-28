'use client';

import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Skeleton } from '@repo/ui/skeleton';
import { useParams } from 'next/navigation';
import useEnvironment from '@/_hooks/use-environment';
import DeleteEnvironmentDialog from './delete-environment-dialog';

export default function EnvironmentDangerZone() {
  const { environmentId } = useParams();
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });

  return (
    <Card className='border-destructive/60 bg-destructive/10'>
      <div className='grid grid-cols-[22rem_1fr] gap-24'>
        <CardHeader
          padding
          description='Deleting an environment is permanent and cannot be undone.'
        >
          Delete Environment
        </CardHeader>
        <CardContent className='flex items-center justify-end p-6'>
          {!isLoadingEnvironment ? (
            <DeleteEnvironmentDialog
              environment={environment}
              trigger={
                <Button variant={'destructive'}>Delete this environment</Button>
              }
            />
          ) : (
            <Skeleton width='13.5625rem' height='2.5rem' />
          )}
        </CardContent>
      </div>
    </Card>
  );
}
