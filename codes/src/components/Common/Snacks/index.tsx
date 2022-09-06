import React, { memo, useCallback } from 'react';
import { css } from '@emotion/css';
import Portal from '@Components/Layer/Portal';
import Snack from '@Components/Common/Snack';
import type { SnacksProps, Snacks } from './types';

function SnackMultiple(props: SnacksProps): React.ReactElement {
  /* States */
  const { snacks, onClose } = props;

  /* Functions */
  const calcHeight = useCallback((array: Snacks, index: number): string => {
    const top = array.slice(0, index).filter((s) => s.show).length;
    return css({
      transform: `translateY(calc(${top * (60 + 24)}px))`,
      transition: 'transform .3s ease-in',
    });
  }, []);
  const closeSingleSnack = useCallback(
    (snackId: unknown): void => {
      if (onClose) {
        onClose(snackId);
      }
    },
    [onClose]
  );

  /* Main */
  return (
    <Portal>
      <React.Fragment>
        {snacks.map((snack, index) => (
          <Snack
            key={snack.id}
            show={snack.show}
            onClose={() => closeSingleSnack(snack.id)}
            classes={{ snack: calcHeight(snacks, index) }}
            countDown={snack.countDown}
            disableAutoClose={snack.disableAutoClose}
            pauseOnHover={snack.pauseOnHover}
          >
            {snack.children}
          </Snack>
        ))}
      </React.Fragment>
    </Portal>
  );
}

export default memo(SnackMultiple);
