import React, { memo } from 'react';
// import { PhotoCameraIcon } from '@Assets/icons';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Button from '@Components/Common/Button';
import Divider from '@Components/Common/Divider';
// import Button2 from '@Components/Common/Button2';

function ButtonDemo(): React.ReactElement {
  return (
    <SpaceWrapper padding={24}>
      <Stack divider={<Divider />}>
        <Stack direction="row">
          <Button>contained</Button>
          <Button disabled>contained</Button>
          {/* <Button2>button 2</Button2> */}
        </Stack>
        <Stack direction="row">
          <Button variant="outlined">outlined</Button>
          <Button variant="outlined" disabled>
            outlined
          </Button>
        </Stack>
        <Stack direction="row">
          <Button variant="text" rippleColor="rgba(0, 150, 136, .4)">
            text
          </Button>
          <Button variant="text" disabled>
            text
          </Button>
        </Stack>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(ButtonDemo);
