import * as React from 'react';
import { styled, css } from 'styled-components';
// import { ElementInViewport } from '../../src';
import { ElementInViewport } from 'react-element-in-viewport';
export namespace Styled {
  export const Container = styled('main')`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    @media (min-width: 640px) {
      & {
        max-width: 640px;
      }
    }

    @media (min-width: 768px) {
      & {
        max-width: 768px;
      }
    }

    @media (min-width: 1024px) {
      & {
        max-width: 1024px;
      }
    }

    @media (min-width: 1280px) {
      & {
        max-width: 1280px;
      }
    }

    @media (min-width: 1536px) {
      & {
        max-width: 1536px;
      }
    }
  `;
  export const Header = styled('header')`
    display: flex;
    align-items: center;
    padding: var(--navbar-padding, 0.5rem);
    min-height: 4rem;
    width: 100%;
  `;

  export const ChildWrap = styled('main')`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-shadow: 1px 1px 1px #fff;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;
  export const ItemContainer = styled('div')`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  `;

  export const Wrap = styled(ElementInViewport)<{ colorIndex?: number }>`
    height: calc(100vw / 3);
    width: auto;
    flex: 1;
    flex-basis: calc(100% / 3 - 30px);
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
  export const MenuWrap = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 50px;
  `;
  export const MenuTitleWrap = styled('div')`
    font-size: 26px;
    color: red;
  `;
}
