import React, { memo, useState } from 'react';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Toast from '@Components/Common/Toast';
import Button from '@Components/Common/Button';

function ToastDemo(): React.ReactElement {
  /* States */
  const [show, setShow] = useState<boolean>(false);
  const [showPause, setShowPause] = useState<boolean>(false);

  /* Main */
  return (
    <SpaceWrapper padding={[96, 24, 0]}>
      <Stack direction="row">
        <Button onClick={() => setShow(true)}>show toast</Button>
        <Button onClick={() => setShowPause(true)}>show pausable toast</Button>
      </Stack>
      <Toast show={show} onClose={() => setShow(false)}>
        <span>here's a toast</span>
      </Toast>
      <Toast show={showPause} onClose={() => setShowPause(false)} pauseOnHover>
        <span>hover me to pause</span>
      </Toast>
    </SpaceWrapper>
  );
}

export default memo(ToastDemo);
