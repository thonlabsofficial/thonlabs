import { cn } from '@repo/ui/core/utils';
import { Skeleton } from '@repo/ui/skeleton';
import { Typo } from '@repo/ui/typo';

export default function SectionHeader({
  title,
  description,
  className,
  loading,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  loading?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'title'>) {
  return (
    <header className={cn('mb-4 flex flex-col gap-0.5', className)}>
      {!loading ? (
        <Typo variant='h4'>{title}</Typo>
      ) : (
        <Skeleton className='h-7' />
      )}
      {description &&
        (!loading ? (
          <Typo variant='muted'>{description}</Typo>
        ) : (
          <div className='mt-0.5 flex flex-col gap-1'>
            <Skeleton className='h-4' />
            <Skeleton className='!w-1/3 h-4' />
          </div>
        ))}
    </header>
  );
}
