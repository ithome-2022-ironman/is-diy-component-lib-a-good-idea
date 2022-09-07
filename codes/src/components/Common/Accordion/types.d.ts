import React from 'react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<AccordionClass>;
}

interface AccordionClass {
  wrapper: string;
  title: string;
  body: string;
}
