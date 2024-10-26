import Utils from '@repo/utils';
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface ImageOptions {
  inline: boolean;
  emailTemplate: boolean;
  openOnClick: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
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

      setImageSource: (src: string) => ReturnType;

      setImageLink: (href: string) => ReturnType;

      unsetImageLink: () => ReturnType;
    };
  }
}

// From DOMPurify
// https://github.com/cure53/DOMPurify/blob/main/src/regexp.js
// eslint-disable-next-line no-control-regex
const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

function isAllowedUri(uri: string | undefined) {
  const allowedProtocols: string[] = [
    'http',
    'https',
    'ftp',
    'ftps',
    'mailto',
    'tel',
    'callto',
    'sms',
    'cid',
    'xmpp',
  ];

  // eslint-disable-next-line no-useless-escape
  return (
    !uri ||
    uri
      .replace(ATTR_WHITESPACE, '')
      .match(
        new RegExp(
          `^(?:(?:${allowedProtocols.join('|')}):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))`,
          'i',
        ),
      )
  );
}

function getImageElement() {
  const element = document.querySelector(
    '.ProseMirror-selectednode',
  ) as HTMLImageElement;

  if (element.tagName === 'A') {
    return document.querySelector(
      '.ProseMirror-selectednode img',
    ) as HTMLImageElement;
  }

  return element;
}

function forwardDOMAttrs(
  dom: HTMLElement,
  extraAttrs: Record<string, any> = {},
) {
  const hasLink = dom.parentElement?.tagName === 'A';
  const imageAttrs = Utils.getDOMAttributes(dom);

  if (hasLink) {
    return {
      ...Utils.getDOMAttributes(dom.parentElement),
      ...extraAttrs,
      imageAttrs,
    };
  }

  return { ...imageAttrs, ...extraAttrs };
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const Image = Node.create<ImageOptions>({
  name: 'image',

  addOptions() {
    return {
      openOnClick: true,
      emailTemplate: false,
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
      href: {
        default: null,
      },
      target: {
        default: null,
      },
      rel: {
        default: null,
      },
      imageAttrs: {
        default: null,
      },
      hasLink: {
        default: false,
      },
    };
  },

  parseHTML() {
    if (this.options.HTMLAttributes.href) {
      return [
        {
          tag: 'a[href]',
          getAttrs: (dom) => {
            const href = (dom as HTMLElement).getAttribute('href');

            // prevent XSS attacks
            if (!href || !isAllowedUri(href)) {
              return false;
            }
            return null;
          },
          preserveWhitespace: 'full',
        },
      ];
    }

    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { href, imageAttrs, ...rest } = HTMLAttributes;

    if (href) {
      return [
        'a',
        { href, hasLink: true, contentEditable: true, ...rest },
        ['img', { ...imageAttrs }],
      ];
    }

    return [
      'img',
      mergeAttributes(
        rest,
        this.options.emailTemplate
          ? {
              style: `display:block;outline:none;border:none;text-decoration:none;margin-top:8px;margin-bottom:8px;`,
            }
          : {},
      ),
    ];
  },

  addCommands() {
    return {
      setImage:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
      setImageAlign:
        (alignment: 'left' | 'center' | 'right') =>
        ({ commands }) => {
          const imageDOM = getImageElement();

          switch (alignment) {
            case 'left':
              imageDOM.style.marginLeft = '0';
              imageDOM.style.marginRight = 'auto';
              break;
            case 'center':
              imageDOM.style.marginLeft = 'auto';
              imageDOM.style.marginRight = 'auto';
              break;
            case 'right':
              imageDOM.style.marginLeft = 'auto';
              imageDOM.style.marginRight = '0';
              break;
          }

          return commands.updateAttributes(
            this.name,
            forwardDOMAttrs(imageDOM, {
              imageAlign: alignment,
            }),
          );
        },
      setImageSize:
        ({ width, height }: { width: number; height: number }) =>
        ({ commands }) => {
          const imageDOM = getImageElement();

          imageDOM.style.width = `${width}px`;
          imageDOM.style.height = `${height}px`;

          return commands.updateAttributes(
            this.name,
            forwardDOMAttrs(imageDOM),
          );
        },
      setImageSource:
        (src: string) =>
        ({ commands }) => {
          const imageDOM = getImageElement();

          imageDOM.src = src;

          return commands.updateAttributes(
            this.name,
            forwardDOMAttrs(imageDOM),
          );
        },
      setImageLink:
        (href: string) =>
        ({ commands }) => {
          const element = document.querySelector(
            '.ProseMirror-selectednode',
          ) as HTMLImageElement;
          let imgElement;

          if (element.tagName === 'A') {
            imgElement = document.querySelector(
              '.ProseMirror-selectednode img',
            ) as HTMLImageElement;
          } else if (element.tagName === 'IMG') {
            element.classList.remove('ProseMirror-selectednode');
          }

          const imageAttrs = Utils.getDOMAttributes(imgElement || element);

          return commands.insertContent({
            type: this.name,
            attrs: {
              href,
              target: '_blank',
              rel: 'noopener noreferrer nofollow',
              hasLink: true,
              imageAlign: imageAttrs.imagealign,
              imageAttrs,
            },
          });
        },
      unsetImageLink:
        () =>
        ({ commands }) => {
          const element = document.querySelector(
            '.ProseMirror-selectednode',
          ) as HTMLImageElement;
          const imgElement = getImageElement();

          return commands.insertContent({
            type: this.name,
            attrs: {
              ...Utils.getDOMAttributes(imgElement),
              imageAlign: Utils.getDOMAttributes(element).imagealign,
              hasLink: false,
            },
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

  addProseMirrorPlugins() {
    const plugins: Plugin[] = [];

    if (this.options.openOnClick) {
      plugins.push(
        new Plugin({
          key: new PluginKey('handleClickImage'),
          props: {
            handleClick: () => {
              console.log('clicked');
              return false;
            },
          },
        }),
      );
    }

    return plugins;
  },
});
