import {
  Book as BookTypeIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  Heading4 as Heading4Icon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  type LucideIcon,
  SquareDashedBottomCode as SquareDashedBottomCodeIcon,
  Text as TextIcon,
  TextQuote as TextQuoteIcon,
} from 'lucide-react';
import { type EditorInstance, useEditor } from 'novel';
import { Button } from '../../button';
import { Command, CommandGroup, CommandItem, CommandList } from '../../command';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Typo } from '../../typo';

type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: EditorInstance) => void;
  isActive: (editor: EditorInstance) => boolean;
};

const textTypeItems: SelectorItem[] = [
  {
    name: 'Text',
    icon: TextIcon,
    command: (editor) => editor?.chain().focus().clearNodes().run(),
    // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
    isActive: (editor) =>
      (editor?.isActive('paragraph') || false) &&
      !editor?.isActive('bulletList') &&
      !editor?.isActive('orderedList'),
  },
  {
    name: 'Heading 1',
    icon: Heading1Icon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 1 }) || false,
  },
  {
    name: 'Heading 2',
    icon: Heading2Icon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 2 }) || false,
  },
  {
    name: 'Heading 3',
    icon: Heading3Icon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 3 }) || false,
  },
  {
    name: 'Heading 4',
    icon: Heading4Icon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 4 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 4 }) || false,
  },
  {
    name: 'Code Block',
    icon: SquareDashedBottomCodeIcon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor?.isActive('codeBlock') || false,
  },
  {
    name: 'Quote',
    icon: TextQuoteIcon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor?.isActive('blockquote') || false,
  },
  {
    name: 'Bullet List',
    icon: ListIcon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor?.isActive('bulletList') || false,
  },
  {
    name: 'Numbered List',
    icon: ListOrderedIcon,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor?.isActive('orderedList') || false,
  },
];

export function TextTypeBlock() {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  let typoActiveItem = textTypeItems
    .filter((item) => item.isActive(editor))
    .pop();

  if (!typoActiveItem) {
    typoActiveItem = {
      name: 'Multiple',
      icon: BookTypeIcon,
      command: () => {},
      isActive: () => false,
    };
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'ghost'}
          icon={typoActiveItem?.icon}
          size={'sm'}
        >
          {typoActiveItem?.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex w-52 flex-col gap-1 rounded-md border border-foreground/[0.07] bg-muted p-0'>
        <Command className='bg-transparent' defaultValue={typoActiveItem?.name}>
          <CommandList>
            <CommandGroup heading='Switch To'>
              {textTypeItems.map((item, index) => (
                <CommandItem
                  value={item.name}
                  key={`${item.name}-${index}`}
                  className="items-start data-[selected='true']:bg-foreground/10"
                  onSelect={() => {
                    item.command(editor);
                  }}
                >
                  <item.icon className='mt-0.5 mr-2 h-4 w-4' />
                  <Typo variant={'sm'}>{item.name}</Typo>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
