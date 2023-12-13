import Editor from '../components/Editor';
interface EditorPageProps {
  params: {
    name: string;
  };
}

export function generateStaticParams() {
  const pages = ['draft', 'quill', 'slate-react', 'result'];
  return pages.map((page) => ({ name: page }));
}

export default function EditorPage({ params: { name } }: EditorPageProps) {
  return <Editor name={name} />;
}
