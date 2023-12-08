import { useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';

interface ViewerProps {
  html: string;
}

export default function Viewer({ html }: ViewerProps) {
  const sanitizedHtml = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <div
      className="disable-tailwind p-4 h-[calc(100%+48px)] overflow-y-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
