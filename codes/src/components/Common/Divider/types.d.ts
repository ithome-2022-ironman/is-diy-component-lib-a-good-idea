import type { Property } from 'csstype';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  color?: Property.Background;
  thick?: Property.Height | Property.Width;
}

export type { Property };
