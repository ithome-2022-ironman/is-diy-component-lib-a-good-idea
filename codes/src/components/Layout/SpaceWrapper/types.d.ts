import React from 'react';

export interface SpaceWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  margin?: Space;
  padding?: Space;
}

type SpaceType = 'margin' | 'padding';

type Space = number | number[];

export type GetSpaceResult = Partial<{
  [key in SpaceType]: string;
}>;

export interface GetSpaceArgs {
  type: SpaceType;
  space: Space | undefined;
}
