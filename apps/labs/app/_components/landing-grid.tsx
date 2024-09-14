import { cn } from '@repo/ui/core/utils';
import styles from './landing-grid.module.scss';

export default function LandingGrid() {
  return (
    <div
      className={cn(
        `
          absolute inset-0 z-[-1] -left-px opacity-60 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `,
        styles.landingGrid,
      )}
    ></div>
  );
}
