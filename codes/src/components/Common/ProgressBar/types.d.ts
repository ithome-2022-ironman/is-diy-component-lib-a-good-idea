import type { Property } from 'csstype';

export interface ProgressBarProps {
  percentage: number;
  height?: number;
  width?:
    | (string | (string & {}))[]
    | Property.Width<string | number>
    | NonNullable<Property.Width<string | number> | undefined>[];
  color?:
    | (string | (string & {}))[]
    | Property.Background<string | number>
    | NonNullable<Property.Background<string | number> | undefined>[];
  bgColor?:
    | (string | (string & {}))[]
    | Property.Background<string | number>
    | NonNullable<Property.Background<string | number> | undefined>[];
  classes?: Partial<ProgressBarClasses>;
  barRounded?: boolean;
}

interface ProgressBarClasses {
  bar: string;
  barBackground: string;
}
