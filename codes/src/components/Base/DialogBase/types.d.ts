import React from 'react';

export interface DialogBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  disableCloseByBackdropClick?: boolean;
  disableCloseByKeyPress?: boolean;
  overwriteEscapeKey?: string;
  classes?: Partial<DialogBaseClasses>;
}

interface DialogBaseClasses {
  dialog: string;
  backdrop: string;
  dialogUnmountedAnimation: string;
  backdropUnmountedAnimation: string;
}

export type DialogBackdropBaseProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<
    DialogBaseProps,
    | 'children'
    | 'onClose'
    | 'disableCloseByBackdropClick'
    | 'disableCloseByKeyPress'
    | 'overwriteEscapeKey'
  >;
