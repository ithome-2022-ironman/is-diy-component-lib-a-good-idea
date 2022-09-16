import React, { memo, useRef } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import useElementIsScrollDown from '@Hooks/useElementIsScrollDown';

const boxWrapper = css({
  height: '400px',
  border: '1px solid #333',
  overflow: 'auto',
});
const boxLong = css({ height: '200vh' });

function useElementIsScrollDownDemo(): React.ReactElement {
  /* States */
  const divRef = useRef<HTMLDivElement | null>(null);
  const isDown = useElementIsScrollDown(divRef);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper padding={24} className={cn(css({ width: '100%' }))}>
        <div className={cn(boxWrapper)} ref={divRef}>
          <div className={cn(boxLong)} />
        </div>
      </SpaceWrapper>
      <SpaceWrapper padding={[0, 24]}>
        <React.Fragment>
          is scrolling down: {isDown ? 'true' : 'false'}
        </React.Fragment>
      </SpaceWrapper>
    </Stack>
  );
}

export default memo(useElementIsScrollDownDemo);
