# day15: Dialog, Drawer

來幫昨天做好的骨架補上一些 CSS 樣式與動畫效果。

進一步組合 `position: absolute` 與 `transform: translate(...)` 的話，還可以得到 `Drawer` 元件唷 ヽ(́◕◞౪◟◕‵)ﾉ

## 成品

[原始碼](https://gist.github.com/tzynwang/6f2588e13a5ed62e94634a0f9284458d)
[Dialog 展示](https://tzynwang.github.io/ithome-2022-demo/#/Dialog)
[Drawer 展示](https://tzynwang.github.io/ithome-2022-demo/#/Drawer)

## 開發思路

### Dialog

將對話框背景設定為 `position: fixed` 並搭配 `width: 100vw; height: 100vh;` 達成滿版效果。而 `display: flex;` 則讓作為子元件的對話框本體可以在背景元件裡頭垂直水平置中。

```ts
const defaultBackdropStyle = css({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  inset: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  animation: `${opacityIn} 0.25s`,
});
```

對話框本身的動畫效果拆成兩個部分：掛載時從透明逐漸顯現的效果由 `opacityIn` 負責，而卸載時則是先進行 `unmountedAnimation`，結束後觸發 `DialogBase` 的 `transitionend` 事件，進而將整個對話框元件自畫面上卸載：

```ts
const opacityIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const defaultDialogStyle = css({
  margin: '0',
  padding: '24px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#fff',
  animation: `${opacityIn} 0.25s`,
});
const unmountedAnimation = css({
  opacity: '0',
  transition: 'opacity 0.25s',
});
```

### Drawer

透過 `props.direction` 控制對話框出現的位置，接著根據傳入的 `direction` 數值來決定對話框的 `transform` 效果要從哪一個方向開始。需注意 `drawerUnmountedAnimation` 也要配合 `direction` 來調整元件卸載前的移除動畫效果。

比如在 `Drawer` 的 `props.direction = 'right'` 時，預設 `Drawer` 滿版畫面高且靠右（`right: 0`），並且 `drawerUnmountedAnimation` 要設定為 `transform: translateX(50vw);` 來讓 `Drawer` 消失時要往畫面右側退去，

```ts
const defaultDrawerStyle = useMemo(() => {
  // 其他先略過
  return css({
    height: '100vh',
    top: '0',
    right: '0',
    animation: `${slideInRight} 0.25s`,
  });
}, [direction]);
const drawerUnmountedAnimation = useMemo(() => {
  // 其他先略過
  return css({
    transform: 'translateX(50vw)',
    transition: '0.25s ease',
  });
}, [direction]);
```

對話框背景則是透過 `opacityIn` 與 `backdropUnmountedAnimation` 做出淡入淡出效果。

## 修改指南

目前並未對 `Dialog` 與 `Drawer` 元件預設 `min-width` 等數值，有需要的話可以放在 `Dialog` 元件的 `defaultDialogStyle` 或 `Drawer` 元件的 `defaultDrawerStyle` 中。

## 自評

比較花時間的地方是處理 `props.direction` 四個方位對應的 `Drawer` 動畫效果。邏輯倒是還好 (・∀・) 單純自用的話說不定連 `props.direction` 都可以不做，直接把樣式寫在 `Drawer` 裡面就搞定了。
