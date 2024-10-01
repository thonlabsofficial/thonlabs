'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import DeleteEnvironmentDialog from './delete-environment-dialog';
import { Skeleton } from '@repo/ui/skeleton';
import { useParams } from 'next/navigation';

export default function DangerZone() {
  const { environmentId } = useParams();
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });

  return (
    <Card className="border-destructive/60 bg-destructive/10">
      <div className="grid grid-cols-[22rem_1fr] gap-24">
        <CardHeader description="Deleting an environment is permanent and cannot be undone.">
          Delete Environment
        </CardHeader>
        <CardContent className="flex justify-end items-center p-6">
          {!isLoadingEnvironment ? (
            <DeleteEnvironmentDialog
              environment={environment}
              trigger={
                <Button variant={'destructive'}>Delete this environment</Button>
              }
            />
          ) : (
            <Skeleton width="13.5625rem" height="2.5rem" />
          )}
        </CardContent>
      </div>
    </Card>
  );
}
