import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children?: React.ReactNode;
  countDown?: number;
  disableAutoClose?: boolean;
  pauseOnHover?: boolean;
  classes?: Partial<ToastClasses>;
  onClose?: () => void;
}

interface ToastClasses {
  toast: string;
  closeButton: string;
}
