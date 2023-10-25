import * as React from 'react';
import { styled } from 'styled-components';
// import { ElementInViewport } from '../../src';
import { ElementInViewport } from 'react-element-in-viewport';

export namespace Styled {
  export const Container = styled('main')`
    width: 100%;
  `;
  export const ItemContainer = styled('div')`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  `;

  export const Wrap = styled(ElementInViewport)`
    height: calc(100vw / 3);
    width: auto;
    flex: 1;
    flex-basis: calc(100% / 3 - 30px);
    background: linear-gradient(
      90deg,
      rgb(149, 72, 228) 23.77%,
      rgb(94, 46, 195) 55.84%,
      rgb(58, 36, 199) 80.29%,
      rgb(46, 66, 213) 106.49%,
      rgb(53, 105, 251) 106.81%
    );
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  export const MenuItemWrap = styled('div')`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  `;
  export const MenuWrap = styled('div')``;
  export const MenuTitleWrap = styled('div')`
    font-size: 26px;
    color: red;
  `;
}
