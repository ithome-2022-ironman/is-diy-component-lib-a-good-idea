import React, { memo, useCallback, useState } from 'react';
import Button from '@Components/Common/Button';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Toasts from '@Components/Common/Toasts';
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
        // disableAutoClose: true,
        pauseOnHover: true,
      },
    ]);
  }, []);
  const removeToast = useCallback((id: string): void => {
    setToastArray((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, show: !toast.show } : toast
      )
    );
  }, []);

  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Button onClick={addToast}>add snack</Button>
      <Toasts toasts={toastArray} onClose={removeToast} />
    </SpaceWrapper>
  );
}

export default memo(ToastsDemo);
