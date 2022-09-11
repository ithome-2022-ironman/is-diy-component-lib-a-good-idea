import React, { memo, useCallback, useState } from 'react';
import Toasts from '@Components/Common/Toasts';
import Button from '@Components/Common/Button';
import type { ToastArray } from '@Components/Common/Toasts/types';

function ToastsDemo(): React.ReactElement {
  /* States */
  const [toastArray, setToastArray] = useState<ToastArray>([]);

  /* Functions */
  const addToast = useCallback((): void => {
    setToastArray((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        show: true,
        children: <React.Fragment>{prev.length + 1}</React.Fragment>,
      },
    ]);
  }, []);
  const removeToast = useCallback((id: unknown) => {
    const newId = id as string;
    setToastArray((prev) => prev.filter((toast) => toast.id !== newId));
  }, []);

  /* Main */
  return (
    <React.Fragment>
      <Button onClick={addToast}>add snack</Button>
      <Toasts toasts={toastArray} onClose={removeToast} />
    </React.Fragment>
  );
}

export default memo(ToastsDemo);
