import { useEditor } from 'novel';
import {
  AlignCenter as AlignCenterIcon,
  AlignLeft as AlignLeftIcon,
  AlignRight as AlignRightIcon,
} from 'lucide-react';
import { ButtonIcon } from '../../button-icon';

export function ButtonLinkAlignBlock() {
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
        onClick={() => editor.chain().focus().setButtonLinkAlign('left').run()}
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'left' })}
      />
      <ButtonIcon
        type="button"
        variant={'ghost'}
        icon={AlignCenterIcon}
        size={'sm'}
        onClick={() =>
          editor.chain().focus().setButtonLinkAlign('center').run()
        }
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'center' })}
      />
      <ButtonIcon
        type="button"
        variant={'ghost'}
        icon={AlignRightIcon}
        size={'sm'}
        onClick={() => editor.chain().focus().setButtonLinkAlign('right').run()}
        active={editor.isActive('buttonLink', { buttonLinkAlign: 'right' })}
      />
    </>
  );
}
