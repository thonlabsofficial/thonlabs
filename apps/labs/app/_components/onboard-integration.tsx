'use client';

import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';

export function OnboardIntegrationOptions() {
  return (
    <div>
      <ButtonGroup>
        <ButtonGroupItem active>Next.js@15</ButtonGroupItem>
        <ButtonGroupItem>Next.js@13+</ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}

export default function OnboardIntegration() {
  return <div>OnboardIntegration</div>;
}
