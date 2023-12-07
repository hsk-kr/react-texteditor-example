'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Viewer from '../components/Viewer';
import { useRouter } from 'next/navigation';
import { Quill } from '../components/Quill';
const Draft = dynamic(
  () => import('../components/Draft').then((mod) => mod.default),
  { ssr: false }
);

interface EditorPageProps {
  params: {
    name: string;
  };
}

export default function EditorPage({ params: { name } }: EditorPageProps) {
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
  };
  const iName = name.toLowerCase();

  const emptyString = html.length <= 1;

  useEffect(() => {
    setHtml(localStorage.getItem('html') ?? '');
  }, []);

  return (
    <div className="h-full relative">
      <main className="h-[calc(100%-48px)]">
        {editors[iName] ?? <Viewer html={html} />}
      </main>
      {editors[iName] && (
        <footer>
          <button
            className={`h-12 w-full text-sm md:text-lg radius rounded-t-2xl transition-colors ${
              emptyString ? 'bg-tertiary' : 'bg-secondary'
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
