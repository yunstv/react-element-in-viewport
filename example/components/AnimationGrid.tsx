import * as React from 'react';
import { createPortal } from 'react-dom';
import { gradientRandom, sumRandom } from '../utils';
import { AnimationDetail } from './AnimationDetail';
import { GalleryTile } from './GalleryTile';

const COLOR_MAX = 20;
const COLOR_LENGTH = sumRandom(COLOR_MAX, 5);
const palette = Array.from({ length: COLOR_LENGTH }, () => gradientRandom());

const flattenItems = (data: AnimateStyles[]): AnimateStyles[] =>
  data.reduce<AnimateStyles[]>(
    (acc, group) => acc.concat(group.children || []),
    []
  );

export const AnimationGrid: React.FC<{ data: AnimateStyles[] }> = ({
  data
}) => {
  const items = React.useMemo(() => flattenItems(data), [data]);
  const tileBgs = React.useMemo(
    () => items.map(() => palette[sumRandom(COLOR_LENGTH, 0)]),
    [items]
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-1.5 w-full">
        {items.map((item, index) => (
          <GalleryTile
            key={`${item.animationName}-${index}`}
            name={item.animationName!}
            bg={tileBgs[index]}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>
      {activeIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimationDetail
            items={items}
            bgs={tileBgs}
            index={activeIndex}
            onChange={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />,
          document.body
        )}
    </>
  );
};
