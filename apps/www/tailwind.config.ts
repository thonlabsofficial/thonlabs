import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/config-tailwind';
import { uiContent } from '@repo/ui/core/ui-content';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: [...uiContent, './app/**/*.{ts,tsx,scss}'],
  presets: [sharedConfig as Partial<Config>],
};

export default config;
