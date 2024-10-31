'use client';

import 'tippy.js/animations/scale.css';
import { Separator } from '../separator';
import { dragNDropExtension, emailExtensions } from './extensions';
import { slashItems, slashExtension } from './slash-items';
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorBubble,
  type JSONContent,
} from 'novel';
import { handleCommandNavigation } from 'novel/extensions';
import { ScrollArea } from '../scroll-area';
import { Typo } from '../typo';
import { ImageResizer } from './extensions/image-resizer';
import { isTextSelection } from '@tiptap/core';
import { ColorBlock } from './bubble-blocks/color-bubble-block';
import { ImageBlock } from './bubble-blocks/image-bubble-block';
import { LinkBlock } from './bubble-blocks/link-bubble-block';
import { TextAlignBlock } from './bubble-blocks/text-align-bubble-block';
import { TextFormatBlock } from './bubble-blocks/text-format-bubble-block';
import { TextTypeBlock } from './bubble-blocks/text-type-bubble-block';
import { ImageAlignBlock } from './bubble-blocks/image-align-bubble-block';
import { ButtonLinkAlignBlock } from './bubble-blocks/button-link-align-bubble-block';
import { ContainerBubble } from './bubble-blocks/container-bubble-block';

export type { EditorInstance } from 'novel';

interface EditorProp {
  initialValue?: JSONContent;
  onUpdate: React.ComponentProps<typeof EditorContent>['onUpdate'];
  onCreate?: React.ComponentProps<typeof EditorContent>['onCreate'];
}

const Editor = ({ initialValue, onUpdate, onCreate }: EditorProp) => {
  return (
    <EditorRoot>
      <EditorContent
        {...(initialValue && { initialContent: initialValue })}
        extensions={[...emailExtensions, ...dragNDropExtension, slashExtension]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
        }}
        onUpdate={onUpdate}
        onCreate={onCreate}
        slotAfter={<ImageResizer />}
      >
        <EditorBubble
          tippyOptions={{
            maxWidth: '1000px',
            animation: 'scale',
            duration: 70,
          }}
          shouldShow={({ state, from, to, view, editor }) => {
            const { doc, selection } = state;
            const { empty } = selection;

            const isEmptyTextBlock =
              !doc.textBetween(from, to).length &&
              isTextSelection(state.selection);

            const hasEditorFocus = view.hasFocus();
            const notAllowedElements =
              editor.isActive('buttonLink') || editor.isActive('image');

            if (
              !hasEditorFocus ||
              empty ||
              isEmptyTextBlock ||
              !editor.isEditable ||
              notAllowedElements
            ) {
              return false;
            }

            return true;
          }}
        >
          <div className="flex flex-col gap-0.5 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-0.5">
              <TextTypeBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <TextFormatBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <TextAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <ColorBlock type="color" />
              <ColorBlock type="highlight" />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock />
            </div>
          </div>
        </EditorBubble>
        <EditorBubble
          tippyOptions={{
            maxWidth: '1000px',
            animation: 'scale',
            duration: 70,
          }}
          shouldShow={({ editor }) => editor.isActive('image')}
        >
          <div className="flex flex-col gap-0.5 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-0.5">
              <ImageBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <ImageAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock image />
            </div>
          </div>
        </EditorBubble>
        <EditorBubble
          tippyOptions={{
            maxWidth: '1000px',
            animation: 'scale',
            duration: 70,
          }}
          shouldShow={({ editor }) => editor.isActive('buttonLink')}
        >
          <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-0.5">
              <TextFormatBlock options={['bold', 'italic', 'underline']} />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <ButtonLinkAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock buttonLink />
            </div>
          </div>
        </EditorBubble>
        <ContainerBubble />

        <EditorCommand className="min-w-64 z-50 h-auto rounded-md p-1 bg-muted border border-foreground/[0.07] shadow-md transition-all">
          <ScrollArea
            className="max-h-[330px]"
            scrollBackground="bg-foreground/10"
            forceMount
          >
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Components
            </div>
            <EditorCommandEmpty className="p-2 text-muted-foreground flex items-center">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {slashItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item?.command?.(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-1 py-0.5 text-left 
                    text-sm hover:bg-foreground/10 hover:text-accent-foreground 
                    aria-selected:bg-foreground/10 cursor-pointer`}
                  key={item.title}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <Typo className="leading-snug">{item.title}</Typo>
                    <Typo variant={'mutedXs'}>{item.description}</Typo>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </ScrollArea>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};

export type { JSONContent };

export default Editor;
