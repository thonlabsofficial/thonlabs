import Utils from '@repo/utils';
import { mergeAttributes, Node } from '@tiptap/core';
import type { EditorState, Transaction } from '@tiptap/pm/state';

export type ContainerOptions = {};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    container: {
      setContainer: (attributes: { width?: number }) => ReturnType;

      toggleContainer: (attributes: { width?: number }) => ReturnType;

      setContainerBackgroundColor: (attributes: {
        containerId: string;
        color: string;
      }) => ReturnType;

      unsetContainerBackgroundColor: (attributes: {
        containerId: string;
      }) => ReturnType;

      setContainerBorderColor: (attributes: {
        containerId: string;
        color: string;
      }) => ReturnType;

      unsetContainerBorderColor: (attributes: {
        containerId: string;
      }) => ReturnType;

      setContainerWidth: (attributes: {
        containerId: string;
        width: number;
        unit: 'px' | '%';
      }) => ReturnType;

      setContainerBorderRadius: (attributes: {
        containerId: string;
        borderRadius: number;
      }) => ReturnType;

      deleteContainer: () => ReturnType;
    };
  }
}

function updateContainerStyle({
  containerId,
  state,
  tr,
  property,
  value,
}: {
  containerId: string;
  state: EditorState;
  tr: Transaction;
  property: keyof CSSStyleDeclaration;
  value: string;
}) {
  let hasUpdated = false;

  // Find and update only the specific container
  state.doc.descendants((node, pos) => {
    if (
      node.type.name === 'container' &&
      node.attrs.containerId === containerId
    ) {
      const containerNode = document.querySelector(
        `#${containerId}`
      ) as HTMLTableElement;

      if (property === 'borderColor') {
        containerNode.style.border = value ? `1px solid ${value}` : '';
      } else {
        containerNode.style[property as any] = value;
      }

      tr.setNodeMarkup(pos, undefined, {
        containerId,
        ...Utils.getDOMAttributes(containerNode),
      });
      hasUpdated = true;
      return false; // Stop searching once found
    }
  });

  return hasUpdated;
}

export const Container = Node.create<ContainerOptions>({
  name: 'container',

  content: 'block*',

  group: 'block',

  isolating: true,

  defining: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
      containerId: {
        default: null,
      },
      style: {
        default:
          'border-collapse:separate;width:100%;margin-left:auto;margin-right:auto;margin-top:8px;margin-bottom:8px;',
      },
      tdStyle: {
        default:
          'padding-top: 10px;padding-bottom: 10px;padding-left: 10px;padding-right: 10px;',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'table[data-container-id]' }];
  },

  renderHTML({ HTMLAttributes }) {
    const { containerId, style, tdStyle, ...attrs } = HTMLAttributes;

    return [
      'table',
      mergeAttributes(attrs, {
        align: 'center',
        style,
        id: containerId,
      }),
      [
        'tr',
        [
          'td',
          {
            style: tdStyle,
          },
          0,
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setContainer:
        (attrs) =>
        ({ commands }) => {
          const containerId = `container-${Utils.randString(1)}`;

          return commands.insertContent({
            type: this.name,
            attrs: {
              ...attrs,
              containerId,
            },
            content: [{ type: 'empty' }, { type: 'paragraph' }],
          });
        },

      deleteContainer:
        () =>
        ({ commands }) => {
          return commands.deleteNode(this.name);
        },

      setContainerBackgroundColor:
        ({ containerId, color }: { containerId: string; color: string }) =>
        ({ tr, state }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'backgroundColor',
            value: color,
          });
        },

      unsetContainerBackgroundColor:
        ({ containerId }: { containerId: string }) =>
        ({ state, tr }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'backgroundColor',
            value: '',
          });
        },

      setContainerBorderColor:
        ({ containerId, color }: { containerId: string; color: string }) =>
        ({ state, tr }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'borderColor',
            value: color,
          });
        },

      unsetContainerBorderColor:
        ({ containerId }: { containerId: string }) =>
        ({ state, tr }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'borderColor',
            value: '',
          });
        },

      setContainerWidth:
        ({
          containerId,
          width,
          unit,
        }: {
          containerId: string;
          width: number;
          unit: 'px' | '%';
        }) =>
        ({ state, tr }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'maxWidth',
            value: `${width}${unit}`,
          });
        },

      setContainerBorderRadius:
        ({
          containerId,
          borderRadius,
        }: {
          containerId: string;
          borderRadius: number;
        }) =>
        ({ state, tr }) => {
          return updateContainerStyle({
            containerId,
            state,
            tr,
            property: 'borderRadius',
            value: `${borderRadius}px`,
          });
        },
    };
  },
});
