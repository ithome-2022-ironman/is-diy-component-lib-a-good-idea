import type { Property } from 'csstype';

export interface ProgressBarProps {
  height?: number;
  bg?: (string | (string & {}))[] | Property.Background<string | number>;
}
