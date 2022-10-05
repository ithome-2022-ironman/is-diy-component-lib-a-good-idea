import type React from 'react';
import type { Property } from 'csstype';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  color?: Property.Background;
  gradientColor?: boolean;
  thick?: number;
  dividerStyle?: Property.BorderBottomStyle;
  labelStyle?: string;
  labelAlign?:
    | Property.TextAlign
    | NonNullable<Property.TextAlign | undefined>[]
    | Property.TextAlign[];
}

export type { Property };
