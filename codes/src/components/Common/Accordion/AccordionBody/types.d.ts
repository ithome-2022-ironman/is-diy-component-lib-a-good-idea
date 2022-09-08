import React from 'react';

export interface AccordionBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  children: React.ReactNode;
  accordionBodyClass?: string;
}
