import React from 'react';

export default function mergeRef<T>(
  refs: Array<React.MutableRefObject<T> | React.ForwardedRef<T>>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}
