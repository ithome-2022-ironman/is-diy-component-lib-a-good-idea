import React from 'react';

export interface ToolTipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  tip: React.ReactNode;
  gap?: number;
  position?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom';
}
