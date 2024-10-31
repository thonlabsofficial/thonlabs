'use client';

import { useEffect, useState } from 'react';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input, inputVariants } from './input';
import { cn } from '../core/utils';

const colors = {
  white: '#ffffff',
  black: '#000000',
  'gray-50': '#fafafa',
  'red-50': '#fef2f2',
  'orange-50': '#fff7ed',
  'amber-50': '#fffbeb',
  'green-50': '#f0fdf4',
  'blue-50': '#eff6ff',
  'purple-50': '#faf5ff',
  'pink-50': '#fdf2f8',
  'gray-100': '#f4f4f5',
  'red-100': '#fee2e2',
  'orange-100': '#ffedd5',
  'amber-100': '#fef3c7',
  'green-100': '#dcfce7',
  'blue-100': '#dbeafe',
  'purple-100': '#f3e8ff',
  'pink-100': '#fce7f3',
  'gray-200': '#e4e4e7',
  'red-200': '#fecaca',
  'orange-200': '#fed7aa',
  'amber-200': '#fde68a',
  'green-200': '#bbf7d0',
  'blue-200': '#bfdbfe',
  'purple-200': '#e9d5ff',
  'pink-200': '#fbcfe8',
  'gray-300': '#d4d4d8',
  'red-300': '#fca5a5',
  'orange-300': '#fdba74',
  'amber-300': '#fcd34d',
  'green-300': '#86efac',
  'blue-300': '#93c5fd',
  'purple-300': '#d8b4fe',
  'pink-300': '#f9a8d4',
  'gray-400': '#a1a1aa',
  'red-400': '#f87171',
  'orange-400': '#fb923c',
  'amber-400': '#fbbf24',
  'green-400': '#4ade80',
  'blue-400': '#60a5fa',
  'purple-400': '#c084fc',
  'pink-400': '#f472b6',
  'gray-500': '#71717a',
  'red-500': '#ef4444',
  'orange-500': '#f97316',
  'amber-500': '#f59e0b',
  'green-500': '#22c55e',
  'blue-500': '#3b82f6',
  'purple-500': '#a855f7',
  'pink-500': '#ec4899',
  'gray-600': '#52525b',
  'red-600': '#dc2626',
  'orange-600': '#ea580c',
  'amber-600': '#d97706',
  'green-600': '#16a34a',
  'blue-600': '#2563eb',
  'purple-600': '#9333ea',
  'pink-600': '#db2777',
  'gray-700': '#3f3f46',
  'red-700': '#b91c1c',
  'orange-700': '#c2410c',
  'amber-700': '#b45309',
  'green-700': '#15803d',
  'blue-700': '#1d4ed8',
  'purple-700': '#7e22ce',
  'pink-700': '#be185d',
  'gray-800': '#27272a',
  'red-800': '#991b1b',
  'orange-800': '#9a3412',
  'amber-800': '#92400e',
  'green-800': '#166534',
  'blue-800': '#1e40af',
  'purple-800': '#6b21a8',
  'pink-800': '#9d174d',
  'gray-900': '#18181b',
  'red-900': '#7f1d1d',
  'orange-900': '#7c2d12',
  'amber-900': '#78350f',
  'green-900': '#14532d',
  'blue-900': '#1e3a8a',
  'purple-900': '#581c87',
  'pink-900': '#831843',
  'gray-950': '#09090b',
  'red-950': '#450a0a',
  'orange-950': '#431407',
  'amber-950': '#451a03',
  'green-950': '#052e16',
  'blue-950': '#172554',
  'purple-950': '#3b0764',
  'pink-950': '#500724',
};

interface Props extends React.ComponentPropsWithoutRef<typeof Popover> {
  defaultColor?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onSelect?: ({
    name,
    color,
  }: {
    name: keyof typeof colors;
    color: string;
  }) => void;
}

export function ColorPicker({
  defaultColor,
  size = 'md',
  onSelect,
  className,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(defaultColor);

  useEffect(() => {
    setCurrentColor(defaultColor);
  }, [defaultColor]);

  function handleSelect({
    name,
    color,
  }: {
    name: keyof typeof colors;
    color: string;
  }) {
    setCurrentColor(colors[name]);
    setIsOpen(false);

    onSelect?.({ name, color });
  }

  return (
    <Popover
      {...props}
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <div
          className={inputVariants({
            size,
            className: cn(
              'flex items-center gap-1 border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 !bg-transparent cursor-pointer',
              className,
            ),
          })}
        >
          <div
            className="flex-none basis-4 h-4 rounded border border-foreground/10"
            style={{ backgroundColor: currentColor }}
          />
          {currentColor}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent">
          <CommandList>
            <CommandGroup heading="Pick a color">
              <div className="grid grid-cols-8 gap-1 pt-0 pb-1 px-2 mb-1">
                {Object.entries(colors)
                  .slice(0, 2)
                  .map(([name, color]) => (
                    <CommandItem
                      className="w-5 h-5 flex !p-0 hover:bg-foreground/10 data-[selected='true']:bg-foreground/10"
                      key={name}
                      onSelect={() => {
                        handleSelect({
                          name: name as keyof typeof colors,
                          color,
                        });
                      }}
                    >
                      <div
                        className="w-full h-full rounded shadow-md border border-foreground/[0.07] hover:border-foreground transition-default"
                        style={{ backgroundColor: color }}
                      />
                    </CommandItem>
                  ))}
              </div>
              <div className="grid grid-cols-8 gap-1 pt-0 pb-1 px-2">
                {Object.entries(colors)
                  .slice(2)
                  .map(([name, color]) => (
                    <CommandItem
                      className="w-5 h-5 flex !p-0 hover:bg-foreground/10 data-[selected='true']:bg-foreground/10"
                      key={name}
                      onSelect={() => {
                        handleSelect({
                          name: name as keyof typeof colors,
                          color,
                        });
                      }}
                    >
                      <div
                        className="w-full h-full rounded shadow-md border border-foreground/[0.07] hover:border-foreground transition-default"
                        style={{ backgroundColor: color }}
                      />
                    </CommandItem>
                  ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
