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
  Image as ImageIcon,
  ExternalLink as ExternalLinkIcon,
  Rows2 as Rows2Icon,
} from 'lucide-react';
import {
  createSuggestionItems,
  Command as NovelCommand,
  renderItems,
} from 'novel/extensions';

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
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Image',
    description: 'Insert an image from a URL.',
    searchTerms: ['image', 'img', 'picture'],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setImage({
          src: 'data:image/png;base64,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',
        })
        .run();

      // Select the image node after it's inserted
      const { tr } = editor.state;
      const imagePos = tr.selection.$anchor.pos - 1;
      editor.commands.setNodeSelection(imagePos);
    },
  },
  {
    title: 'Button Link',
    description: 'Insert a button with link behaviour.',
    searchTerms: ['button', 'link'],
    icon: <ExternalLinkIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setButtonLink({}).run();
    },
  },
  {
    title: 'Container',
    description: 'Insert a centered container.',
    searchTerms: ['container'],
    icon: <Rows2Icon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setContainer({}).run();

      let activeContainerId;

      const { state, view } = editor;
      const { selection } = state;
      const { $from } = selection;

      for (let d = $from.depth; d > 0; d--) {
        const node = $from.node(d);
        if (node.type.name === 'container') {
          const dom = view.nodeDOM($from.before(d)) as HTMLElement;
          if (dom) {
            activeContainerId = dom.id;
            break;
          }
        }
      }

      if (activeContainerId) {
        editor
          .chain()
          .focus()
          .setContainerBackgroundColor({
            containerId: activeContainerId,
            color: '#f4f4f5',
          })
          .run();
      }
    },
  },
]);

export const slashExtension = NovelCommand.configure({
  suggestion: {
    items: () => slashItems,
    render: renderItems,
  },
});
