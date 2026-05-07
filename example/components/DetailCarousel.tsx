import * as React from 'react';

const CarouselTile: React.FC<{
  name: string;
  bg: string;
  active: boolean;
  onClick: () => void;
}> = ({ name, bg, active, onClick }) => (
  <button
    type="button"
    data-active={active}
    onClick={onClick}
    title={name}
    className={
      'shrink-0 w-20 h-20 rounded-md overflow-hidden relative transition border-0 p-0 cursor-pointer ' +
      (active
        ? 'ring-2 ring-white scale-110 z-10 shadow-[0_8px_24px_rgba(255,255,255,0.25)]'
        : 'ring-1 ring-white/15 hover:ring-white/40 opacity-60 hover:opacity-100')
    }
  >
    <div className="absolute inset-0" style={{ background: bg }} />
    <span className="absolute inset-x-0.5 bottom-0.5 px-1 py-0.5 rounded-sm text-[9px] font-mono font-semibold text-white bg-black/60 truncate text-center">
      {name}
    </span>
  </button>
);

export const DetailCarousel: React.FC<{
  items: AnimateStyles[];
  bgs: string[];
  index: number;
  onChange: (i: number) => void;
}> = ({ items, bgs, index, onChange }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>('[data-active="true"]');
    if (active) {
      active.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: firstRender.current ? 'auto' : 'smooth'
      });
    }
    firstRender.current = false;
  }, [index]);

  return (
    <div
      onClick={e => e.stopPropagation()}
      ref={containerRef}
      className="w-[min(80vw,1080px)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
      }}
    >
      <div className="flex gap-2 py-3 px-[calc(50%-2.5rem)]">
        {items.map((item, i) => (
          <CarouselTile
            key={`${item.animationName}-${i}`}
            name={item.animationName!}
            bg={bgs[i]}
            active={i === index}
            onClick={() => onChange(i)}
          />
        ))}
      </div>
    </div>
  );
};
