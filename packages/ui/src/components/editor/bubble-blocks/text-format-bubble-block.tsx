import {
  Bold as BoldIcon,
  Code as CodeIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
} from 'lucide-react';
import { useEditor } from 'novel';
import { ButtonIcon } from '../../button-icon';

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
          type='button'
          variant={'ghost'}
          icon={BoldIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        />
      )}
      {options.includes('italic') && (
        <ButtonIcon
          type='button'
          variant={'ghost'}
          icon={ItalicIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        />
      )}
      {options.includes('underline') && (
        <ButtonIcon
          type='button'
          variant={'ghost'}
          icon={UnderlineIcon}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        />
      )}
      {options.includes('code') && (
        <ButtonIcon
          type='button'
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
