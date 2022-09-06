import type { SnackProps } from '@Components/Common/Snack/types';

export interface SnacksProps {
  snacks: Snacks;
  onClose?: (id: unknown) => void;
}

export type Snacks = Array<SnacksBase>;

type SnacksBase = Pick<
  SnackProps,
  | 'children'
  | 'show'
  | 'countDown'
  | 'disableAutoClose'
  | 'pauseOnHover'
  | 'classes'
> & {
  id: string;
};
