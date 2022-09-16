import React from 'react';
import type { Property } from 'csstype';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: Property.Gap;
  direction?: 'row' | 'column';
  justifyContent?:
    | string[]
    | Property.JustifyContent
    | Property.JustifyContent[];
  alignItems?: string[] | Property.AlignItems | Property.AlignItems[];
  divider?: React.ReactElement;
}
