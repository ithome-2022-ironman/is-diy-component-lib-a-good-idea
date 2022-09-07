import React from 'react';
import type { ButtonProps } from '@Components/Common/Button/types';

export interface UploadButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
