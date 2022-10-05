import React, { memo } from 'react';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Button2 from '@Components/Common/Button2';
import Tooltip2 from '@Components/Common/Tooltip2';

function TooltipDemo(): React.ReactElement {
  return (
    <SpaceWrapper padding={24}>
      <Tooltip2 tip="tips" position="bottom">
        <Button2>button with mergeRef</Button2>
      </Tooltip2>
    </SpaceWrapper>
  );
}

export default memo(TooltipDemo);
