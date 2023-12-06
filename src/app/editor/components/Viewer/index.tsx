import { useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';

interface ViewerProps {
  html: string;
}

export default function Viewer({ html }: ViewerProps) {
  const sanitizedHtml = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <div
      className="disable-tailwind p-2"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
