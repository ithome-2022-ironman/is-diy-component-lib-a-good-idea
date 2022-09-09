import React, { memo, useState } from 'react';
import Button from '@Components/Common/Button';
import Dialog from '@Components/Common/Dialog';

function DialogDemo(): React.ReactElement {
  /* States */
  const [open, setOpen] = useState<boolean>(false);

  /* Main */
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div>dialog content</div>
      </Dialog>
    </React.Fragment>
  );
}

export default memo(DialogDemo);
