import React, { memo } from 'react';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Button from '@Components/Common/Button';
// import Button2 from '@Components/Common/Button2';
import Tooltip from '@Components/Common/Tooltip';
// import Tooltip2 from '@Components/Common/Tooltip2';

function TooltipDemo(): React.ReactElement {
  return (
    <Stack>
      <Stack direction="row">
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="bottom-left">
            <Button>bottom-left</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="bottom">
            <Button>bottom</Button>
          </Tooltip>
          {/* <Tooltip2 tip="tips" position="bottom">
            <Button2>bottom 2</Button2>
          </Tooltip2> */}
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="bottom-right">
            <Button>bottom-right</Button>
          </Tooltip>
        </SpaceWrapper>
      </Stack>
      <Stack direction="row">
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="right-top">
            <Button>right-top</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="right">
            <Button>right</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="right-bottom">
            <Button>right-bottom</Button>
          </Tooltip>
        </SpaceWrapper>
      </Stack>
      <Stack direction="row">
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="top-left">
            <Button>top-left</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="top">
            <Button>top</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="top-right">
            <Button>top-right</Button>
          </Tooltip>
        </SpaceWrapper>
      </Stack>
      <Stack direction="row">
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="left-top">
            <Button>left-top</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="left">
            <Button>left</Button>
          </Tooltip>
        </SpaceWrapper>
        <SpaceWrapper padding={32}>
          <Tooltip tip="tips" position="left-bottom">
            <Button>left-bottom</Button>
          </Tooltip>
        </SpaceWrapper>
      </Stack>
    </Stack>
  );
}

export default memo(TooltipDemo);
