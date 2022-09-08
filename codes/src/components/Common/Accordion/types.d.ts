import React from 'react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open?: boolean;
  classes?: Partial<AccordionClass>;
}

interface AccordionClass {
  wrapper: string;
  title: string;
  body: string;
}
