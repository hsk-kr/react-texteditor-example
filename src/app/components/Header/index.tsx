'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Draft',
    sLabel: 'Draft',
    href: '/editor/draft',
  },
  {
    label: 'Quill',
    sLabel: 'Quill',
    href: '/editor/quill',
  },
  {
    label: 'Summernote',
    sLabel: 'Summer',
    href: '/editor/summernote',
  },
  {
    label: 'Slate React',
    sLabel: 'Slate',
    href: '/editor/slate-react',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <ul className="min-h-[48px] h-12 flex justify-between">
      {routes.map((route) => {
        const active = pathname.endsWith(route.href);

        return (
          <Link
            key={route.label}
            href={route.href}
            className={`flex h-full justify-center items-center whitespace-nowrap transition-all ${
              active ? `bg-secondary flex-[2]` : 'flex-[1] bg-tertiary'
            }`}
          >
            {active ? route.label : route.sLabel}
          </Link>
        );
      })}
    </ul>
  );
}
