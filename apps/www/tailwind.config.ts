import sharedConfig from '@repo/config-tailwind';
import { uiContent } from '@repo/ui/core/ui-content';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: [...uiContent, './app/**/*.{ts,tsx,scss}'],
  presets: [sharedConfig as Partial<Config>],
};

export default config;
