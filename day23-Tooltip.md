# day23: Tooltip

要處理兩件事情：

- `Tooltip` 會透過 `Portal` 掛載到 `document.body` 下，避免 `ToolTip` 被其他親節點的 CSS 影響而無法正常顯示
- 呈上，因為 `Tooltip` 另起爐灶，故無法使用 `position: relative` 搭配 `position: absolute` 這種簡便的方式來設定 `tip` 與 child node 的相對位置。所以當滑鼠 hover 過 child node 時，需要取得 hover target 在畫面上的位置，進而計算 `tip` 應該被放在哪一個座標上

## 成品

[原始碼](https://gist.github.com/tzynwang/d91fcb92db6cbe0f7666ca0d829e50f4)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Tooltip)

## 開發思路

### Tooltip 位置

首先取得要被貼附 Tooltip 的元件座標與尺寸。實作方式是：在 children 掛載上畫面後，透過 `childRef.current` 與 `getBoundingClientRect()` 取得元件上右下左四個點的數值。

```tsx
const getChildPosition = useCallback((): void => {
  if (childRef.current) {
    const { top, right, bottom, left } =
      childRef.current.children[0].getBoundingClientRect();
    setChildPosition({ top, right, bottom, left });
  }
}, [childRef]);

useEffect(() => {
  getChildPosition();
}, [getChildPosition]);

<span
  onMouseOver={() => setShow(true)}
  onMouseOut={() => setShow(false)}
  ref={childRef}
>
  {children}
</span>;
```

然後就可以開始算數學了 d( ･∀･)b

以 `props.position = 'bottom'` 來說，Tooltip 要放在 children 正下方的位置。所以當我們有了 children 的座標後，可以根據座標數值設定 Tooltip 的位置為：

```ts
case 'bottom':
  return css({
    // Tooltip 要距離 children bottom 再加上 gap 的數值
    top: `${childPosition.bottom + gap}px`,
    // Tooltip 要在 children 下方置中，故先從左邊推移 children left + right 除以 2 的數值
    left: `${(childPosition.left + childPosition.right) / 2}px`,
    // 最後再靠 translateX(-50%) 把 Tooltip 置中
    transform: 'translateX(-50%)',
  });
```

其餘的方位計算基本上也只是調整渲染 `Tooltip` 的起始點與垂直（或水平）位移數值而已。

### arrow

這部份在參考了先進的文章 [30 天擁有一套自己手刻的 React UI 元件庫系列 第 12 篇 數據展示元件 - Tooltip](https://ithelp.ithome.com.tw/articles/10272024) 後，決定採用類似 Ant Design 的設計方式：先做出一個三角形的容器，再搭配 CSS `overflow: hidden` 與 `transform: rotate(45deg)` 來繪製三角形。

採用上述的方式來實作三角形的好處是，透過 `overflow: hidden` 確實隱藏多餘的部份後，可將 `Tooltip` 元件設定為有透明度的背景。使用 MUI 流（設定一個正方形 `span` 元件並搭配 `rotate` 旋轉 45 度）來做出三角形的話，因為沒有 `overflow: hidden` 來隱藏三角形與 `Tooltip` 重疊的部份，當背景色帶有透明度設定時，重疊的部份會造成背景色不正確。

原理解釋完畢，現在來看看實作部分。先透過 `baseArrowStyle` 設定三角形容器本身的尺寸（長寬 `8px`），再透過 `position: absolute` 來配合 `Tooltip` 進行定位。

```ts
const baseArrowStyle = css({
  width: '8px',
  height: '8px',
  position: 'absolute',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(113, 92, 87, .7)',
    transform: 'rotate(45deg)',
  },
});
```

以 `props.position = 'bottom'` 為例，三角形要出現在 `Tooltip` 上方正中央的位置，故使用 `top: -8px; left: 50%; transform: translateX(-50%)` 處理三角形容器的定位後，再透過 `&::after top: 6px` 將三角形本體往上方推移。

```ts
const positionArrowStyle = useMemo(() => {
  switch (position) {
    case 'bottom-left':
    case 'bottom-right':
    case 'bottom':
      return css({
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        '&::after': {
          top: '6px',
        },
      });
    default:
      return '';
  }
}, [position]);
```

### Tooltip 顯示

相對最單純的部份，使用 `useDelayUnmount` 回傳的 `shouldShow` 變數來控制顯示與否：

```tsx
const shouldShow = useDelayUnmount(show, 200);

return (
  <React.Fragment>
    {React.cloneElement(children, {
      onMouseOver: () => setShow(true),
      onMouseOut: () => setShow(false),
      ref: childRef,
    })}
    {shouldShow && (
      <Portal>
        <span className={cn(baseStyle, animationStyle, finalStyle)}>
          {arrow && <span className={cn(baseArrowStyle, positionArrowStyle)} />}
          {tip}
        </span>
      </Portal>
    )}
  </React.Fragment>
);
```

劇透：上述的作法無法相容目前的 `Button` 元件，因為之前的實作流程並沒有包含到透過 `props` 傳遞 `ref` 的部份。明天會來解決這個問題。

## 修改指南

### arrow 尺寸

`baseArrowStyle` 中的 `width/height` 會影響 arrow 的顯示區塊大小，而 `positionArrowStyle &::after` 中的 `top/left` 數值會影響三角形部位的尺吋。如果要調整 arrow 的尺寸，上述的 CSS 數值基本上會一起更新。

## 自評

最花時間的部份是根據 `props.position` 來計算 `tip` 位置，另外比較可惜的部份是截稿前沒有實作到「當 `tip` 與畫面邊緣的距離不足時，將 `tip` 掛載到可以完整顯示的方位」。

## 參考文件

- [30 天擁有一套自己手刻的 React UI 元件庫系列 第 12 篇 數據展示元件 - Tooltip](https://ithelp.ithome.com.tw/articles/10272024)
