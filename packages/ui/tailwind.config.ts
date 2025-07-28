import sharedConfig from '@repo/config-tailwind';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.{ts,tsx,scss}', './assets/**/*.svg'],
  presets: [sharedConfig as Partial<Config>],
};

export default config;
