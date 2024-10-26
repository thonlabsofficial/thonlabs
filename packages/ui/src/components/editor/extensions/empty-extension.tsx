import { mergeAttributes, Node } from '@tiptap/core';

/**
 * This extension allows you to create paragraphs.
 * @see https://www.tiptap.dev/api/nodes/paragraph
 */
export const Empty = Node.create({
  name: 'empty',

  isolating: true,

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'block*',

  parseHTML() {
    return [{ tag: 'div' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
