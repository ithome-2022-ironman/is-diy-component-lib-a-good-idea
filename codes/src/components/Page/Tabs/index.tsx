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
