# day19: Tabs

## 成品

[原始碼](https://gist.github.com/tzynwang/26d6bc202b458b01628d8c965ad761ae)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Tabs)

## 開發思路

原理十分簡單：透過資料的 `id` 來控制顯示內容，再根據被點擊的標籤的順序（`index`）來計算標籤下方提示線的顯示位置。

先來看看 Tabs 元件的使用方式：

```tsx
import React, { memo } from 'react';
import { css } from '@emotion/css';
import Tabs from '@Components/Common/Tabs';
import type { TabsData } from '@Components/Common/Tabs/types';

function TabsDemo(): React.ReactElement {
  /* States */
  const dataArray: Array<TabsData<number>> = [
    { id: 0, tab: '標籤 1', content: '內容 1' },
    { id: 1, tab: '標籤 2', content: '內容 2' },
    { id: 2, tab: '標籤 3', content: '內容 3' },
    { id: 3, tab: '標籤 4', content: '內容 4' },
    { id: 4, tab: '標籤 5', content: '內容 5' },
  ];

  /* Main */
  return (
    <Tabs
      dataArray={dataArray}
      classes={{ content: css({ padding: '16px' }) }}
    />
  );
}

export default memo(TabsDemo);
```

`dataArray` 中的每一個物件都會有 `id`、`tab` 與 `content` 這三個鍵值。

而被 `Tabs` 元件打包起來的邏輯則是：在使用者點擊標籤時透過 `setNewCurrentTab` 記錄該標籤的 `id`，而標籤按鈕下方的內容區塊會根據當前 `id` 來隱藏「與當前 `id` 不同的內容」。

記錄 `currentTab.index` 則是為了協助計算提示線的 `translateX` 數值。

```tsx
import React, { memo, createRef, useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Button from '@Components/Base/ButtonBase';
import type { TabsProps, CurrentTab } from './types';

const tabsContainer = css({
  display: 'flex',
  alignItems: 'center',
});
const hide = css({
  display: 'none',
});
const tabHighlight = css({
  color: '#f69d3c',
  backgroundImage: 'linear-gradient(to left, #3f87a6, #f69d3c)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

function Tabs<T>(props: TabsProps<T>): React.ReactElement {
  /* States */
  const {
    dataArray,
    classes = { wrapper: '', tab: '', currentTab: '', content: '' },
    ...rest
  } = props;
  delete rest.className;
  const tabsRef = createRef<HTMLDivElement>();
  const tabsCount = useMemo(() => dataArray.length, [dataArray]);
  const tabsWrapperWidth = useMemo(
    () => (tabsRef.current ? tabsRef.current.clientWidth : 0),
    [tabsRef]
  );
  const [currentTab, setCurrentTab] = useState<CurrentTab<T>>({
    id: dataArray[0].id,
    index: 0,
  });

  /* Functions */
  const setNewCurrentTab = (newTabId: T, index: number) => () => {
    setCurrentTab({ id: newTabId, index });
  };
  const getTranslateX = useCallback((index: number): string => {
    if (index > 0) {
      return `translateX(${100 * index}%)`;
    }
    return `translateX(0px)`;
  }, []);

  /* Views */
  const tabBase = useMemo(
    () =>
      css({
        flex: `${tabsWrapperWidth / tabsCount}px`,
        position: 'relative',
        minHeight: '48px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: 'inherit',
        transition: 'all .2s ease',
      }),
    [tabsWrapperWidth, tabsCount]
  );
  const currentTabStyle = useMemo(
    // 原理是透過偽元素搭配 transform 來將線條推到「被點擊的標籤」下方
    () =>
      css({
        width: '100%',
        height: '2px',
        position: 'relative',
        '&::before': {
          content: '""',
          width: `${Math.round(100 / tabsCount)}%`,
          height: '100%',
          position: 'absolute',
          background: 'linear-gradient(to left, #3f87a6, #f69d3c);',
          transform: getTranslateX(currentTab.index),
          transition: 'transform .3s ease',
        },
      }),
    [tabsCount, getTranslateX, currentTab.index]
  );

  /* Main */
  return (
    <div className={cn(classes.wrapper)} {...rest}>
      {/* 標籤 */}
      <div className={cn(tabsContainer)} ref={tabsRef}>
        {dataArray.map((d, index) => (
          <Button
            key={index}
            className={cn(
              tabBase,
              currentTab.id === d.id && tabHighlight,
              classes.tab
            )}
            onClick={setNewCurrentTab(d.id, index)}
          >
            {d.tab}
          </Button>
        ))}
      </div>
      {/* 最後被點擊的標籤的提示線 */}
      <div className={cn(currentTabStyle, classes.currentTab)} />
      {/* 標籤內容 */}
      <div>
        {dataArray.map((d, index) => (
          <div
            key={index}
            className={cn(currentTab.id !== d.id && hide, classes.content)}
          >
            {d.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Tabs);
```

## 修改指南

標籤提示線的樣式在 `currentTabStyle` 中：

```ts
const currentTabStyle = useMemo(
  () =>
    css({
      width: '100%',
      height: '2px', // 提示線高度
      position: 'relative',
      '&::before': {
        content: '""',
        width: `${Math.round(100 / tabsCount)}%`,
        height: '100%',
        position: 'absolute',
        background: '#4e342e', // 提示線顏色，可直接替換為 linear-gradient() 做出漸層效果
        transform: getTranslateX(currentTab.index),
        transition: 'transform .3s ease',
      },
    }),
  [tabsCount, getTranslateX, currentTab.index]
);
```

## 自評

單純做出水平方向的 Tabs 組不難。~~MUI Tabs 有支援垂直排列的版本，截稿前沒趕上~~ O<=
