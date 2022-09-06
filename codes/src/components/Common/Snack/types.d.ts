import React from 'react';

export interface SnackProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children?: React.ReactNode;
  countDown?: number;
  disableAutoClose?: boolean;
  pauseOnHover?: boolean;
  classes?: Partial<SnackClasses>;
  onClose?: () => void;
}

interface SnackClasses {
  snack: string;
  closeButton: string;
}
