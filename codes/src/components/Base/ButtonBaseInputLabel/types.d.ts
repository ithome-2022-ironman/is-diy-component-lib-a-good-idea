import React from 'react';
import type { Property } from 'csstype';

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLLabelElement> {
  children?: React.ReactNode;
  rippleColor?: Property.BackgroundColor | Property.BackgroundColor[];
  disableRipple?: boolean;
  renderAs?: 'button' | 'label';
}
