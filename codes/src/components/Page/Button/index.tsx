import React, { memo } from 'react';
import Stack from '@Components/Layout/Stack';
import Button from '@Components/Common/Button';
import Button2 from '@Components/Common/Button2';

function ButtonDemo(): React.ReactElement {
  return (
    <Stack>
      <Stack direction="row">
        <Button>contained</Button>
        <Button disabled>contained</Button>
        <Button2>button 2</Button2>
      </Stack>
      <Stack direction="row">
        <Button variant="outlined">outlined</Button>
        <Button variant="outlined" disabled>
          outlined
        </Button>
      </Stack>
      <Stack direction="row">
        <Button variant="text" rippleColor="rgba(214, 51, 132, .4)">
          text
        </Button>
        <Button variant="text" disabled>
          text
        </Button>
      </Stack>
    </Stack>
  );
}

export default memo(ButtonDemo);
