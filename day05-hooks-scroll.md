# day05: useElementIsScrollDown, useElementScrollPercentage

想讓 hooks 能夠對應 window 以外的捲動對象，今天來做點加工處理。

## 成品

- [useElementIsScrollDown](https://tzynwang.github.io/ithome-2022-demo/#/useElementIsScrollDown)
- [useElementScrollPercentage](https://tzynwang.github.io/ithome-2022-demo/#/useElementScrollPercentage)
- [原始碼](https://gist.github.com/tzynwang/cc5bd3c9969dc4420fee88d11db987e8)

## 開發思路

將原本寫死的監聽器對象改為透過 hook 參數傳進來即可。

另外在截稿前查詢到元件的 `ref` props 在傳入 callback function 時，該 function 的參數會是元件實例或 HTML DOM 物件（The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.），所以也可以寫成：

```tsx
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export default function useElementScrollPercentage<T extends Element>(
  element: T | null, // 直接傳入監聽器對象
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
          // 透過 ref callback 保存 div
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

## 自評

實作上不難，但截稿前沒有實作出單一 hook 兼顧 window 與 HTML DOM 物件的捲動監聽有點可惜 (´・ω・`)

## 參考資料

- [React Official: Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
