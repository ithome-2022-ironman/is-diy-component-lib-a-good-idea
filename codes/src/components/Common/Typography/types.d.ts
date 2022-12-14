import React, { ReactHTML } from 'react';

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  renderAs?: keyof ReactHTML;
}
