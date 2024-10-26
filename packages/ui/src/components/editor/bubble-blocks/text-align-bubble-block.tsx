import { useEditor } from 'novel';
import {
  AlignCenter as AlignCenterIcon,
  AlignJustify as AlignJustifyIcon,
  AlignLeft as AlignLeftIcon,
  AlignRight as AlignRightIcon,
} from 'lucide-react';
import { ButtonIcon } from '../../button-icon';

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
