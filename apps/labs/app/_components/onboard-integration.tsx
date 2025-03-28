'use client';

import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';
import { BentoGrid, BentoGridItem } from '@repo/ui/bento-grid';
import {
  BoxesIcon,
  CpuIcon,
  IdCardIcon,
  RouteIcon,
  LayoutPanelTopIcon,
} from '@repo/ui/animated-icons';

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

const items = [
  {
    title: 'Step 1',
    description:
      'Paste the environment keys into your .env file, so we can know who you are.',
    icon: IdCardIcon,
    className: 'col-auto',
  },
  {
    title: 'Step 2',
    description: 'Install the package with your favorite package manager.',
    icon: BoxesIcon,
    className: 'col-auto',
  },
  {
    title: 'Step 3',
    description: 'Wrap ThonLabs in your layout',
    icon: LayoutPanelTopIcon,
    className: 'col-span-2',
  },
  {
    title: 'Step 4',
    description: 'Setup the API and auth routes',
    icon: RouteIcon,
    className: 'col-auto',
  },
  {
    title: 'Step 5',
    description: 'Setup the middleware to validate the user session',
    icon: CpuIcon,
    className: 'col-auto',
  },
];

export default function OnboardIntegration() {
  return (
    <div>
      <BentoGrid className="grid-cols-2 gap-2">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
