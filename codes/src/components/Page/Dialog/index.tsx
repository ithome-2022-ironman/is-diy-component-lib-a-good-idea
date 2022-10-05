import React, { memo, useState } from 'react';
import Button from '@Components/Common/Button';
import Dialog from '@Components/Common/Dialog';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';

function DialogDemo(): React.ReactElement {
  /* States */
  const [open, setOpen] = useState<boolean>(false);

  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Button onClick={() => setOpen(true)}>open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div>dialog content</div>
      </Dialog>
    </SpaceWrapper>
  );
}

export default memo(DialogDemo);
