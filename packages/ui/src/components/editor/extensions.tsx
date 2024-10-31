import { mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
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
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import AutoJoiner from 'tiptap-extension-auto-joiner';
import { Image } from './extensions/image-extension';
import { ButtonLink } from './extensions/button-link-extension';
import { Container } from './extensions/container-extension';
import { Empty } from './extensions/empty-extension';

const emailDefaultStyles = {
  font: 'font-family:ui-sanserif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;line-height:1.625;color:inherit;',
  fontCode:
    'font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;line-height:1.625;color:inherit;',
};

export const emailExtensions = [
  StarterKit,
  Underline,
  FontFamily,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Placeholder.configure({
    placeholder: "Press '/' for commands",
  }),
  ButtonLink.extend({
    name: 'buttonLink',
    renderHTML({ HTMLAttributes }) {
      const { style, ...rest } = HTMLAttributes;

      return [
        'div',
        {
          style: `margin-top:4px;margin-bottom:4px;${style}`,
        },
        [
          'a',
          mergeAttributes(this.options.HTMLAttributes, rest, {
            style: `${emailDefaultStyles.font}color:#fff;text-decoration:none;
          vertical-align:middle;white-space:nowrap;border-radius:6px;
          font-size:14px;line-height:20px;font-weight:700;text-decoration-line:none;
          background-color:#15172a;display:inline-block;
          box-shadow:0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0,0,0,0.1), 0 1px 2px -1px rgb(0,0,0,0.1);
          height:46px;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px`,
          }),
          0,
        ],
      ];
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }).extend({
    inclusive: false,

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
        1: `${emailDefaultStyles.font}font-size:40px;font-weight:700;line-height:2rem;margin-top:8px;margin-bottom:8px;`,
        2: `${emailDefaultStyles.font}font-size:32px;font-weight:700;line-height:2rem;margin-top:8px;margin-bottom:8px;`,
        3: `${emailDefaultStyles.font}font-size:28px;font-weight:700;line-height:2rem;margin-top:8px;margin-bottom:8px;`,
        4: `${emailDefaultStyles.font}font-size:24px;font-weight:700;line-height:2rem;margin-top:8px;margin-bottom:8px;`,
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
    renderHTML({ HTMLAttributes }) {
      return [
        'p',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: `${emailDefaultStyles.font}font-size:inherit;margin-top:4px;margin-bottom:4px;min-height:16px;`,
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
  Image.configure({
    emailTemplate: true,
    openOnClick: false,
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Empty,
  Container,
];

export const dragNDropExtension = [GlobalDragHandle, AutoJoiner];
