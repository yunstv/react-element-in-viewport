import * as React from 'react';

export const DetailNavButton: React.FC<{
  direction: 'prev' | 'next';
  onClick: (e: React.MouseEvent) => void;
}> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Previous' : 'Next'}
    className="shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-3xl font-light leading-none flex items-center justify-center transition active:scale-90"
  >
    {direction === 'prev' ? '‹' : '›'}
  </button>
);
