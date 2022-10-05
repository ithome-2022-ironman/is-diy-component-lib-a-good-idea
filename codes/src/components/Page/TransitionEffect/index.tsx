import React, { memo, useState, useCallback } from 'react';
import cn from 'classnames';
import { css } from '@emotion/css';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Button from '@Components/Common/Button';
import TransitionEffect from '@Components/Layer/TransitionEffect';

const cardStyle = css({
  width: '72px',
  height: '72px',
  display: 'inline-flex',
  borderRadius: '8px',
  backgroundColor: '#eee',
  boxShadow: '1px 1px 4px 1px rgba(0,0,0,0.2)',
});
const fixedCardStyle = css({ position: 'fixed', top: '24px', right: '24px' });

function TransitionEffectDemo(): React.ReactElement {
  /* States */
  const [fade, setFade] = useState<boolean>(false);
  const [scale, setScale] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(false);

  /* Functions */
  const fadeBox = useCallback((): void => {
    setFade((prev) => !prev);
  }, []);
  const scaleBox = useCallback((): void => {
    setScale((prev) => !prev);
  }, []);
  const collapseBox = useCallback((): void => {
    setCollapse((prev) => !prev);
  }, []);

  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Stack>
        <SpaceWrapper>
          <Button onClick={fadeBox}>fade</Button>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <TransitionEffect mount={fade} effect="fade">
            <div className={cn(cardStyle)} />
          </TransitionEffect>
        </SpaceWrapper>
        <SpaceWrapper>
          <Button onClick={scaleBox}>scale</Button>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <TransitionEffect mount={scale} effect="scale" portal={document.body}>
            <div className={cn(cardStyle, fixedCardStyle)} />
          </TransitionEffect>
        </SpaceWrapper>
        <SpaceWrapper>
          <Button onClick={collapseBox}>collapse</Button>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <TransitionEffect mount={collapse} effect="collapse">
            <div className={cn(cardStyle)} />
          </TransitionEffect>
        </SpaceWrapper>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(TransitionEffectDemo);
