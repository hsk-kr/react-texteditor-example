'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Viewer from '../../components/Viewer';
import { useRouter } from 'next/navigation';

const Draft = dynamic(
  () => import('../../components/Draft').then((mod) => mod.default),
  { ssr: false, loading: () => <Loading /> }
);

const Slate = dynamic(
  () => import('../../components/Slate').then((mod) => mod.default),
  { ssr: false, loading: () => <Loading /> }
);

const Quill = dynamic(
  () => import('../../components/Quill').then((mod) => mod.default),
  { ssr: false, loading: () => <Loading /> }
);

interface EditorProps {
  name: string;
}

const Loading = () => {
  return (
    <div className="absolute z-10 left-0 top-0 right-0 bottom-0 flex justify-center items-center">
      <div className="w-8 h-8 rounded-full bg-secondary animate-ping"></div>
    </div>
  );
};

export default function Editor({ name }: EditorProps) {
  const router = useRouter();
  const [html, setHtml] = useState('');

  const handleTextChange = (html: string) => {
    setHtml(html);
  };

  const handleSave = () => {
    localStorage.setItem('html', html);
    router.push('/editor/result');
  };

  const editors: Record<string, React.ReactNode> = {
    draft: <Draft onChange={handleTextChange} />,
    quill: <Quill onChange={handleTextChange} />,
    'slate-react': <Slate onChange={handleTextChange} />,
  };
  const iName = name.toLowerCase();
  const emptyString = removeHtmlTags(html).length <= 0;

  useEffect(() => {
    if (editors[name] !== undefined) return;

    setHtml(localStorage.getItem('html') ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full relative">
      <main className="h-[calc(100%-48px)] relative">
        {editors[iName] ?? <Viewer html={html} />}
      </main>
      {editors[iName] && (
        <footer>
          <button
            className={`h-12 w-full text-sm md:text-lg radius rounded-t-2xl transition-colors ${
              emptyString
                ? 'bg-tertiary'
                : 'bg-secondary text-primary font-bold'
            }`}
            disabled={emptyString}
            onClick={handleSave}
          >
            SAVE
          </button>
        </footer>
      )}
    </div>
  );
}

const removeHtmlTags = (html: string) => {
  if (typeof DOMParser === 'undefined') return html;
  let tmpHtml = new DOMParser().parseFromString(html, 'text/html');
  return tmpHtml.body.textContent?.trim() ?? '';
};
