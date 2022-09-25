import type { DialogBaseProps } from '@Components/Base/DialogBase/types';

export interface DrawerProps extends DialogBaseProps {
  direction?: 'bottom' | 'left' | 'right' | 'top';
}
