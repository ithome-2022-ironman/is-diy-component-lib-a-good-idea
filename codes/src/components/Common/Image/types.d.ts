import type { Property } from 'csstype';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: Property.Width;
  height?: Property.Height;
  objectFit?: Property.ObjectFit;
  caption?: string;
  classes?: Partial<ImageClasses>;
}

interface ImageClasses {
  figure: string;
  img: string;
  caption: string;
}
