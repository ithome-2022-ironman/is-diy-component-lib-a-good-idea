import React, { memo, useState } from 'react';
import Toast from '@Components/Common/Toast';
import Button from '@Components/Common/Button';

function ToastDemo(): React.ReactElement {
  /* States */
  const [show, setShow] = useState<boolean>(false);

  /* Main */
  return (
    <React.Fragment>
      <Button onClick={() => setShow(true)}>show toast</Button>
      <Toast show={show} onClose={() => setShow(false)}>
        <span>here's a toast</span>
      </Toast>
    </React.Fragment>
  );
}

export default memo(ToastDemo);
