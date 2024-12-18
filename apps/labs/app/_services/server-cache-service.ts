'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateCache(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}
