import React from 'react';

export interface InputCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  iconSvgFill?: Partial<IconSvgFill>;
}

interface IconSvgFill {
  icon: string;
  checkedIcon: string;
}
