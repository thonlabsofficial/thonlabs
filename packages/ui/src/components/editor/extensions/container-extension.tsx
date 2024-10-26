import { Node, mergeAttributes } from '@tiptap/core';
import Utils from '@repo/utils';

export interface ContainerOptions {}

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

      deleteContainer: () => ReturnType;
    };
  }
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
      width: {
        default: 600,
      },
      style: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'table' }];
  },

  renderHTML({ HTMLAttributes }) {
    const { width, backgroundColor, ...rest } = HTMLAttributes;

    return [
      'table',
      mergeAttributes(rest, {
        id: `container-${Utils.randString(1)}`,
        align: 'center',
        style: `max-width:${width}px;width:100%;margin-left:auto;margin-right:auto;margin-top:8px;margin-bottom:8px;`,
      }),
      [
        'tr',
        [
          'td',
          {
            style: `padding-top: 10px;padding-bottom: 10px;padding-left: 10px;padding-right: 10px;`,
          },
          0,
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setContainer:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: attributes,
              content: [{ type: 'empty' }, { type: 'paragraph' }],
            })
            .focus()
            .run();
        },

      deleteContainer:
        () =>
        ({ commands }) => {
          return commands.deleteNode(this.name);
        },

      setContainerBackgroundColor:
        ({ containerId, color }: { containerId: string; color: string }) =>
        ({ commands }) => {
          const containerNode = document.querySelector(
            `#${containerId}`,
          ) as HTMLTableElement;

          containerNode.style.backgroundColor = color;

          return commands.updateAttributes(
            this.name,
            Utils.getDOMAttributes(containerNode),
          );
        },

      unsetContainerBackgroundColor:
        ({ containerId }: { containerId: string }) =>
        ({ commands }) => {
          const containerNode = document.querySelector(
            `#${containerId}`,
          ) as HTMLTableElement;

          containerNode.style.backgroundColor = '';

          return commands.updateAttributes(
            this.name,
            Utils.getDOMAttributes(containerNode),
          );
        },

      setContainerBorderColor:
        ({ containerId, color }: { containerId: string; color: string }) =>
        ({ commands }) => {
          const containerNode = document.querySelector(
            `#${containerId}`,
          ) as HTMLTableElement;

          containerNode.style.border = `1px solid ${color}`;

          return commands.updateAttributes(
            this.name,
            Utils.getDOMAttributes(containerNode),
          );
        },

      unsetContainerBorderColor:
        ({ containerId }: { containerId: string }) =>
        ({ commands }) => {
          const containerNode = document.querySelector(
            `#${containerId}`,
          ) as HTMLTableElement;

          containerNode.style.border = '';

          return commands.updateAttributes(
            this.name,
            Utils.getDOMAttributes(containerNode),
          );
        },
    };
  },
});
