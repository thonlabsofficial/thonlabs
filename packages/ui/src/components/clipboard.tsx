'use client';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button } from './button';
import { useToast } from '../hooks/use-toast';
import { cn } from '../core/utils';
import { ButtonIcon } from './button-icon';
import { IconType } from 'react-icons';
import { LucideProps } from 'lucide-react';

type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

type Props = {
  value: string;
  labels?: any;
  onCopied?: () => void;
  onCopyFinished?: () => void;
  iconLabels?: boolean;
};

function Clipboard({
  value,
  labels = ['Copy', 'Copied'],
  className,
  iconLabels,
  onCopied,
  onCopyFinished,
  ...props
}: Props & React.ComponentProps<typeof Button>) {
  const [idle, after] = labels;
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();
  const isTextLabel = typeof idle === 'string';

  const handleClick = React.useCallback(() => {
    if (copied) {
      return;
    }
    setCopied(true);

    navigator.clipboard.writeText(value);
    onCopied?.();

    toast({
      description: 'Copied to clipboard',
    });

    const timer = setTimeout(() => {
      setCopied(false);
      onCopyFinished?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [copied, value, onCopied, onCopyFinished, toast]);

  return isTextLabel ? (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(className, {
        'cursor-default': copied,
      })}
      {...props}
    >
      {!copied ? (idle as React.ReactNode) : (after as React.ReactNode)}
    </Button>
  ) : (
    <ButtonIcon
      icon={!copied ? (idle as IconType) : (after as IconType)}
      type="button"
      onClick={handleClick}
      className={cn(className, {
        'cursor-default': copied,
      })}
      {...props}
    />
  );
}

export { Clipboard };
