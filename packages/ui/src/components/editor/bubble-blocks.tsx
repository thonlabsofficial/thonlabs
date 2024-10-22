import { useCallback, useEffect, useRef } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '../command';
import { Button, buttonVariants } from '../button';
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
  Image as ImageIcon,
  Type as TypeIcon,
  Highlighter as HighlighterIcon,
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
            <CommandGroup heading="Switch To">
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

export function TextFormatBlock(props: { options?: string[] }) {
  const defaultOptions = { options: ['bold', 'italic', 'underline', 'code'] };
  const { options } = { ...defaultOptions, ...props };
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      {options.includes('bold') && (
        <ButtonIcon
          variant={'ghost'}
          icon={BoldIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        />
      )}
      {options.includes('italic') && (
        <ButtonIcon
          variant={'ghost'}
          icon={ItalicIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        />
      )}
      {options.includes('underline') && (
        <ButtonIcon
          variant={'ghost'}
          icon={UnderlineIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        />
      )}
      {options.includes('code') && (
        <ButtonIcon
          variant={'ghost'}
          icon={CodeIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
        />
      )}
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

const linkFormSchema = z.object({
  link: z.string().url({ message: 'Enter a valid link' }),
});
type LinkFormData = z.infer<typeof linkFormSchema>;

export function LinkBlock({ buttonLink = false }: { buttonLink?: boolean }) {
  const { editor } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<LinkFormData>({
    defaultValues: {
      link: '',
    },
    mode: 'onChange',
    resolver: zodResolver(linkFormSchema),
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

      if (url === '' && !buttonLink) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      if (buttonLink) {
        editor.chain().focus().setButtonLink({ href: url }).run();
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      }
    },
    [editor, buttonLink],
  );

  const isActive =
    editor.isActive('link') || editor.isActive('buttonLink', { hasLink: true });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon
          variant={'ghost'}
          icon={LinkIcon}
          size={'sm'}
          active={isActive}
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

                  {isActive && (
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

const imageFormSchema = z.object({
  href: z.string().url({ message: 'Please enter a valid URL' }),
});
type ImageFormData = z.infer<typeof imageFormSchema>;

export function ImageBlock() {
  const { editor } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<ImageFormData>({
    defaultValues: {
      href: '',
    },
    mode: 'onChange',
    resolver: zodResolver(imageFormSchema),
  });
  const formHref = form.watch('href');

  if (!editor) {
    return null;
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const setImageOnEditor = useCallback(
    (url: string) => {
      if (!editor) {
        return;
      }

      editor.chain().focus().setImage({ src: url }).run();

      form.setValue('href', '');
    },
    [editor, form],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon variant={'ghost'} icon={ImageIcon} size={'sm'} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent" shouldFilter={false}>
          <CommandInput
            placeholder="Enter or paste the URL"
            onValueChange={(value) => {
              form.setValue('href', value, {
                shouldValidate: true,
              });
            }}
          />
          <CommandList>
            {formHref && (
              <CommandGroup>
                <>
                  <CommandItem
                    className="items-start data-[selected='true']:bg-foreground/10"
                    onSelect={() => {
                      setImageOnEditor(form.getValues('href'));
                    }}
                  >
                    <GlobeIcon className="mr-2 mt-0.5 h-4 w-4" />
                    <div className="flex flex-col">
                      <Typo variant={'sm'} className="max-w-40 truncate">
                        {formHref}
                      </Typo>
                      <Typo variant={'mutedXs'}>
                        {form.formState.errors.href
                          ? form.formState.errors.href?.message
                          : 'Show an image from this URL'}
                      </Typo>
                    </div>
                  </CommandItem>
                </>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ImageAlignBlock() {
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
        onClick={() => editor.chain().focus().setImageAlign('left').run()}
        active={editor.isActive('image', { imageAlign: 'left' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignCenterIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setImageAlign('center').run()}
        active={editor.isActive('image', { imageAlign: 'center' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignRightIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setImageAlign('right').run()}
        active={editor.isActive('image', { imageAlign: 'right' })}
      />
    </>
  );
}

export function ButtonLinkAlignBlock() {
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
        onClick={() => editor.chain().focus().setButtonLinkAlign('left').run()}
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'left' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignCenterIcon}
        size={'sm'}
        onClick={() =>
          editor.chain().focus().setButtonLinkAlign('center').run()
        }
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'center' })}
      />
      <ButtonIcon
        variant={'ghost'}
        icon={AlignRightIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setButtonLinkAlign('right').run()}
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'right' })}
      />
    </>
  );
}

export function ColorBlock({
  type = 'color',
}: {
  type?: 'color' | 'highlight';
}) {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  const colors = {
    'gray-50': '#fafafa',
    'red-50': '#fef2f2',
    'orange-50': '#fff7ed',
    'amber-50': '#fffbeb',
    'green-50': '#f0fdf4',
    'blue-50': '#eff6ff',
    'purple-50': '#faf5ff',
    'pink-50': '#fdf2f8',
    'gray-100': '#f4f4f5',
    'red-100': '#fee2e2',
    'orange-100': '#ffedd5',
    'amber-100': '#fef3c7',
    'green-100': '#dcfce7',
    'blue-100': '#dbeafe',
    'purple-100': '#f3e8ff',
    'pink-100': '#fce7f3',
    'gray-200': '#e4e4e7',
    'red-200': '#fecaca',
    'orange-200': '#fed7aa',
    'amber-200': '#fde68a',
    'green-200': '#bbf7d0',
    'blue-200': '#bfdbfe',
    'purple-200': '#e9d5ff',
    'pink-200': '#fbcfe8',
    'gray-300': '#d4d4d8',
    'red-300': '#fca5a5',
    'orange-300': '#fdba74',
    'amber-300': '#fcd34d',
    'green-300': '#86efac',
    'blue-300': '#93c5fd',
    'purple-300': '#d8b4fe',
    'pink-300': '#f9a8d4',
    'gray-400': '#a1a1aa',
    'red-400': '#f87171',
    'orange-400': '#fb923c',
    'amber-400': '#fbbf24',
    'green-400': '#4ade80',
    'blue-400': '#60a5fa',
    'purple-400': '#c084fc',
    'pink-400': '#f472b6',
    'gray-500': '#71717a',
    'red-500': '#ef4444',
    'orange-500': '#f97316',
    'amber-500': '#f59e0b',
    'green-500': '#22c55e',
    'blue-500': '#3b82f6',
    'purple-500': '#a855f7',
    'pink-500': '#ec4899',
    'gray-600': '#52525b',
    'red-600': '#dc2626',
    'orange-600': '#ea580c',
    'amber-600': '#d97706',
    'green-600': '#16a34a',
    'blue-600': '#2563eb',
    'purple-600': '#9333ea',
    'pink-600': '#db2777',
    'gray-700': '#3f3f46',
    'red-700': '#b91c1c',
    'orange-700': '#c2410c',
    'amber-700': '#b45309',
    'green-700': '#15803d',
    'blue-700': '#1d4ed8',
    'purple-700': '#7e22ce',
    'pink-700': '#be185d',
    'gray-800': '#27272a',
    'red-800': '#991b1b',
    'orange-800': '#9a3412',
    'amber-800': '#92400e',
    'green-800': '#166534',
    'blue-800': '#1e40af',
    'purple-800': '#6b21a8',
    'pink-800': '#9d174d',
    'gray-900': '#18181b',
    'red-900': '#7f1d1d',
    'orange-900': '#7c2d12',
    'amber-900': '#78350f',
    'green-900': '#14532d',
    'blue-900': '#1e3a8a',
    'purple-900': '#581c87',
    'pink-900': '#831843',
    'gray-950': '#09090b',
    'red-950': '#450a0a',
    'orange-950': '#431407',
    'amber-950': '#451a03',
    'green-950': '#052e16',
    'blue-950': '#172554',
    'purple-950': '#3b0764',
    'pink-950': '#500724',
  };

  const labelsMapper = {
    color: {
      headingLabel: 'Text Color',
      removeLabel: 'Remove',
      icon: TypeIcon,
      attribute: 'textStyle',
    },
    highlight: {
      headingLabel: 'Highlight Color',
      removeLabel: 'Remove',
      icon: HighlighterIcon,
      attribute: 'highlight',
    },
  };

  const currentColor = editor.getAttributes(labelsMapper[type].attribute).color;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" icon={labelsMapper[type].icon}>
          <div
            className="h-4 w-4 rounded border border-gray-200"
            style={{
              backgroundColor: currentColor || 'hsl(var(--foreground))',
            }}
          />
          <span className="sr-only">Choose color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
        <Command className="bg-transparent">
          <CommandList>
            <CommandGroup
              heading={
                <div className="flex justify-between">
                  <div>{labelsMapper[type].headingLabel}</div>
                  {currentColor && (
                    <button
                      className="hover:text-foreground/80 transition-default"
                      onClick={() => {
                        switch (type) {
                          case 'color':
                            editor.chain().focus().unsetColor().run();
                            break;
                          case 'highlight':
                            editor.chain().focus().unsetHighlight().run();
                            break;
                        }
                      }}
                    >
                      {labelsMapper[type].removeLabel}
                    </button>
                  )}
                </div>
              }
            >
              <div className="grid grid-cols-8 gap-1 pt-0 pb-1 px-2">
                {Object.entries(colors).map(([name, color]) => (
                  <CommandItem
                    className="w-5 h-5 flex !p-0 hover:bg-foreground/10 data-[selected='true']:bg-foreground/10"
                    key={name}
                    onSelect={() => {
                      switch (type) {
                        case 'color':
                          editor.chain().focus().setColor(color).run();
                          break;
                        case 'highlight':
                          editor.chain().focus().setHighlight({ color }).run();
                          break;
                      }
                    }}
                  >
                    <div
                      className="w-full h-full rounded shadow-md border border-foreground/[0.07] hover:border-foreground transition-default"
                      style={{ backgroundColor: color }}
                    />
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
