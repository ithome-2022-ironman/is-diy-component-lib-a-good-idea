import React, { memo, useRef } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import useElementScrollPercentage from '@Hooks/useElementScrollPercentage';

function useElementIsScrollPercentageDemo(): React.ReactElement {
  /* States */
  const divRef = useRef<HTMLDivElement | null>(null);
  const percentage = useElementScrollPercentage(divRef);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper padding={24}>
        <div
          className={cn(
            css({
              height: '400px',
              border: '1px solid #333',
              overflow: 'auto',
            })
          )}
          ref={divRef}
        >
          <div className={cn(css({ height: '200vh' }))} />
        </div>
      </SpaceWrapper>
      <SpaceWrapper padding={[0, 24]}>
        <React.Fragment>scroll percentage: {percentage}%</React.Fragment>
      </SpaceWrapper>
    </Stack>
  );
}

export default memo(useElementIsScrollPercentageDemo);
