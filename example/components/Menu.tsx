import * as React from 'react';
import { Styled } from '../styled';
import { generateRandomHexColor, gradientRandom, sumRandom } from '../utils';

const COLOR_MAX = 20;

const COLOR_Length = sumRandom(COLOR_MAX, 5);

const COLOR_temp = [
  `linear-gradient(
      20deg,
      rgb(149, 72, 228) 23.77%,
      rgb(94, 46, 195) 55.84%,
      rgb(58, 36, 199) 80.29%,
      rgb(46, 66, 213) 106.49%,
      rgb(53, 105, 251) 106.81%
    )`,
  `linear-gradient(
      ${sumRandom(360, 0)}deg,
      ${generateRandomHexColor()} 23.77%,
      ${generateRandomHexColor()} 55.84%,
      ${generateRandomHexColor()} 80.29%,
      ${generateRandomHexColor()} 106.49%,
      ${generateRandomHexColor()} 106.81%
    )`
];

const colors = Array.from(new Array(COLOR_Length), (_, index) => {
  const c = COLOR_temp[index];
  return c ? c : gradientRandom();
});

const BGWrap: React.FC<React.PropsWithChildren & { background: string }> = ({
  children,
  background
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current || !background) {
      return;
    }
    ref.current.setAttribute(
      'style',
      `width:100%;height:100%;background:${background}`
    );
  }, [ref, background]);
  return (
    <Styled.ChildWrap ref={ref} key={React.useId()}>
      {children}
    </Styled.ChildWrap>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ title, data }) => {
  return (
    <Styled.MenuItemWrap>
      <Styled.MenuTitleWrap key={React.useId()}>{title}</Styled.MenuTitleWrap>
      <Styled.ItemContainer>
        {data &&
          Array.from(data, (item, index) => (
            <Styled.Wrap key={React.useId()} animation={item.animationName}>
              <div>
                <BGWrap background={`${colors[sumRandom(COLOR_Length, 0)]}`}>
                  <div>
                    <h1>
                      {`${index + 1}. `}
                      {item.title}
                    </h1>
                    <h2>animation: {item.animationName}</h2>
                  </div>
                </BGWrap>
              </div>
            </Styled.Wrap>
          ))}
      </Styled.ItemContainer>
    </Styled.MenuItemWrap>
  );
};

export const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <Styled.MenuWrap>
      {Array.from(data, item => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          const { children, ...other } = item;
          return <MenuItem key={React.useId()} data={children} {...other} />;
        }
        return (
          <Styled.MenuTitleWrap key={React.useId()}>
            {item.title || '建设中,敬请期待...'}
          </Styled.MenuTitleWrap>
        );
      })}
    </Styled.MenuWrap>
  );
};
