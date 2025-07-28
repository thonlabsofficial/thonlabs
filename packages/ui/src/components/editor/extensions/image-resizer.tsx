import { useCurrentEditor } from '@tiptap/react';
import Moveable from 'react-moveable';

function getImageElement() {
  const element = document.querySelector(
    '.ProseMirror-selectednode'
  ) as HTMLImageElement;

  if (!element) {
    return null;
  }

  if (element.tagName === 'A') {
    return document.querySelector(
      '.ProseMirror-selectednode img'
    ) as HTMLImageElement;
  }

  return element;
}

export function ImageResizer() {
  const { editor } = useCurrentEditor();

  if (!editor?.isActive('image')) {
    return null;
  }

  const updateMediaSize = () => {
    const imageInfo = getImageElement();

    if (imageInfo) {
      const selection = editor.state.selection;

      editor.commands.setImageSize({
        width: Number(imageInfo.style.width.replace('px', '')),
        height: Number(imageInfo.style.height.replace('px', '')),
      });
      editor.commands.setNodeSelection(selection.from);
    }
  };

  return (
    <Moveable
      target={getImageElement()}
      container={null}
      origin={false}
      edge={false}
      throttleDrag={0}
      keepRatio={true}
      resizable={true}
      throttleResize={0}
      onResize={({ target, width, height, delta }) => {
        if (delta[0]) target.style.width = `${width}px`;
        if (delta[1]) target.style.height = `${height}px`;
      }}
      onResizeEnd={() => {
        updateMediaSize();
      }}
      scalable={true}
      throttleScale={0}
      renderDirections={['w', 'e']}
      onScale={({ target, transform }) => {
        target.style.transform = transform;
      }}
    />
  );
}
