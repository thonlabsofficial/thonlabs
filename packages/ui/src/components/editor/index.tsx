'use client';

import { Separator } from '../separator';
import { emailExtensions, slashExtension, slashItems } from './extensions';
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
import {
  LinkBlock,
  TextAlignBlock,
  TextFormatBlock,
  TextTypeBlock,
} from './bubble-blocks';
import { ScrollArea } from '../scroll-area';
import { Typo } from '../typo';

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}

const Editor = ({ initialValue, onChange }: EditorProp) => {
  return (
    <EditorRoot>
      <EditorContent
        {...(initialValue && { initialContent: initialValue })}
        extensions={[...emailExtensions, slashExtension]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
        }}
        onUpdate={({ editor }) => {
          console.log(editor.getJSON());
          onChange(editor.getJSON());
        }}
      >
        <EditorBubble
          tippyOptions={{
            maxWidth: '500px',
          }}
        >
          <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-1">
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
              <LinkBlock />
            </div>
          </div>
        </EditorBubble>
        <EditorCommand className="z-50 h-auto rounded-md p-1 bg-muted border border-foreground/[0.07] shadow-md transition-all">
          <ScrollArea
            className="max-h-[330px] pr-3"
            scrollBackground="bg-foreground/10"
            forceMount
          >
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {slashItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item?.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-foreground/10 hover:text-accent-foreground aria-selected:bg-foreground/10"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <Typo variant={'sm'}>{item.title}</Typo>
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
