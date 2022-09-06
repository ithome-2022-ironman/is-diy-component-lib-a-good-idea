import React from 'react';
import type { Property } from 'csstype';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  rippleColor?: Property.BackgroundColor | Property.BackgroundColor[];
  disableRipple?: boolean;
}
