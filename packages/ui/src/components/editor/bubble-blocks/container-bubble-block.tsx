import { useCurrentEditor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { Separator } from '../../separator';
import { ColorBlock } from './color-bubble-block';
import { Button } from '../../button';
import { Trash2Icon } from 'lucide-react';

export function ContainerBubble() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  let activeContainerPosition;
  let activeContainerId;

  const { state, view } = editor;
  const { selection } = state;
  const { $from } = selection;

  // Check if there's a container node in the current selection
  for (let d = $from.depth; d > 0; d--) {
    const node = $from.node(d);
    if (node.type.name === 'container') {
      // Found a container, get its DOM element
      const dom = view.nodeDOM($from.before(d)) as HTMLElement;
      if (dom) {
        // Calculate the top position
        const rect = dom.getBoundingClientRect();
        const editorRect = view.dom.getBoundingClientRect();

        activeContainerPosition = {
          top: rect.top,
          right: editorRect.right - rect.right,
        };
        activeContainerId = dom.id;
        break;
      }
    }
  }

  const bubbleGutter = 38; // Height + margin
  const bubbleWidth = 34;

  return (
    editor.isActive('container') &&
    activeContainerPosition &&
    activeContainerId && (
      <motion.div
        className="absolute flex flex-col gap-1 p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md"
        style={{
          top: activeContainerPosition.top - bubbleGutter,
          right: activeContainerPosition.right + bubbleWidth,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.07 }}
      >
        <div className="flex items-center gap-0.5">
          <Separator
            orientation="vertical"
            className="h-7 bg-foreground/[0.07]"
          />
          <ColorBlock
            type="containerBackground"
            containerId={activeContainerId}
          />
          <ColorBlock type="containerBorder" containerId={activeContainerId} />
          <Separator
            orientation="vertical"
            className="h-7 bg-foreground/[0.07]"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2Icon}
            onClick={() => {
              editor.chain().focus().deleteContainer().run();
            }}
          >
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </motion.div>
    )
  );
}
