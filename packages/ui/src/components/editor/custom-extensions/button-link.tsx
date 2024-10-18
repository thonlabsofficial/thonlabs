import { Node, mergeAttributes } from '@tiptap/core';
import { registerCustomProtocol, reset } from 'linkifyjs';

export interface ButtonLinkProtocolOptions {
  /**
   * The protocol scheme to be registered.
   * @default '''
   * @example 'ftp'
   * @example 'git'
   */
  scheme: string;

  /**
   * If enabled, it allows optional slashes after the protocol.
   * @default false
   * @example true
   */
  optionalSlashes?: boolean;
}

export interface ButtonLinkOptions {
  /**
   * An array of custom protocols to be registered with linkifyjs.
   * @default []
   * @example ['ftp', 'git']
   */
  protocols: Array<ButtonLinkProtocolOptions | string>;

  /**
   * Default protocol to use when no protocol is specified.
   * @default 'http'
   */
  defaultProtocol: string;

  /**
   * Define whether the node should be exited on arrow down if there is no node after it.
   * @default true
   */
  exitOnArrowDown: boolean;

  /**
   * HTML attributes to add to the link element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;

  /**
   * A validation function that modifies link verification for the auto linker.
   * @param url - The url to be validated.
   * @returns - True if the url is valid, false otherwise.
   */
  validate: (url: string) => boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    buttonLink: {
      /**
       * Set a button link
       * @param attributes The button link attributes
       * @example editor.commands.setButtonLink({ href: 'https://tiptap.dev' })
       */
      setButtonLink: (attributes: {
        href?: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;
      /**
       * Toggle a link mark
       * @param attributes The link attributes
       * @example editor.commands.toggleButtonLink({ href: 'https://tiptap.dev' })
       */
      toggleButtonLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;
      /**
       * Set the alignment of the button link
       * @param alignment The alignment of the button link
       * @example editor.commands.setButtonLinkAlign('center')
       */
      setButtonLinkAlign: (
        alignment: 'left' | 'center' | 'right',
      ) => ReturnType;
    };
  }
}

// From DOMPurify
// https://github.com/cure53/DOMPurify/blob/main/src/regexp.js
// eslint-disable-next-line no-control-regex
const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

function isAllowedUri(
  uri: string | undefined,
  protocols?: ButtonLinkOptions['protocols'],
) {
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

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === 'string' ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

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

export const ButtonLink = Node.create<ButtonLinkOptions>({
  name: 'buttonLink',

  content: 'inline*',

  group: 'block',

  defining: true,

  addOptions() {
    return {
      protocols: [],
      defaultProtocol: 'https',
      exitOnArrowDown: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        class: null,
      },
      validate: (url) => !!url,
    };
  },

  onCreate() {
    this.options.protocols.forEach((protocol) => {
      if (typeof protocol === 'string') {
        registerCustomProtocol(protocol);
        return;
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
    });
  },

  onDestroy() {
    reset();
  },

  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(element) {
          return element.getAttribute('href');
        },
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      rel: {
        default: this.options.HTMLAttributes.rel,
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
      style: {
        default: null,
      },
      buttonLinkAlign: {
        default: 'left',
      },
      hasLink: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]',
        getAttrs: (dom) => {
          const href = (dom as HTMLElement).getAttribute('href');

          // prevent XSS attacks
          if (!href || !isAllowedUri(href, this.options.protocols)) {
            return false;
          }
          return null;
        },
        preserveWhitespace: 'full',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { style, ...rest } = HTMLAttributes;

    // prevent XSS attacks
    if (!isAllowedUri(HTMLAttributes.href, this.options.protocols)) {
      // strip out the href
      return [
        'p',
        mergeAttributes({
          style: `margin-top:4px;margin-bottom:4px;${style}`,
        }),
        [
          'a',
          mergeAttributes(this.options.HTMLAttributes, rest, {
            href: '',
          }),
          0,
        ],
      ];
    }

    return [
      'p',
      {
        style: 'margin-top:4px;margin-bottom:4px;',
      },
      ['a', mergeAttributes(rest), 0],
    ];
  },

  addCommands() {
    return {
      setButtonLink:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, {
            ...attributes,
            hasLink: !!attributes.href,
          });
        },
      toggleButtonLink:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
      setButtonLinkAlign:
        (alignment) =>
        ({ commands }) => {
          return commands.setNode(this.name, {
            style: `text-align:${alignment}`,
            buttonLinkAlign: alignment,
          });
        },
    };
  },
});
