import React from 'react';

export interface TabsProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  dataArray: Array<TabsData<T>>;
  classes?: Partial<TabsClass>;
}

export interface TabsData<T> {
  id: T;
  tab: React.ReactNode;
  content: React.ReactNode;
}

export interface CurrentTab<T> {
  id: T;
  index: number;
}

interface TabsClass {
  wrapper: string;
  tab: string;
  currentTab: string;
  content: string;
}
