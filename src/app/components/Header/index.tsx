'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Home',
    sLabel: 'Home',
    href: '/',
  },
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
    label: 'Slate React',
    sLabel: 'Slate',
    href: '/editor/slate-react',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <ul className="min-h-[48px] h-12 flex justify-between text-sm md:text-lg">
      {routes.map((route) => {
        const active = pathname.endsWith(route.href);

        return (
          <Link
            key={route.label}
            href={route.href}
            className={`flex h-full justify-center items-center whitespace-nowrap transition-all ${
              active
                ? `bg-secondary flex-[2] text-primary font-bold`
                : 'flex-[1] bg-tertiary'
            }`}
          >
            {active ? route.label : route.sLabel}
          </Link>
        );
      })}
    </ul>
  );
}
