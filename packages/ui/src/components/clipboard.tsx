import React from 'react';
import { Button } from './button';
import Utils from '@repo/utils';
import { useToast } from '../hooks/use-toast';
import { cn } from '../core/utils';
import { ButtonIcon } from './button-icon';
import { IconType } from 'react-icons';

type Props = {
  value: string;
  labels?: React.ReactNode[] | IconType[];
  onCopied?: () => void;
  onCopyFinished?: () => void;
};

function Clipboard({
  value,
  labels = ['Copy', 'Copied'],
  className,
  onCopied,
  onCopyFinished,
  ...props
}: Props & React.ComponentProps<typeof Button>) {
  const [idle, after] = labels;
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();
  const isIcon = (idle as any)?.toString()?.trim()?.startsWith('function Lu');

  async function handleClick() {
    if (copied) {
      return;
    }

    navigator.clipboard.writeText(value);
    onCopied?.();

    setCopied(true);
    toast({
      description: 'Copied to clipboard',
    });

    await Utils.delay(3000);
    setCopied(false);
    onCopyFinished?.();
  }

  return !isIcon ? (
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
