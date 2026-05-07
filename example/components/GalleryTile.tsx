import * as React from 'react';

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
  return (
    <button
      type="button"
      data-gallery-tile
      onClick={onActivate}
      title={`click to preview: ${name}`}
      className="relative aspect-square w-full border border-white/40 hover:border-white/70 cursor-pointer p-0 outline-none transition bg-transparent p-2"
    >
      <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-800">
        <TileSurface name={name} bg={bg} />
      </div>
    </button>
  );
};
