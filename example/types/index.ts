interface AnimateStylesItem<T> {
  animationName?: string;
  title: string;
  children?: T[];
  data?: T[];
}

type AnimateStyles = AnimateStylesItem<AnimateStyles>;

type MenuItemProps = Omit<AnimateStyles, 'children'>;
type MenuProps = { data: AnimateStyles[] };
