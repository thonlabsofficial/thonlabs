import { useCallback, useEffect, useRef } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '../../command';
import { Typo } from '../../typo';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { useEditor } from 'novel';
import {
  Link as LinkIcon,
  Globe as GlobeIcon,
  Trash as TrashIcon,
} from 'lucide-react';
import { ButtonIcon } from '../../button-icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const linkFormSchema = z.object({
  link: z.string(),
});
type LinkFormData = z.infer<typeof linkFormSchema>;

export function LinkBlock({
  buttonLink = false,
  image = false,
}: {
  buttonLink?: boolean;
  image?: boolean;
}) {
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

  const isActive =
    editor.isActive('link') ||
    editor.isActive('buttonLink', { hasLink: true }) ||
    editor.isActive('image', { hasLink: true });
  const allowRemove =
    editor.isActive('link') || editor.isActive('image', { hasLink: true });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    const currentLink =
      editor.getAttributes('link')?.href ||
      editor.getAttributes('buttonLink')?.href ||
      editor.getAttributes('image')?.href ||
      '';

    form.setValue('link', currentLink);
  }, [editor, isActive]);

  const setLinkOnEditor = useCallback(
    (url: string) => {
      if (!editor) {
        return;
      }

      // Remove link
      if (url === '') {
        if (image) {
          editor.chain().focus().unsetImageLink().run();
        } else {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
        }
        return;
      }

      // Insert link
      if (buttonLink) {
        editor.chain().focus().setButtonLink({ href: url }).run();
      } else if (image) {
        editor.chain().focus().setImageLink(url).run();
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon
          type="button"
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
                      <Typo variant={'mutedXs'}>Link to this website</Typo>
                    </div>
                  </CommandItem>

                  {allowRemove && (
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
