import { cn } from '@repo/ui/core/utils';

export default function BreadcrumbSlashDivider({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-3 h-3 rotate-[327deg] stroke-foreground/40', className)}
      {...props}
    >
      <path d="M22 2 2 22" />
    </svg>
  );
}
