import type { Property } from 'csstype';

export interface BadgeProps {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
  badgeColor?: Property.Color;
  badgeBgColor?: Property.Background<string | number>;
}
