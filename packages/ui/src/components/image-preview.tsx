'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { cn } from '../core/utils';
import { Card } from './card';
import { Typo } from './typo';

const ImagePreview = ({
  children,
  src,
  className,
  ...props
}: {
  src?: string;
} & React.ComponentProps<typeof Card>) => {
  const { resolvedTheme } = useTheme();

  const [darkBackground, setDarkBackground] = React.useState(true);
  React.useEffect(() => {
    if (src) {
      const existingImg = document.querySelector(
        `img[src="${src}"]`
      ) as HTMLImageElement;

      if (existingImg) {
        // Wait for the existing image to load
        if (existingImg.complete) {
          analyzeImage(existingImg);
        } else {
          existingImg.addEventListener('load', () => analyzeImage(existingImg));
        }
      } else {
        // Fallback to creating a new image if needed
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onerror = (e) => {
          console.warn('Error loading image from thonlabs CDN:', e);
          setDarkBackground(true);
        };
        img.onload = () => analyzeImage(img);
      }
    }
  }, [src, analyzeImage]);

  const analyzeImage = (img: HTMLImageElement) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      if (!imageData) return;

      let nonTransparentPixels = 0;
      let totalBrightness = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i] || 0;
        const g = imageData[i + 1] || 0;
        const b = imageData[i + 2] || 0;
        const a = imageData[i + 3] || 0;

        // Only consider non-transparent pixels
        if (a > 0) {
          nonTransparentPixels++;
          // Using perceived brightness formula
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          totalBrightness += brightness;
        }
      }

      // Calculate average brightness only for non-transparent pixels
      const avgBrightness =
        nonTransparentPixels > 0 ? totalBrightness / nonTransparentPixels : 0;

      // Threshold of 0.7 works better for distinguishing light vs dark logos
      setDarkBackground(avgBrightness >= 0.7);
    } catch (error) {
      console.warn('Error analyzing image:', error);
      setDarkBackground(true);
    }
  };

  return (
    <Card
      variant='transparent'
      border='dashed'
      className={cn(
        `flex h-44 w-full select-none flex-col items-center justify-center overflow-hidden p-2`,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center rounded p-1',
          {
            'bg-accent': darkBackground && resolvedTheme === 'dark',
            'bg-accent-foreground':
              (!darkBackground && resolvedTheme === 'dark') ||
              (darkBackground && resolvedTheme === 'light'),
            'bg-transparent': !darkBackground && resolvedTheme === 'light',
          }
        )}
      >
        <div
          className='flex h-full w-full items-center justify-center bg-center bg-contain bg-no-repeat'
          style={{
            backgroundImage: `url(${src})`,
          }}
        >
          {children && <Typo variant={'sm'}>{children}</Typo>}
        </div>
      </div>
    </Card>
  );
};

export { ImagePreview };
