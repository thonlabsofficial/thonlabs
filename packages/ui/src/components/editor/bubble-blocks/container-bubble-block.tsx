import { useCurrentEditor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { Separator } from '../../separator';
import { ColorBlock } from './color-bubble-block';
import { Button } from '../../button';
import { MoveHorizontalIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../../input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

const containerFormSchema = z.object({
  width: z
    .number()
    .min(0, { message: 'Width must be greater than 0' })
    .max(9999, { message: 'Width must be less than 10000' }),
  borderRadius: z
    .number()
    .min(0, { message: 'Border radius must be greater than 0' })
    .max(9999, { message: 'Border radius must be less than 10000' }),
});
type ContainerFormData = z.infer<typeof containerFormSchema>;

export function ContainerBubble() {
  const { editor } = useCurrentEditor();
  const form = useForm<ContainerFormData>({
    defaultValues: {
      width: 0,
      borderRadius: 0,
    },
    mode: 'onChange',
    resolver: zodResolver(containerFormSchema),
  });

  let activeContainerPosition;
  let activeContainerId = '';

  const [activeContainerStyles, setActiveContainerStyles] = useState<
    CSSStyleDeclaration | undefined
  >();
  useEffect(() => {
    if (activeContainerStyles) {
      form.setValue('width', parseInt(activeContainerStyles.maxWidth || '0'));
      form.setValue(
        'borderRadius',
        parseInt(activeContainerStyles.borderRadius || '0'),
      );
    }
  }, [activeContainerStyles]);

  const width = form.watch('width');
  const borderRadius = form.watch('borderRadius');
  useEffect(() => {
    if (editor) {
      if (width) {
        editor.commands.setContainerWidth({
          containerId: activeContainerId as string,
          width,
        });
      }
      if (borderRadius) {
        editor.commands.setContainerBorderRadius({
          containerId: activeContainerId as string,
          borderRadius,
        });
      }
    }
  }, [editor, width, borderRadius]);

  if (!editor) {
    return null;
  }

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
        if (!activeContainerStyles) {
          setActiveContainerStyles(dom.style);
        }
        break;
      }
    }
  }

  const bubbleGutter = 38; // Height + margin
  const bubbleWidth = 34;

  return (
    editor.isActive('container') &&
    activeContainerPosition &&
    activeContainerId &&
    activeContainerStyles && (
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
          <div className="flex px-1 gap-2">
            <div className="flex items-center gap-0.5">
              <MoveHorizontalIcon className="h-3.5 w-3.5 flex-none basis-3.5 text-text" />
              <Input
                type="number"
                className="w-14"
                size={'xs'}
                maxLength={4}
                {...form.register('width')}
              />
            </div>
            <div className="flex items-center gap-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 flex-none basis-3.5 text-text"
              >
                <path d="M21 3h-16a2 2 0 0 0 -2 2v16" />
              </svg>
              <Input
                type="number"
                className="w-14"
                size={'xs'}
                maxLength={4}
                {...form.register('borderRadius')}
              />
            </div>
          </div>
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
