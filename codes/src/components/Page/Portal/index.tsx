import React, { memo, useRef, useState } from 'react';
import cn from 'classnames';
import { css } from '@emotion/css';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Button from '@Components/Common/Button';
import Portal from '@Components/Layer/Portal';
import Typography from '@Components/Common/Typography';

const boxStyle = css({
  width: '400px',
  minHeight: '48px',
  display: 'flex',
  alignItems: 'center',
  padding: '24px',
  border: '1px solid #333',
});

function PortalDemo(): React.ReactElement {
  /* States */
  const divRef = useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper margin={24}>
        <Button onClick={() => setMount((prev) => !prev)}>
          {mount ? 'unmount' : 'mount'} through Portal
        </Button>
      </SpaceWrapper>
      <div className={cn(boxStyle)} ref={divRef} />
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
