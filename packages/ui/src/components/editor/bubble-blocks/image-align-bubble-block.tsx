import { useEditor } from 'novel';
import {
  AlignCenter as AlignCenterIcon,
  AlignLeft as AlignLeftIcon,
  AlignRight as AlignRightIcon,
} from 'lucide-react';
import { ButtonIcon } from '../../button-icon';

export function ImageAlignBlock() {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonIcon
        type="button"
        variant={'ghost'}
        icon={AlignLeftIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setImageAlign('left').run()}
        active={editor.isActive('image', { imageAlign: 'left' })}
      />
      <ButtonIcon
        type="button"
        variant={'ghost'}
        icon={AlignCenterIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setImageAlign('center').run()}
        active={editor.isActive('image', { imageAlign: 'center' })}
      />
      <ButtonIcon
        type="button"
        variant={'ghost'}
        icon={AlignRightIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setImageAlign('right').run()}
        active={editor.isActive('image', { imageAlign: 'right' })}
      />
    </>
  );
}
