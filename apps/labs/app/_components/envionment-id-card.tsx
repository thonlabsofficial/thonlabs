'use client';

import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { useParams } from 'next/navigation';

export default function EnvironmentIdCard() {
  const { environmentId } = useParams();

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader
          padding
          description="This is the unique identifier for your environment."
        >
          Environment ID
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="grid gap-5">
            <InputWrapper>
              <Input readOnly value={environmentId} withCopy />
            </InputWrapper>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
