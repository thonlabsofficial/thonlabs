'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';

type Props = {
  sessionEnvironment: Environment;
};

export default function EnvironmentDetails({ sessionEnvironment }: Props) {
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentID: sessionEnvironment.id,
  });

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader description="Combine this ID with public key to retrieve information.">
          Environment ID
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="grid gap-5">
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={environment?.id}
                withCopy
              />
            </InputWrapper>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
