import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';

export interface ImageOptions {
  /**
   * Controls if the image node should be inline or not.
   * @default false
   * @example true
   */
  inline: boolean;

  /**
   * Controls if base64 images are allowed. Enable this if you want to allow
   * base64 image urls in the `src` attribute.
   * @default false
   * @example true
   */
  allowBase64: boolean;

  /**
   * HTML attributes to add to the image element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        style?: string;
        width?: number;
        height?: number;
      }) => ReturnType;
      setImageAlign: (alignment: 'left' | 'center' | 'right') => ReturnType;
      setImageSize: (options: { width: number; height: number }) => ReturnType;
    };
  }
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

/**
 * This extension allows you to insert images.
 * @see https://www.tiptap.dev/api/nodes/image
 */
export const Image = Node.create<ImageOptions>({
  name: 'image',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      style: {
        default: null,
      },
      imageAlign: {
        default: 'left',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      setImageAlign:
        (alignment: 'left' | 'center' | 'right') =>
        ({ commands, state }) => {
          const imageInfo = document.querySelector(
            '.ProseMirror-selectednode',
          ) as HTMLImageElement;
          const node = state.doc.nodeAt(state.selection.from);

          switch (alignment) {
            case 'left':
              imageInfo.style.marginLeft = '0';
              imageInfo.style.marginRight = 'auto';
              break;
            case 'center':
              imageInfo.style.marginLeft = 'auto';
              imageInfo.style.marginRight = 'auto';
              break;
            case 'right':
              imageInfo.style.marginLeft = 'auto';
              imageInfo.style.marginRight = '0';
              break;
          }

          return commands.updateAttributes(this.name, {
            ...node?.attrs,
            style: imageInfo.getAttribute('style'),
            imageAlign: alignment,
          });
        },
      setImageSize:
        ({ width, height }: { width: number; height: number }) =>
        ({ commands, state }) => {
          const imageInfo = document.querySelector(
            '.ProseMirror-selectednode',
          ) as HTMLImageElement;
          const node = state.doc.nodeAt(state.selection.from);

          imageInfo.style.width = `${width}px`;
          imageInfo.style.height = `${height}px`;

          return commands.updateAttributes(this.name, {
            style: imageInfo.getAttribute('style'),
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, style, width, height] = match;

          return { src, alt, title, style, width, height };
        },
      }),
    ];
  },
});
