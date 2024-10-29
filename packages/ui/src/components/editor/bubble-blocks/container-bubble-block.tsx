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
import Utils from '@repo/utils';
import { ButtonGroup } from '../../button-group';

const containerFormSchema = z.object({
  isLocked: z.boolean(),
  width: z
    .number()
    .min(0, { message: 'Width must be greater than 0' })
    .max(9999, { message: 'Width must be less than 10000' }),
  borderRadius: z
    .number()
    .min(0, { message: 'Border radius must be greater than 0' })
    .max(9999, { message: 'Border radius must be less than 10000' }),
  widthUnit: z.enum(['px', '%']),
});
type ContainerFormData = z.infer<typeof containerFormSchema>;

export function ContainerBubble() {
  const { editor } = useCurrentEditor();
  const form = useForm<ContainerFormData>({
    defaultValues: {
      width: 100,
      borderRadius: 0,
      widthUnit: '%',
      isLocked: false,
    },
    mode: 'onChange',
    resolver: zodResolver(containerFormSchema),
  });

  const [activeDOM, setActiveDOM] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [activeContainerPosition, setActiveContainerPosition] = useState<
    | {
        top: number;
        right: number;
      }
    | undefined
  >(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const isLocked = form.watch('isLocked');

  useEffect(() => {
    if (activeDOM) {
      const activeContainerStyles = activeDOM.style;

      if (activeContainerStyles) {
        form.setValue(
          'width',
          parseInt(activeContainerStyles.maxWidth || '100'),
        );
        form.setValue(
          'widthUnit',
          activeContainerStyles.maxWidth?.endsWith('px') ? 'px' : '%',
        );
        form.setValue(
          'borderRadius',
          parseInt(activeContainerStyles.borderRadius || '0'),
        );
      }
    }
  }, [activeDOM]);

  const width = form.watch('width');
  const widthUnit = form.watch('widthUnit');
  const borderRadius = form.watch('borderRadius');
  useEffect(() => {
    if (editor) {
      if (width && widthUnit) {
        editor.commands.setContainerWidth({
          containerId: activeDOM?.id as string,
          width,
          unit: widthUnit as 'px' | '%',
        });
      }
      if (borderRadius) {
        editor.commands.setContainerBorderRadius({
          containerId: activeDOM?.id as string,
          borderRadius,
        });
      }
    }
  }, [editor, width, widthUnit, borderRadius]);

  if (!editor) {
    return null;
  }

  const { view } = editor;
  const { $from } = editor.state.selection;
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let found = false;
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

          setActiveContainerPosition({
            top: rect.top,
            right: editorRect.right - rect.right,
          });
          setActiveDOM(dom);

          found = true;
          break;
        }
      }
    }

    if (!found) {
      setActiveDOM(undefined);
      setActiveContainerPosition(undefined);
    }
  }, [$from, isFocused]);

  useEffect(() => {
    const handleClick = () => {
      setIsFocused(true);
    };

    if (editor) {
      editor.on('focus', handleClick);

      return () => {
        editor.off('focus', handleClick);
      };
    }
  }, [editor]);

  useEffect(() => {
    const handleSelectionUpdate = () => {
      setIsFocused(true);
    };

    if (editor) {
      editor.on('selectionUpdate', handleSelectionUpdate);

      return () => {
        editor.off('selectionUpdate', handleSelectionUpdate);
      };
    }
  }, [editor]);

  useEffect(() => {
    const handleBlur = async () => {
      await Utils.delay(100);

      const isLocked =
        (document.getElementById('is-locked') as HTMLInputElement)?.value ===
        'true';

      if (!isLocked) {
        setIsFocused(false);
      }
    };

    if (editor) {
      editor.on('blur', handleBlur);

      return () => {
        editor.off('blur', handleBlur);
      };
    }
  }, [editor]);

  const bubbleGutter = 38; // Height + margin
  const bubbleWidth = 34;

  return (
    editor.isActive('container') &&
    activeContainerPosition &&
    activeDOM &&
    isFocused && (
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
        <input id="is-locked" type="hidden" {...form.register('isLocked')} />
        <div className="flex items-center gap-0.5">
          <div className="flex px-1 gap-2">
            <div className="flex items-center gap-0.5">
              <MoveHorizontalIcon className="h-3.5 w-3.5 flex-none basis-3.5 text-text" />
              <Input
                type="number"
                className="w-14"
                size={'xs'}
                maxLength={4}
                onFocus={() => {
                  form.setValue('isLocked', true);
                }}
                {...form.register('width', {
                  onBlur: () => {
                    form.setValue('isLocked', false);
                  },
                })}
              />
              <ButtonGroup variant="outline">
                <Button
                  variant="ghost"
                  size="xs"
                  className="px-1"
                  onClick={async () => {
                    form.setValue('isLocked', true);
                    form.setValue('widthUnit', 'px');

                    await Utils.delay(100);
                    editor.chain().focus().run();
                    form.setValue('isLocked', false);
                  }}
                  active={widthUnit === 'px'}
                >
                  px
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  className="px-1"
                  onClick={async () => {
                    form.setValue('isLocked', true);
                    form.setValue('widthUnit', '%');

                    await Utils.delay(100);
                    editor.chain().focus().run();
                    form.setValue('isLocked', false);
                  }}
                  active={widthUnit === '%'}
                >
                  %
                </Button>
              </ButtonGroup>
            </div>
            <Separator
              orientation="vertical"
              className="h-7 bg-foreground/[0.07]"
            />
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
                onFocus={() => {
                  form.setValue('isLocked', true);
                }}
                {...form.register('borderRadius', {
                  onBlur: () => {
                    form.setValue('isLocked', false);
                  },
                })}
              />
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="h-7 bg-foreground/[0.07]"
          />
          <ColorBlock
            type="containerBackground"
            containerId={activeDOM.id}
            onOpenChange={({ isOpen }) => {
              form.setValue('isLocked', isOpen);

              if (!isOpen) {
                editor.chain().focus().run();
              }
            }}
          />
          <ColorBlock
            type="containerBorder"
            containerId={activeDOM.id}
            onOpenChange={({ isOpen }) => {
              form.setValue('isLocked', isOpen);

              if (!isOpen) {
                editor.chain().focus().run();
              }
            }}
          />
          <Separator
            orientation="vertical"
            className="h-7 bg-foreground/[0.07]"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2Icon}
            onClick={async () => {
              form.setValue('isLocked', true);

              await Utils.delay(50);
              editor.chain().focus().deleteContainer().run();

              await Utils.delay(400);
              form.setValue('isLocked', false);
            }}
          >
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </motion.div>
    )
  );
}
