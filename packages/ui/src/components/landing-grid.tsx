import { cn } from '@repo/ui/core/utils';

export default function LandingGrid() {
  return (
    <div
      className={cn(
        `
          absolute inset-0 z-[-1] -left-px 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `,
      )}
      style={{
        backgroundImage: `linear-gradient(
          to right,
          hsl(var(--muted)) 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    ></div>
  );
}
