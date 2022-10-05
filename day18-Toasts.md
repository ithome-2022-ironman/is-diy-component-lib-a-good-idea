# day18: Toasts

## 成品

[原始碼](https://gist.github.com/tzynwang/9efc4017804d1d148eab086f4ed9208c)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Toasts)

## 開發思路

如果希望畫面上有複數個 `Toast` 同時存在，最大的問題便是如何調整每一個 `Toast` 元件在畫面上的位置。在截稿前想的到的方式是：準備一個陣列來保存 `Toast` 內容，再使用此陣列的資料來將 `Toast` 渲染到畫面上。而 `Toast` 的位置則透過 `transform: translateY(...);` 搭配該 `Toast` 在陣列中的 `index` 來疊加計算。

### 透過陣列來管理 Toast 內容

```tsx
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
    // 每次點下按鈕都會追加一個 Toast 物件
    setToastArray((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        show: true,
        // Toast 元件的內容放在 children 中
        children: <React.Fragment>{prev.length + 1}</React.Fragment>,
        pauseOnHover: true,
      },
    ]);
  }, []);
  const removeToast = useCallback((id: string): void => {
    // 當 Toast 元件的倒數結束時，將該 id 對應的 Toast 元件設定為 show: false
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
```

### Toasts 中的邏輯

```tsx
import React, { memo, useCallback } from 'react';
import { css } from '@emotion/css';
import Portal from '@Components/Layer/Portal';
import Toast from '@Components/Common/Toast';
import type { ToastsProps, ToastArray } from './types';

function Toasts(props: ToastsProps): React.ReactElement {
  /* States */
  const { toasts, onClose } = props;

  /* Functions */
  const calcHeight = useCallback((array: ToastArray, index: number): string => {
    // 白話文：在這個 Toast 之前還有幾個顯示在畫面上的 Toast 元件？取得數量後，再根據此數字來把這個 Toast 往畫面下方推移
    const top = array.slice(0, index).filter((s) => s.show).length;
    return css({
      transform: `translateY(calc(${top * (60 + 24)}px))`,
      transition: 'transform .3s ease-in',
    });
  }, []);
  const closeSingleSnack = useCallback(
    (toastId: string): void => {
      if (onClose) onClose(toastId);
    },
    [onClose]
  );

  /* Main */
  return (
    <Portal>
      <React.Fragment>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            show={toast.show}
            onClose={() => closeSingleSnack(toast.id)}
            classes={{ toast: calcHeight(toasts, index) }}
            countDown={toast.countDown}
            disableAutoClose={toast.disableAutoClose}
            pauseOnHover={toast.pauseOnHover}
          >
            {toast.children}
          </Toast>
        ))}
      </React.Fragment>
    </Portal>
  );
}

export default memo(Toasts);
```

## 修改指南

如果修改了 Toast 元件的預設高度，記得 `calcHeight` 中的 `translateY(calc(${top * (60 + 24)}px))` 數值 60 要一起調整。

另外，每一個 Toast 之間的距離則是前述 `translateY(calc(${top * (60 + 24)}px))` 中的數字 24 。

## 自評

覺得比較可惜的部份是目前還是需要依賴 type `ToastArray` 來建立 `Toasts` 群，使用的自由度沒有辦法像其他元件那麼高。
