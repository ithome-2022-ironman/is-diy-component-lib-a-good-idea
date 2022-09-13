import type React from 'react';
import type { Property } from 'csstype';

export interface ImageBaseProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: Property.Width;
  height?: Property.Height;
  objectFit?: Property.ObjectFit;
  caption?: React.ReactNode;
  classes?: Partial<ImageClasses>;
  imageOnly?: boolean;
}

interface ImageClasses {
  figure: string;
  img: string;
  caption: string;
  onError: string;
}
