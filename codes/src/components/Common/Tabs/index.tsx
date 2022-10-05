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
          background: 'linear-gradient(to left, #3f87a6, #f69d3c)',
          transform: getTranslateX(currentTab.index),
          transition: 'transform .3s ease',
        },
      }),
    [tabsCount, getTranslateX, currentTab.index]
  );

  /* Main */
  return (
    <div className={cn(classes.wrapper)} {...rest}>
      {/* tabs */}
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
      <div className={cn(currentTabStyle, classes.currentTab)} />
      {/* contents */}
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
