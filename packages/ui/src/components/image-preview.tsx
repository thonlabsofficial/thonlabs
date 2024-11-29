import { useTheme } from 'next-themes';
import React from 'react';
import { cn } from '../core/utils';
import { Card } from './card';

const ImagePreview = ({
  children,
  imageSRC,
}: {
  children: React.ReactNode;
  imageSRC?: string;
}) => {
  const { resolvedTheme } = useTheme();

  const [darkBackground, setDarkBackground] = React.useState(true);
  React.useEffect(() => {
    if (imageSRC) {
      const img = new Image();
      img.src = imageSRC;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const imageData = ctx?.getImageData(0, 0, img.width, img.height).data;
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
      };
    }
  }, [imageSRC]);

  return (
    <Card
      variant="transparent"
      border="dashed"
      className={cn(
        `flex flex-col h-44 items-center justify-center w-full
    p-2 overflow-hidden select-none`,
      )}
    >
      <div
        className={cn(
          'rounded w-full h-full p-1 flex items-center justify-center',
          {
            'bg-accent': darkBackground && resolvedTheme === 'dark',
            'bg-accent-foreground':
              (!darkBackground && resolvedTheme === 'dark') ||
              (darkBackground && resolvedTheme === 'light'),
            'bg-transparent': !darkBackground && resolvedTheme === 'light',
          },
        )}
      >
        {children}
      </div>
    </Card>
  );
};

export { ImagePreview };
