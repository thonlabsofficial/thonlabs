'use client';

import React from 'react';

import Editor, { JSONContent } from '@repo/ui/editor';

const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'wrapperFull',
      content: [
        {
          type: 'wrapperContent',
          content: [
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 1,
              },
              content: [
                {
                  type: 'text',
                  text: 'This is a 1st level heading',
                },
              ],
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 2,
              },
              content: [
                {
                  type: 'text',
                  text: 'This is a 2nd level heading',
                },
              ],
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 3,
              },
              content: [
                {
                  type: 'text',
                  text: 'This is a 3rd level heading',
                },
              ],
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 4,
              },
              content: [
                {
                  type: 'text',
                  text: 'This is a 4th level heading',
                },
              ],
            },
            {
              type: 'horizontalRule',
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.',
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  attrs: {
                    textAlign: 'left',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'List item 1',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  attrs: {
                    textAlign: 'left',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'List item 2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'orderedList',
              attrs: {
                start: 1,
              },
              content: [
                {
                  type: 'listItem',
                  attrs: {
                    textAlign: 'left',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'List item 2',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  attrs: {
                    textAlign: 'left',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'List item 2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'blockquote',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'left',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'This is a blockquote',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'codeBlock',
              attrs: {
                language: null,
              },
              content: [
                {
                  type: 'text',
                  text: 'for (var i=1; i <= 20; i++)\n{\n  if (i % 15 == 0)\n    console.log("FizzBuzz");\n  else if (i % 3 == 0)\n    console.log("Fizz");\n  else if (i % 5 == 0)\n    console.log("Buzz");\n  else\n    console.log(i);\n}',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'This is inline code',
                },
                {
                  type: 'text',
                  text: ' ',
                },
                {
                  type: 'hardBreak',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://www.google.com',
                        target: '_blank',
                        rel: 'noopener noreferrer nofollow',
                        class: null,
                      },
                    },
                  ],
                  text: 'This is a link',
                },
                {
                  type: 'text',
                  text: ' ',
                },
                {
                  type: 'hardBreak',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'buttonLink',
                      attrs: {
                        href: 'https://www.google.com',
                        target: '_blank',
                        rel: 'noopener noreferrer nofollow',
                        class: null,
                      },
                    },
                  ],
                  text: 'This is a button',
                },
                {
                  type: 'text',
                  text: ' ',
                },
                {
                  type: 'hardBreak',
                },
              ],
            },
            {
              type: 'image',
              attrs: {
                src: 'https://placehold.co/600x400',
                alt: 'Placeholder Image',
                title: null,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default function EmailTemplateEditor() {
  const [value, setValue] = React.useState<JSONContent>(defaultValue);

  return (
    <div className="w-[37.5rem] mx-auto rounded-sm overflow-hidden bg-foreground">
      <Editor initialValue={value} onChange={setValue} />
    </div>
  );
}
