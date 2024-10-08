'use client';

import React from 'react';

import Editor, { JSONContent } from '@repo/ui/editor';

const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is an example for the editor',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'H1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'H2',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'H3',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text',
        },
      ],
    },
    {
      type: 'bulletList',
      attrs: {
        tight: true,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'new idea',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'idea',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function EmailTemplateEditor() {
  const [value, setValue] = React.useState<JSONContent>(defaultValue);

  return <Editor initialValue={value} onChange={setValue} />;
}
