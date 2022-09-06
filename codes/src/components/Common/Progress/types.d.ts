import type { Property } from 'csstype';

export interface ProgressProps {
  height?: number;
  bg?: (string | (string & {}))[] | Property.Background<string | number>;
}
