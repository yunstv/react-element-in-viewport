import * as React from 'react';
import { useHoverDelay } from '../hooks/useHoverDelay';

const HOVER_DELAY = 2000;

const TileSurface: React.FC<{ name: string; bg: string }> = ({ name, bg }) => (
  <div className="relative w-full h-full">
    <div className="absolute inset-0" style={{ background: bg }} />
    <div className="absolute inset-x-1.5 bottom-1.5 px-2 py-1 rounded bg-black/55 text-white text-sm font-mono font-semibold text-center truncate drop-shadow">
      {name}
    </div>
  </div>
);

export const GalleryTile: React.FC<{
  name: string;
  bg: string;
  onActivate: () => void;
}> = ({ name, bg, onActivate }) => {
  const { start, cancel } = useHoverDelay(onActivate, HOVER_DELAY);

  const handleClick = () => {
    cancel();
    onActivate();
  };

  return (
    <button
      type="button"
      onMouseEnter={start}
      onMouseLeave={cancel}
      onClick={handleClick}
      title={`hover 2s or click to preview: ${name}`}
      className="relative aspect-square w-full rounded-md overflow-hidden bg-neutral-900 cursor-pointer p-0 border-0 outline-none ring-0 hover:ring-2 hover:ring-white/30 transition"
    >
      <TileSurface name={name} bg={bg} />
    </button>
  );
};
