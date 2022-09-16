# day10: ButtonBase

![波紋](https://wiki.komica.org/images/thumb/2/22/Img12657.jpg/300px-Img12657.jpg)

來重現 MUI 的按鈕（包含漣漪效果）吧。

不過因為實作動畫效果的原始碼比預期的長，故實心、外框與純文字按鈕的效果放到明天來示範。

## 開發思路

### 基本樣式

透過 `position: relative` 與 `overflow: hidden` 來把漣漪動畫限制在「按鈕」的範圍內。

置中透過 `display: inline-flex` 來處理。

而在按鈕呈現 `disable` 狀態時，透過 `pointer-events: none` 來讓按鈕忽略點擊事件。

### 漣漪效果

```tsx
const rippleAnimation = keyframes`
to {
  transform: scale(1.2);
  opacity: 0;
}
`;

/* States */
const rippleStyle = useMemo(
  () =>
    css({
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: rippleColor,
      transform: 'scale(0)',
      animation: `${rippleAnimation} .7s ease`,
    }),
  [rippleColor]
);

/* Functions */
const playRipple = useCallback(
  (e: MouseEvent): void => {
    // props.disableRipple 時，不執行任何關於漣漪動畫的計算
    if (disableRipple) return;

    // 根據點擊目標（也就是我們的按鈕元件）來計算漣漪的直徑，採用的是「按鈕元件長與寬比較大」的那一個數字
    const target = e.currentTarget as HTMLButtonElement;
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    // 透過 rippleContainerRef.current 來操作「負責裝載漣漪動畫的 span 元件」
    const rippleContainer = rippleContainerRef.current;
    if (rippleContainer) {
      const rippleEffect = document.createElement('span');

      // 設定漣漪的尺寸與漣漪動畫開始的位置
      rippleEffect.style.width = rippleEffect.style.height = `${diameter}px`;
      rippleEffect.style.left = `${e.clientX - (target.offsetLeft + radius)}px`;
      rippleEffect.style.top = `${e.clientY - (target.offsetTop + radius)}px`;

      // 設定漣漪使用的樣式 rippleStyle
      rippleEffect.classList.add(rippleStyle);

      // 把漣漪 span 元件掛載到畫面上，而根據 rippleStyle 的設定，漣漪會在 0.7 秒後變為完全透明
      // 注意：動畫結束後，漣漪 span 元件還停留在 DOM 上，而我們需要在動畫結束後移除這個元件，否則多次點擊後會新增許多不必要的 span 元件
      rippleContainer.appendChild(rippleEffect);
    }
  },
  [disableRipple, rippleContainerRef, rippleStyle]
);
const removeRipple = useCallback((): void => {
  const rippleContainer = rippleContainerRef.current;
  if (rippleContainer) {
    rippleContainer.childNodes.forEach((node) => {
      // 檢查「負責裝載漣漪動畫的 span 元件」，若其中有 ELEMENT_NODE 且 class 包含 rippleStyle 的話，移除該「漣漪 span 元件」
      if (node.nodeType === 1) {
        const elementNode = node as HTMLElement;
        if (elementNode.classList.contains(rippleStyle)) {
          elementNode.remove();
        }
      }
    });
  }
}, [rippleContainerRef, rippleStyle]);

/* Hooks */
useEffect(() => {
  const button = buttonRef.current;
  button?.addEventListener('click', playRipple);
  // 漣漪動畫結束時，執行 removeRipple 來移除漣漪 span 元件
  button?.addEventListener('animationend', removeRipple);
  return () => {
    button?.removeEventListener('click', playRipple);
    button?.removeEventListener('animationend', removeRipple);
  };
}, [buttonRef, playRipple, removeRipple]);
```

## 修改指南

- 調整漣漪綻放的速度（從小擴散到大）：修改 `rippleStyle` 中 `animation` 的時間長短。
- 調整漣漪最終綻放的大小：修改 `rippleAnimation` 的 `scale()` 數字。

## 自評

漣漪效果沒有想像中容易，動手寫了才知道複雜。沒事不需要自幹，吃力不討好。

但不做動畫效果的話倒是蠻簡單的 (ﾟ ∀ ﾟ)

## 參考資料

- [How to Recreate the Ripple Effect of Material Design Buttons](https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/)
- [MDN: pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
- [MDN: Node.nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
