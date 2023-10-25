import * as React from 'react';
import { Styled } from '../styled';

export const MenuItem: React.FC<MenuItemProps> = ({ title, data }) => {
  return (
    <Styled.MenuItemWrap>
      <Styled.MenuTitleWrap key={React.useId()}>{title}</Styled.MenuTitleWrap>
      <Styled.ItemContainer>
        {data &&
          Array.from(data, (item, index) => (
            <Styled.Wrap key={React.useId()} animation={item.animationName}>
              <div>
                <h1>
                  {`${index + 1}. `}
                  {item.title}
                </h1>
                <h2>animation: {item.animationName}</h2>
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
