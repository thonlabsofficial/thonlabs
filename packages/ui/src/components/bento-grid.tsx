import React from 'react';
import { cn } from '../core/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
};

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: any;
  afterSlot?: React.ReactNode;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon: Icon,
  children,
  afterSlot,
}: Props) => {
  const [animate, setAnimate] = React.useState(false);

  function handleMouseEnter() {
    setAnimate(true);
  }

  function handleMouseLeave() {
    setAnimate(false);
  }

  return (
    <Card
      className={cn('group/bento', className)}
      padding
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader className='mb-2'>
        {header}
        <div className='flex gap-2 transition duration-200 group-hover/bento:translate-x-1'>
          {Icon && (
            <div>
              <Icon size={24} animate={animate} />
            </div>
          )}
          <div>
            <CardTitle className='mb-2 text-neutral-600 dark:text-neutral-200'>
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {afterSlot}
    </Card>
  );
};
