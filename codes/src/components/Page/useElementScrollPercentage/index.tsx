import React, { memo, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import useElementScrollPercentage from '@Hooks/useElementScrollPercentage';

function useElementIsScrollPercentageDemo(): React.ReactElement {
  /* States */
  const [div, setDiv] = useState<HTMLDivElement | null>(null);
  const percentage = useElementScrollPercentage(div);

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
          ref={(node) => setDiv(node)}
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
