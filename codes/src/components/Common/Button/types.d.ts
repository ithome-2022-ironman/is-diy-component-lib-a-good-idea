import type { ButtonBaseProps } from '@Components/Base/ButtonBase/types';

export interface ButtonProps extends ButtonBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
}
