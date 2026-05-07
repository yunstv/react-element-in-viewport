import * as React from 'react';
import { useKeyframes } from '../hooks/useKeyframes';
import { CodeBlock } from './CodeBlock';
import { DetailCarousel } from './DetailCarousel';
import { DetailDemo } from './DetailDemo';
import { DetailNavButton } from './DetailNavButton';

const PANEL_BG: React.CSSProperties = {
  backgroundColor: '#14012b',
  backgroundImage: [
    'radial-gradient(120% 90% at 0% 0%, #ff006e 0%, transparent 55%)',
    'radial-gradient(110% 90% at 100% 0%, #ffbe0b 0%, transparent 55%)',
    'radial-gradient(120% 90% at 100% 100%, #00f5d4 0%, transparent 55%)',
    'radial-gradient(120% 90% at 0% 100%, #8338ec 0%, transparent 55%)'
  ].join(',')
};

const buildUsageCode = (name: string) =>
  `import { ElementInViewport } from 'react-element-in-viewport';\n\n<ElementInViewport animation="${name}">\n  <div>your content</div>\n</ElementInViewport>`;

const DetailHeader: React.FC<{
  name: string;
  index: number;
  total: number;
  onClose: () => void;
}> = ({ name, index, total, onClose }) => (
  <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
    <h2 className="text-2xl font-mono font-extrabold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] flex items-baseline gap-3">
      <span>{name}</span>
      <span className="text-sm font-normal text-white/70">
        {index + 1} / {total}
      </span>
    </h2>
    <button
      type="button"
      onClick={onClose}
      className="text-white/80 hover:text-white w-8 h-8 rounded hover:bg-white/15 flex items-center justify-center transition leading-none"
      aria-label="Close"
    >
      ✕
    </button>
  </div>
);

const ReplayButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white text-fuchsia-700 text-sm font-mono font-bold shadow-[0_10px_24px_rgba(255,0,110,0.45)] hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
  >
    <span aria-hidden>↻</span> Replay
  </button>
);

export const AnimationDetail: React.FC<{
  items: AnimateStyles[];
  bgs: string[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}> = ({ items, bgs, index, onChange, onClose }) => {
  const total = items.length;
  const item = items[index];
  const name = item?.animationName || '';

  const [replay, setReplay] = React.useState(0);
  const keyframes = useKeyframes(name);

  const goPrev = React.useCallback(() => {
    if (total === 0) return;
    onChange((index - 1 + total) % total);
  }, [index, total, onChange]);

  const goNext = React.useCallback(() => {
    if (total === 0) return;
    onChange((index + 1) % total);
  }, [index, total, onChange]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center gap-4 px-4 py-6"
    >
      <div className="flex items-center justify-center gap-6">
        <DetailNavButton
          direction="prev"
          onClick={e => {
            e.stopPropagation();
            goPrev();
          }}
        />

        <div
          onClick={e => e.stopPropagation()}
          className="relative w-[50vw] h-[50vh] min-w-140 min-h-115 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col text-white"
          style={PANEL_BG}
        >
          <DetailHeader
            name={name}
            index={index}
            total={total}
            onClose={onClose}
          />

          <DetailDemo name={name} replayKey={replay} />

          <div className="px-6 py-4 overflow-y-auto flex-1 pb-20 bg-black/35 backdrop-blur-sm">
            <CodeBlock title="CSS Keyframes" code={keyframes} />
            <CodeBlock title="React Usage" code={buildUsageCode(name)} />
          </div>

          <ReplayButton onClick={() => setReplay(r => r + 1)} />
        </div>

        <DetailNavButton
          direction="next"
          onClick={e => {
            e.stopPropagation();
            goNext();
          }}
        />
      </div>

      <DetailCarousel
        items={items}
        bgs={bgs}
        index={index}
        onChange={onChange}
      />
    </div>
  );
};
