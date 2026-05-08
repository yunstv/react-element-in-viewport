import * as React from 'react';

const REPO_URL = 'https://github.com/yunstv/react-element-in-viewport';
const NPM_URL = 'https://www.npmjs.com/package/react-element-in-viewport';

const GithubIcon: React.FC = () => (
  <svg
    viewBox="0 0 16 16"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const NpmIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="currentColor"
    aria-hidden
  >
    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H4v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
  </svg>
);

const NavLink: React.FC<{
  href: string;
  title: string;
  children: React.ReactNode;
}> = ({ href, title, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    aria-label={title}
    className="w-9 h-9 rounded-md flex items-center justify-center text-white/85 hover:text-white hover:bg-white/10 transition"
  >
    {children}
  </a>
);

export const TopNav: React.FC = () => (
  <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-2.5 bg-black/30 backdrop-blur-md border-b border-white/10 text-white">
    <a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      className="font-mono font-bold tracking-wider text-base sm:text-lg drop-shadow hover:text-white/90 transition"
    >
      react-element-in-viewport
    </a>
    <nav className="flex items-center gap-1">
      <NavLink href={REPO_URL} title="GitHub repo">
        <GithubIcon />
      </NavLink>
      <NavLink href={NPM_URL} title="npm package">
        <NpmIcon />
      </NavLink>
    </nav>
  </header>
);
