import React, { memo } from 'react';
import Stack from '@Components/Layout/Stack';
import Button from '@Components/Common/Button';

function Day10(): React.ReactElement {
  return (
    <React.Fragment>
      <Stack direction="row">
        <Button>contained</Button>
        <Button disabled>contained</Button>
      </Stack>
      <Stack>
        <Button variant="outlined">outlined</Button>
        <Button variant="outlined" disabled>
          outlined
        </Button>
      </Stack>
      <Stack>
        <Button variant="text" rippleColor="rgba(214, 51, 132, .4)">
          text
        </Button>
        <Button variant="text" disabled>
          text
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export default memo(Day10);
