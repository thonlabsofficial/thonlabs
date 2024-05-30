import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/config-tailwind/tailwind.config';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.{ts,tsx,scss}', './assets/**/*.svg'],
  presets: [sharedConfig],
};

export default config;
