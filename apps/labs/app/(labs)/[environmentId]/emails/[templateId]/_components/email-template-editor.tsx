'use client';

import React from 'react';
import Editor, { JSONContent } from '@repo/ui/editor';

export default function EmailTemplateEditor() {
  const [value, setValue] = React.useState<JSONContent>(
    JSON.parse(window.localStorage.getItem('template') || '{}') || {},
  );

  return (
    <div className="mx-auto rounded-sm overflow-hidden bg-foreground p-6 text-black">
      <Editor
        initialValue={value}
        onUpdate={({ editor }) => {
          setValue(editor.getJSON());
          window.localStorage.setItem(
            'template',
            JSON.stringify(editor.getJSON()),
          );
        }}
      />
    </div>
  );
}
