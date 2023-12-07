import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center pt-4 md:pt-8">
      <h1 className="font-bold text-lg">Pick an editor!</h1>
      <Link
        className="text-sm mt-2 underline text-blue-700"
        href="/editor/result"
      >
        Move to HTML Viewer
      </Link>
    </div>
  );
}
