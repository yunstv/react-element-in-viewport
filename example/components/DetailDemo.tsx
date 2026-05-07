import * as React from 'react';
import { ElementInViewport } from 'react-element-in-viewport';

export const DetailDemo: React.FC<{ name: string; replayKey: number }> = ({
  name,
  replayKey
}) => (
  <div className="flex items-center justify-center py-6 bg-black/30 backdrop-blur-sm border-b border-white/10 min-h-40">
    <ElementInViewport
      key={`${name}-${replayKey}`}
      animation={name}
      className="w-28 h-28 rounded-xl flex items-center justify-center text-neutral-900 text-xs font-mono font-bold ring-2 ring-white/40 shadow-[0_12px_36px_rgba(0,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.4)_inset]"
      style={{
        background:
          'linear-gradient(135deg, #ffffff 0%, #e0f2fe 60%, #bae6fd 100%)'
      }}
    >
      {(intersecting: boolean) =>
        intersecting ? (
          <span className="px-2 text-center">{name}</span>
        ) : (
          <></>
        )
      }
    </ElementInViewport>
  </div>
);
