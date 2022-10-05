import type { ButtonBaseProps } from '@Components/Base/ButtonBaseInputLabel/types';
import React from 'react';

export interface ButtonProps extends ButtonBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
