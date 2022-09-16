import React, { memo, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import ProgressBar from '@Components/Common/ProgressBar';
import useElementScrollPercentage2 from '@Hooks/useElementScrollPercentage2';

const perspectiveLayer = css({
  perspective: '99999px',
});
const fixedTop = css({
  position: 'fixed',
  top: 0,
  left: 0,
});
const boxWrapper = css({
  height: '400px',
  border: '1px solid #333',
  overflow: 'auto',
});
const boxLong = css({ height: '200vh' });

function useElementIsScrollPercentageDemo(): React.ReactElement {
  /* States */
  const [div, setDiv] = useState<HTMLDivElement | null>(null);
  const percentage = useElementScrollPercentage2(div);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper padding={24} className={cn(css({ width: '100%' }))}>
        <div className={cn(perspectiveLayer)}>
          <ProgressBar
            percentage={percentage}
            classes={{ bar: fixedTop, barBackground: fixedTop }}
          />
        </div>
        <div className={cn(boxWrapper)} ref={(node) => setDiv(node)}>
          <div className={cn(boxLong)} />
        </div>
      </SpaceWrapper>
      <SpaceWrapper padding={[0, 24]}>
        <React.Fragment>scroll percentage: {percentage}%</React.Fragment>
      </SpaceWrapper>
    </Stack>
  );
}

export default memo(useElementIsScrollPercentageDemo);
