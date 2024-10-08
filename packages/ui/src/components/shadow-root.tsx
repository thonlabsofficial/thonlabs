'use client';

import React from 'react';
import { createPortal } from 'react-dom';

export default function ShadowRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const shadowHostRef = React.useRef<any>(null);
  const [shadowRoot, setShadowRoot] = React.useState(null);

  React.useEffect(() => {
    if (
      shadowHostRef.current &&
      !shadowRoot &&
      !shadowHostRef.current?.shadowRoot
    ) {
      const root = shadowHostRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(root);

      const style = document.createElement('style');
      style.textContent = `
        :focus-visible {
          outline: none;
        }
      `;
      root.appendChild(style);
    }
  }, [shadowRoot]);

  return (
    <div ref={shadowHostRef}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
}
