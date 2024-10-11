import { useCallback, useEffect, useRef } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '../command';
import { Button } from '../button';
import { Typo } from '../typo';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { EditorInstance, useEditor } from 'novel';
import {
  LucideIcon,
  AlignCenter as AlignCenterIcon,
  AlignJustify as AlignJustifyIcon,
  AlignLeft as AlignLeftIcon,
  AlignRight as AlignRightIcon,
  BookType as BookTypeIcon,
  Bold as BoldIcon,
  Code as CodeIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Globe as GlobeIcon,
  Trash as TrashIcon,
  Text as TextIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  ListOrdered as ListOrderedIcon,
  TextQuote as TextQuoteIcon,
  SquareDashedBottomCode as SquareDashedBottomCodeIcon,
  Heading4 as Heading4Icon,
  List as ListIcon,
} from 'lucide-react';
import { ButtonIcon } from '../button-icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

  const typoActiveItem = editor
    ? textTypeItems.filter((item) => item.isActive(editor)).pop()
    : {
        name: 'Multiple',
        icon: BookTypeIcon,
      };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} icon={typoActiveItem?.icon} size={'sm'}>
          {typoActiveItem?.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent" defaultValue={typoActiveItem?.name}>
          <CommandList>
            <CommandGroup>
              {textTypeItems.map((item, index) => (
                <CommandItem
                  value={item.name}
                  key={`${item.name}-${index}`}
                  className="items-start data-[selected='true']:bg-foreground/10"
                  onSelect={() => {
                    item.command(editor);
                  }}
                >
                  <item.icon className="mr-2 mt-0.5 h-4 w-4" />
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

export function TextFormatBlock() {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonIcon
        variant={'ghost'}
        icon={BoldIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={ItalicIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={UnderlineIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={CodeIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
      />
    </>
  );
}

export function TextAlignBlock() {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonIcon
        variant={'ghost'}
        icon={AlignLeftIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignCenterIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignRightIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignJustifyIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        active={editor.isActive({ textAlign: 'justify' })}
      />
    </>
  );
}

const editorFormSchema = z.object({
  link: z.string().url({ message: 'Enter a valid link' }),
});
type EditorFormData = z.infer<typeof editorFormSchema>;

export function LinkBlock() {
  const { editor } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<EditorFormData>({
    defaultValues: {
      link: '',
    },
    mode: 'onChange',
    resolver: zodResolver(editorFormSchema),
  });
  const formLink = form.watch('link');

  if (!editor) {
    return null;
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const setLinkOnEditor = useCallback(
    (url: string) => {
      if (!editor) {
        return;
      }

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
    [editor],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon
          variant={'ghost'}
          icon={LinkIcon}
          size={'sm'}
          active={editor.isActive('link')}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent" shouldFilter={false}>
          <CommandInput
            placeholder="Enter or paste the URL"
            onValueChange={(value) => {
              form.setValue('link', value, {
                shouldValidate: true,
              });
            }}
          />
          <CommandList>
            {formLink && (
              <CommandGroup>
                <>
                  <CommandItem
                    className="items-start data-[selected='true']:bg-foreground/10"
                    onSelect={() => {
                      setLinkOnEditor(form.getValues('link'));
                    }}
                  >
                    <GlobeIcon className="mr-2 mt-0.5 h-4 w-4" />
                    <div className="flex flex-col">
                      <Typo variant={'sm'} className="max-w-40 truncate">
                        {formLink}
                      </Typo>
                      <Typo variant={'mutedXs'}>
                        {form.formState.errors.link
                          ? form.formState.errors.link?.message
                          : 'Link to this website'}
                      </Typo>
                    </div>
                  </CommandItem>

                  {editor.isActive('link') && (
                    <CommandItem
                      className="data-[selected='true']:bg-foreground/10"
                      onSelect={() => {
                        setLinkOnEditor('');
                        form.setValue('link', '');
                      }}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      <Typo variant={'sm'}>Remove link</Typo>
                    </CommandItem>
                  )}
                </>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
