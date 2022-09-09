import React, { memo, useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { css } from '@emotion/css';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Button from '@Components/Common/Button';
import Portal from '@Components/Layer/Portal';
import Typography from '@Components/Common/Typography';

function PortalDemo(): React.ReactElement {
  /* States */
  const divRef = useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  /* Functions */
  const mountParagraph = useCallback((): void => {
    setMount((prev) => !prev);
  }, []);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper margin={24}>
        <Button onClick={mountParagraph}>
          {mount ? 'unmount' : 'mount'} through Portal
        </Button>
      </SpaceWrapper>
      <SpaceWrapper margin={24}>
        <div
          className={cn(
            css({
              minHeight: '48px',
              maxWidth: '400px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #333',
            })
          )}
          ref={divRef}
        />
      </SpaceWrapper>
      {mount && divRef.current && (
        <Portal container={divRef.current}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            dignissimos modi, hic odio similique quod odit blanditiis dolor iure
            laboriosam maiores ut pariatur rerum impedit vel omnis perferendis
            veritatis alias!
          </Typography>
        </Portal>
      )}
    </Stack>
  );
}

export default memo(PortalDemo);
