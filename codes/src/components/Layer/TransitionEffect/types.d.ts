import React from 'react';

export interface TransitionEffectProps {
  mount: boolean;
  children: React.ReactNode;
  effect?: 'fade' | 'scale';
  portal?: Element;
}
