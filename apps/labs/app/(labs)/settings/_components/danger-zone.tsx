'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import DeleteEnvironmentDialog from './delete-environment-dialog';
import { Skeleton } from '@repo/ui/skeleton';

type Props = {
  sessionEnvironment: Environment;
};

export default function DangerZone({ sessionEnvironment }: Props) {
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentID: sessionEnvironment.id,
  });

  return (
    <Card className="border-red-500/[.3]">
      <div className="grid grid-cols-[22rem_1fr] gap-24">
        <CardHeader description="Deleting an environment is permanent and cannot be undone. Please confirm you’re absolutely sure.">
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
