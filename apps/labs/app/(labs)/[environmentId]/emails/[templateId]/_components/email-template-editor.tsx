'use client';

import React from 'react';
import Editor, { JSONContent } from '@repo/ui/editor';

export default function EmailTemplateEditor() {
  const [value, setValue] = React.useState<JSONContent>({});

  return (
    <div className=" mx-auto rounded-sm overflow-hidden bg-foreground px-6 py-3 text-black">
      <Editor initialValue={value} onChange={setValue} />
    </div>
  );
}
