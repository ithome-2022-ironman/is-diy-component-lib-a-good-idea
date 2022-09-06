import React, { ReactHTML } from 'react';

interface Classes {
  wrapper: string;
  child: string;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  classes?: Partial<Classes>;
  renderAs?: keyof ReactHTML;
  disablePadding?: boolean;
}

type BreakPoint = 'md' | 'lg' | 'xl';

export type BreakPoints = Array<{
  scale: BreakPoint;
  width: number;
}>;

export type MediaQuery = {
  [key in BreakPoint]: string;
};
