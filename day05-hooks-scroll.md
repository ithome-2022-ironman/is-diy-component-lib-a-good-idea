# day05: useElementIsScrollDown, useElementScrollPercentage

想讓 hooks 能夠對應 window 以外的捲動對象，今天來做點加工處理。

## 開發思路

將原本寫死的監聽器貼附物件改為透過 hook 參數傳進來即可。

另外在截稿前查詢到元件的 `ref` props 在傳入 callback function 時，該 function 的參數會是元件實例，所以也可以寫成：

```ts
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export default function useElementScrollPercentage<T extends Element>(
  element: T | null,
  delay: number = 100
): number {
  /* States */
  const [percentage, setPercentage] = useState<number>(0);

  /* Functions */
  const calculatePercentage = useCallback((e: Event): void => {
    const target = e.target as Element;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setPercentage(Math.round(percent));
  }, []);
  const debouncedCalcPercentage = debounce(calculatePercentage, delay);

  /* Hooks */
  useEffect(() => {
    element?.addEventListener('scroll', debouncedCalcPercentage);
    return () =>
      element?.removeEventListener('scroll', debouncedCalcPercentage);
  }, [element, debouncedCalcPercentage]);

  /* Main */
  return percentage;
}
```

```tsx
import React, { memo, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import useElementScrollPercentage from '@Hooks/useElementScrollPercentage';

function useElementIsScrollPercentageDemo(): React.ReactElement {
  /* States */
  const [div, setDiv] = useState<HTMLDivElement | null>(null);
  const percentage = useElementScrollPercentage(div);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper padding={24}>
        <div
          className={cn(
            css({
              height: '400px',
              border: '1px solid #333',
              overflow: 'auto',
            })
          )}
          ref={(node) => setDiv(node)}
        >
          <div className={cn(css({ height: '200vh' }))} />
        </div>
      </SpaceWrapper>
      <SpaceWrapper padding={[0, 24]}>
        <React.Fragment>scroll percentage: {percentage}%</React.Fragment>
      </SpaceWrapper>
    </Stack>
  );
}

export default memo(useElementIsScrollPercentageDemo);
```

## 修改指南

`useElementScrollPercentage` 有使用 `Math.round` 來處理百分比計算結果，如果不希望在 hook 中處理四捨五入的話可以移除掉。

## 自評

不難，真的可以自己寫。
