import React from 'react';

export interface InputSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  classes?: Partial<InputSwitchClasses>;
}

interface InputSwitchClasses {
  label: string;
  inputButton: string;
  track: string;
}
