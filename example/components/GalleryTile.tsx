import * as React from 'react';
import { trajectoryMap } from '../data/trajectories';

const TileSurface: React.FC<{ name: string; bg: string }> = ({ name, bg }) => {
  const trajectory = trajectoryMap[name];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0" style={{ background: bg }} />

      <div className="absolute inset-0 flex flex-col p-1.5 gap-1.5">
        {trajectory && (
          <div className="flex-1 flex items-center justify-center text-center text-white/90 text-sm leading-snug px-2 drop-shadow">
            {trajectory}
          </div>
        )}
        <div className="px-2 py-1 rounded bg-black/55 text-white text-sm font-mono font-semibold text-center truncate drop-shadow">
          {name}
        </div>
      </div>
    </div>
  );
};

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
