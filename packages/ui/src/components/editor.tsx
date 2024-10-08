'use client';

import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import {
  BubbleMenu,
  EditorContent,
  JSONContent,
  mergeAttributes,
  useEditor,
} from '@tiptap/react';
import React from 'react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Globe,
  Trash,
  Text as TextIcon,
  LucideIcon,
  Heading1,
  CheckSquare,
  Heading2,
  Heading3,
  ListOrdered,
  TextQuote,
  SquareDashedBottomCode,
  BookType,
  Heading4,
} from 'lucide-react';
import { Separator } from './separator';
import { ButtonIcon } from './button-icon';
import { useForm } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from './command';
import { Typo } from './typo';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './button';

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}

const editorFormSchema = z.object({
  link: z.string().url({ message: 'Enter a valid link' }),
});
type EditorFormData = z.infer<typeof editorFormSchema>;

type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (
    editor: React.ComponentProps<typeof EditorContent>['editor'],
  ) => void;
  isActive: (
    editor: React.ComponentProps<typeof EditorContent>['editor'],
  ) => boolean;
};
const typoItems: SelectorItem[] = [
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
    icon: Heading1,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 1 }) || false,
  },
  {
    name: 'Heading 2',
    icon: Heading2,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 2 }) || false,
  },
  {
    name: 'Heading 3',
    icon: Heading3,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 3 }) || false,
  },
  {
    name: 'Heading 4',
    icon: Heading4,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleHeading({ level: 4 }).run(),
    isActive: (editor) => editor?.isActive('heading', { level: 4 }) || false,
  },
  {
    name: 'Code Block',
    icon: SquareDashedBottomCode,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor?.isActive('codeBlock') || false,
  },
  {
    name: 'Quote',
    icon: TextQuote,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor?.isActive('blockquote') || false,
  },
  {
    name: 'Bullet List',
    icon: ListOrdered,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor?.isActive('bulletList') || false,
  },
  {
    name: 'Numbered List',
    icon: ListOrdered,
    command: (editor) =>
      editor?.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor?.isActive('orderedList') || false,
  },
];

const Editor = ({ initialValue, onChange }: EditorProp) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Image,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Underline,
      FontFamily,
      Placeholder,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level;
          const mapper = {
            1: 'font-size:40px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:18px;',
            2: 'font-size:32px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:18px;',
            3: 'font-size:28px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:18px;',
            4: 'font-size:24px;font-weight:700;line-height:2rem;margin-top:0;margin-bottom:18px;',
          };

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              style: mapper[level as keyof typeof mapper],
            }),
            0,
          ];
        },
      }),
    ],
    content: `
      <div>
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This is a 4th level heading</h4>
        <p>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</p>
        <ul>
          <li>This is a list item</li>
          <li>This is another list item</li>
        </ul>
        <ol>
          <li>This is a numbered list item</li>
          <li>This is another numbered list item</li>
        </ol>
        <blockquote>This is a blockquote</blockquote>
        <pre><code>for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <code>This is inline code</code>
        <a href="https://www.google.com">This is a link</a>
        <button>This is a button</button>
        <img src="https://placehold.co/600x400" alt="Placeholder Image" />
      </div>
      `,
  });
  const form = useForm<EditorFormData>({
    defaultValues: {
      link: '',
    },
    mode: 'onChange',
    resolver: zodResolver(editorFormSchema),
  });
  const formLink = form.watch('link');

  const setLinkOnEditor = React.useCallback(
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

  if (!editor) {
    return null;
  }

  const typoActiveItem = typoItems
    .filter((item) => item.isActive(editor))
    .pop() ?? {
    name: 'Multiple',
    icon: BookType,
  };

  return (
    <div className="border rounded-md bg-card overflow-hidden p-4">
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          maxWidth: '500px',
          onShow: () => {
            if (editor.isActive('link')) {
              form.setValue('link', editor.getAttributes('link').href);
            }
          },
          onHide: () => {
            form.setValue('link', '');
          },
        }}
      >
        <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07]">
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger>
                <Button
                  variant={'ghost'}
                  icon={typoActiveItem?.icon}
                  size={'sm'}
                >
                  {typoActiveItem?.name}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-1 w-52 p-0 rounded-md bg-muted border border-foreground/[0.07]">
                <Command
                  className="bg-transparent"
                  defaultValue={typoActiveItem?.name}
                >
                  <CommandList>
                    <CommandGroup>
                      {typoItems.map((item, index) => (
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
            <Separator
              orientation="vertical"
              className="h-7 bg-foreground/[0.07]"
            />
            <ButtonIcon
              variant={'ghost'}
              icon={Bold}
              size={'sm'}
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive('bold')}
            />
            <ButtonIcon
              variant={'ghost'}
              icon={Italic}
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
            <Separator
              orientation="vertical"
              className="h-7 bg-foreground/[0.07]"
            />
            <ButtonIcon
              variant={'ghost'}
              icon={AlignLeft}
              size={'sm'}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              active={editor.isActive({ textAlign: 'left' })}
            />
            <ButtonIcon
              variant={'ghost'}
              icon={AlignCenter}
              size={'sm'}
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              active={editor.isActive({ textAlign: 'center' })}
            />
            <ButtonIcon
              variant={'ghost'}
              icon={AlignRight}
              size={'sm'}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              active={editor.isActive({ textAlign: 'right' })}
            />
            <ButtonIcon
              variant={'ghost'}
              icon={AlignJustify}
              size={'sm'}
              onClick={() =>
                editor.chain().focus().setTextAlign('justify').run()
              }
              active={editor.isActive({ textAlign: 'justify' })}
            />
            <Separator
              orientation="vertical"
              className="h-7 bg-foreground/[0.07]"
            />
            <ButtonIcon
              variant={'ghost'}
              icon={Code}
              size={'sm'}
              onClick={() => editor.chain().focus().toggleCode().run()}
              active={editor.isActive('code')}
            />
            <Popover>
              <PopoverTrigger>
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
                            <Globe className="mr-2 mt-0.5 h-4 w-4" />
                            <div className="flex flex-col">
                              <Typo
                                variant={'sm'}
                                className="max-w-40 truncate"
                              >
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
                              <Trash className="mr-2 h-4 w-4" />
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
          </div>
        </div>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  );
};

export type { JSONContent };

export default Editor;
