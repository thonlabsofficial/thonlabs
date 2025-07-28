'use client';

import 'tippy.js/animations/scale.css';
import { isTextSelection } from '@tiptap/core';
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from 'novel';
import { handleCommandNavigation } from 'novel/extensions';
import { ScrollArea } from '../scroll-area';
import { Separator } from '../separator';
import { Typo } from '../typo';
import { ButtonLinkAlignBlock } from './bubble-blocks/button-link-align-bubble-block';
import { ColorBlock } from './bubble-blocks/color-bubble-block';
import { ContainerBubble } from './bubble-blocks/container-bubble-block';
import { ImageAlignBlock } from './bubble-blocks/image-align-bubble-block';
import { ImageBlock } from './bubble-blocks/image-bubble-block';
import { LinkBlock } from './bubble-blocks/link-bubble-block';
import { TextAlignBlock } from './bubble-blocks/text-align-bubble-block';
import { TextFormatBlock } from './bubble-blocks/text-format-bubble-block';
import { TextTypeBlock } from './bubble-blocks/text-type-bubble-block';
import { dragNDropExtension, emailExtensions } from './extensions';
import { ImageResizer } from './extensions/image-resizer';
import { slashExtension, slashItems } from './slash-items';

function EditorLoader({
  size = 172,
  loadingText = 'Loading content...',
}: {
  size?: number;
  loadingText?: string;
}) {
  return (
    <div
      className='flex h-full w-full flex-col items-center justify-center'
      aria-label='Editor is loading'
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 100 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='hsl(0, 0%, 90%)' stopOpacity='1'>
              <animate
                attributeName='stop-color'
                values='hsl(0, 0%, 90%); hsl(0, 0%, 85%); hsl(0, 0%, 90%)'
                dur='1.5s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='50%' stopColor='hsl(0, 0%, 85%)' stopOpacity='1'>
              <animate
                attributeName='stop-color'
                values='hsl(0, 0%, 85%); hsl(0, 0%, 90%); hsl(0, 0%, 85%)'
                dur='1.5s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='100%' stopColor='hsl(0, 0%, 90%)' stopOpacity='1'>
              <animate
                attributeName='stop-color'
                values='hsl(0, 0%, 90%); hsl(0, 0%, 85%); hsl(0, 0%, 90%)'
                dur='1.5s'
                repeatCount='indefinite'
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Editor outline */}
        <rect
          x='10'
          y='10'
          width='80'
          height='80'
          rx='4'
          stroke='hsl(0, 0%, 90%)'
          strokeWidth='4'
        />

        {/* Top bar */}
        <rect
          x='14'
          y='14'
          width='72'
          height='8'
          rx='2'
          fill='url(#gradient)'
        />

        {/* Content lines */}
        <rect
          x='14'
          y='30'
          width='60'
          height='4'
          rx='1'
          fill='url(#gradient)'
        />
        <rect
          x='14'
          y='40'
          width='72'
          height='4'
          rx='1'
          fill='url(#gradient)'
        />
        <rect
          x='14'
          y='50'
          width='50'
          height='4'
          rx='1'
          fill='url(#gradient)'
        />
        <rect
          x='14'
          y='60'
          width='65'
          height='4'
          rx='1'
          fill='url(#gradient)'
        />

        {/* Cursor */}
        <rect x='14' y='70' width='2' height='12' fill='hsl(0, 0%, 85%)'>
          <animate
            attributeName='opacity'
            values='1;0;1'
            dur='1s'
            repeatCount='indefinite'
          />
        </rect>
      </svg>
      <div
        className='animate-shimmer font-sans font-semibold text-sm'
        style={{
          background:
            'linear-gradient(90deg, hsl(0, 0%, 90%), hsl(0, 0%, 85%), hsl(0, 0%, 90%))',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {loadingText}
      </div>
    </div>
  );
}

interface EditorProp {
  initialValue?: JSONContent;
  onUpdate: React.ComponentProps<typeof EditorContent>['onUpdate'];
  onCreate?: React.ComponentProps<typeof EditorContent>['onCreate'];
  loading?: boolean;
}

const Editor = ({ initialValue, onUpdate, onCreate, loading }: EditorProp) => {
  return !loading ? (
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
          <div className='flex w-full flex-col gap-0.5 rounded-md border border-foreground/[0.07] bg-muted p-1 shadow-md'>
            <div className='flex items-center gap-0.5'>
              <TextTypeBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <TextFormatBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <TextAlignBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <ColorBlock type='color' />
              <ColorBlock type='highlight' />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
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
          <div className='flex w-full flex-col gap-0.5 rounded-md border border-foreground/[0.07] bg-muted p-1 shadow-md'>
            <div className='flex items-center gap-0.5'>
              <ImageBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <ImageAlignBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
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
          <div className='flex w-full flex-col gap-1 rounded-md border border-foreground/[0.07] bg-muted p-1 shadow-md'>
            <div className='flex items-center gap-0.5'>
              <TextFormatBlock options={['bold', 'italic', 'underline']} />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <ButtonLinkAlignBlock />
              <Separator
                orientation='vertical'
                className='h-7 bg-foreground/[0.07]'
              />
              <LinkBlock buttonLink />
            </div>
          </div>
        </EditorBubble>
        <ContainerBubble />

        <EditorCommand className='z-50 h-auto min-w-64 rounded-md border border-foreground/[0.07] bg-muted p-1 shadow-md transition-all'>
          <ScrollArea
            className='max-h-[330px]'
            scrollBackground='bg-foreground/10'
            forceMount
          >
            <div className='px-2 py-1.5 font-medium text-muted-foreground text-xs'>
              Components
            </div>
            <EditorCommandEmpty className='flex items-center p-2 text-muted-foreground'>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {slashItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item?.command?.(val)}
                  className={`flex w-full cursor-pointer items-center space-x-2 rounded-md px-1 py-0.5 text-left text-sm hover:bg-foreground/10 hover:text-accent-foreground aria-selected:bg-foreground/10`}
                  key={item.title}
                >
                  <div className='flex h-9 w-9 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div className='flex flex-col'>
                    <Typo className='leading-snug'>{item.title}</Typo>
                    <Typo variant={'mutedXs'}>{item.description}</Typo>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </ScrollArea>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  ) : (
    <EditorLoader />
  );
};

export type { JSONContent };
export type { EditorInstance } from 'novel';

export default Editor;
