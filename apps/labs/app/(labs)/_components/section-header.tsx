import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';

export default function SectionHeader({
  title,
  description,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn('flex flex-col mb-4', className)}>
      <Typo variant="h4">{title}</Typo>
      {description && <Typo variant="muted">{description}</Typo>}
    </header>
  );
}
