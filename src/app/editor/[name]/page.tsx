'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Viewer from '../components/Viewer';
import { useRouter } from 'next/navigation';
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
    router.push('/editor/result');
  };

  const editors: Record<string, React.ReactNode> = {
    draft: <Draft onChange={handleTextChange} />,
  };
  const iName = name.toLowerCase();

  const emptyString = html.length <= 1;

  return (
    <div className="flex flex-col h-full">
      <main className="flex-[1]">{editors[iName] ?? <Viewer />}</main>
      <footer className="h-12">
        {editors[iName] && (
          <button
            className={`h-12 w-full radius rounded-t-2xl transition-colors ${
              emptyString ? 'bg-tertiary' : 'bg-secondary'
            }`}
            disabled={emptyString}
            onClick={handleSave}
          >
            SAVE
          </button>
        )}
      </footer>
    </div>
  );
}
