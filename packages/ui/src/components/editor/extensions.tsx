import { mergeAttributes, Node as CustomNode } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Paragraph from '@tiptap/extension-paragraph';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import {
  Text as TextIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  ListOrdered as ListOrderedIcon,
  TextQuote as TextQuoteIcon,
  SquareDashedBottomCode as SquareDashedBottomCodeIcon,
  Heading4 as Heading4Icon,
  List as ListIcon,
} from 'lucide-react';
import {
  createSuggestionItems,
  Command as NovelCommand,
  renderItems,
} from 'novel/extensions';

const emailDefaultStyles = {
  font: 'font-family:ui-sanserif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;line-height:1.625;color:#000;',
  fontCode:
    'font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;line-height:1.625;color:#000;',
};

export const emailExtensions = [
  StarterKit,
  CustomNode.create({
    name: 'wrapperFull',
    group: 'block',
    content: 'block*',
    parseHTML() {
      return [{ tag: 'body' }];
    },
    renderHTML() {
      return [
        'body',
        mergeAttributes(this.options.HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:16px;padding:16px;`,
        }),
        0,
      ];
    },
  }),
  CustomNode.create({
    name: 'wrapperContent',
    group: 'block',
    content: 'block*',
    parseHTML() {
      return [{ tag: 'table' }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        'table',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          align: 'center',
          width: '100%',
          border: '0',
          cellPadding: '0',
          cellSpacing: '0',
          role: 'presentation',
        }),
        ['tr', ['td', 0]],
      ];
    },
  }),
  Image,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Underline,
  FontFamily,
  Placeholder.configure({
    placeholder: 'Type something...',
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }).extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'a',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:inherit;text-decoration:underline;color:#3b82f6;`,
        }),
        0,
      ];
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'blockquote', 'listItem'],
  }),
  Heading.configure({
    levels: [1, 2, 3, 4],
  }).extend({
    renderHTML({ node, HTMLAttributes }) {
      const level = node.attrs.level;
      const mapper = {
        1: `${emailDefaultStyles.font}font-size:40px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:20px;`,
        2: `${emailDefaultStyles.font}font-size:32px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:20px;`,
        3: `${emailDefaultStyles.font}font-size:28px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:20px;`,
        4: `${emailDefaultStyles.font}font-size:24px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:20px;`,
      };

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: mapper[level as keyof typeof mapper],
        }),
        0,
      ];
    },
  }),
  Paragraph.extend({
    renderHTML({ HTMLAttributes, node }) {
      return [
        'p',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:inherit;color:inherit;margin-top:4px;margin-bottom:4px;`,
        }),
        0,
      ];
    },
  }),
  Blockquote.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'blockquote',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:18px!important;border-left:2px solid #71717a;color:#27272a;padding-left:16px`,
        }),
        0,
      ];
    },
  }),
  BulletList.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'ul',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:16px;list-style-type:disc;padding-left:16px`,
        }),
        0,
      ];
    },
  }),
  OrderedList.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'ol',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:16px;list-style-type:decimal;padding-left:16px`,
        }),
        0,
      ];
    },
  }),
  ListItem,
  HorizontalRule.extend({
    renderHTML() {
      return [
        'hr',
        mergeAttributes(this.options.HTMLAttributes, {
          style: `${emailDefaultStyles.font}border-top:1px solid #e4e4e7;margin-top:16px;margin-bottom:16px`,
        }),
        0,
      ];
    },
  }),
  CodeBlock.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'pre',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `margin-top:4px;margin-bottom:4px;padding: 12px 16px;background-color:#e5e5e5;border-radius:4px;`,
        }),
        [
          'code',
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            style: `${emailDefaultStyles.fontCode}font-size:14px;`,
          }),
          0,
        ],
      ];
    },
  }),
  Code.extend({
    renderHTML({ HTMLAttributes }) {
      return [
        'code',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.fontCode}padding:2px 4px;background-color:#e5e5e5;border-radius:4px;color:#ef4444;`,
        }),
        0,
      ];
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }).extend({
    name: 'buttonLink',
    group: 'block',
    content: 'inline*',
    parseHTML() {
      return [{ tag: 'buttonLink' }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        'a',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}color:#fff;text-decoration:none;display:table-cell;
          vertical-align:middle;white-space:nowrap;border-radius:6px;
          font-size:14px;line-height:20px;font-weight:700;text-decoration-line:none;
          background-color:#15172a;
          box-shadow:0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0,0,0,0.1), 0 1px 2px -1px rgb(0,0,0,0.1);
          height:46px;padding-left:16px;padding-right:16px;padding-top:8px;padding-bottom:8px`,
        }),
        0,
      ];
    },
  }),
];

export const slashItems = createSuggestionItems([
  {
    title: 'Text',
    description: 'Just start typing with plain text.',
    searchTerms: ['p', 'paragraph'],
    icon: <TextIcon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .run();
    },
  },
  {
    title: 'Heading 1',
    description: 'Big section heading.',
    searchTerms: ['title', 'big', 'large'],
    icon: <Heading1Icon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run();
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading.',
    searchTerms: ['subtitle', 'medium'],
    icon: <Heading2Icon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run();
    },
  },
  {
    title: 'Heading 3',
    description: 'Small section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading3Icon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run();
    },
  },
  {
    title: 'Heading 4',
    description: 'More small section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading4Icon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 4 })
        .run();
    },
  },
  {
    title: 'Code Block',
    description: 'Capture a code snippet.',
    searchTerms: ['codeblock'],
    icon: <SquareDashedBottomCodeIcon size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: 'Quote',
    description: 'Capture a quote.',
    searchTerms: ['blockquote'],
    icon: <TextQuoteIcon size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run(),
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bullet list.',
    searchTerms: ['unordered', 'point'],
    icon: <ListIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a list with numbering.',
    searchTerms: ['ordered'],
    icon: <ListOrderedIcon size={18} />,
    command: ({ editor, range }) => {
      console.log('ok', range);

      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
]);

export const slashExtension = NovelCommand.configure({
  suggestion: {
    items: () => slashItems,
    render: renderItems,
  },
});
