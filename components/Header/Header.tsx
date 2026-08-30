import Link from 'next/link';

import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav className={css.navigation}>
        <Link href="/">Home</Link>
        <Link href="/notes/filter/all">Notes</Link>
        <AuthNavigation />
      </nav>
    </header>
  );
}