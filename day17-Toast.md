# day17: Toast

以為「當滑鼠移動到 Toast 元件上時要暫停倒數」會很複雜，實際上的解決方式卻異常簡單。

## 成品

[原始碼](https://gist.github.com/tzynwang/06468f7f9b9966bdd33360262585f2fd)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Toast)

## 開發思路

### 倒數進度條

首先透過 `props.countDown` 取得 `Toast` 元件出現在畫面上的總時數（單位：毫秒），並將此時間設定為倒數進度條的動畫總時長。`countDownAnimation` 提供的效果則是讓倒數進度條從 `transform: scaleX(0%);` 變形為 `transform: scaleX(100%);`。

視覺效果即是進度條會在 `Toast` 元件進行卸載的倒數時，從 0% 的寬度逐漸放大為 100%。

```ts
const countDownAnimation = keyframes`
from {
  transform: scaleX(0%);
}
to {
  transform: scaleX(100%);
}
`;

/* States */
const animationDuration = useMemo(() => countDown / 1000, [countDown]);
const progressBarStyle = useMemo(
  () =>
    disableAutoClose
      ? undefined
      : css({
          '&::before': {
            content: '""',
            width: '100%',
            height: '2px',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#4e342e',
            transform: 'scaleX(0%)',
            transformOrigin: 'top left',
            animation: `${countDownAnimation} ${animationDuration}s ease`,
          },
        }),
  [disableAutoClose, animationDuration]
);
```

另外因為 `transform-origin` 的預設值是 `center`，故在 `progressBarStyle` 中額外指定變形的起點要改為左上角。

### 滑鼠 hover 後暫停倒數

解法簡單到近乎無恥，使用 CSS 的 `animation-play-state` 來控制即可：

```ts
const defaultToastStyle = useMemo(
  () =>
    css({
      minHeight: '60px',
      minWidth: '240px',
      display: 'inline-block',
      position: 'fixed',
      top: '24px',
      right: '24px',
      padding: '8px',
      backgroundColor: '#fff',
      '&:hover::before': {
        animationPlayState: pauseOnHover ? 'paused' : 'running',
      },
    }),
  [pauseOnHover]
);
```

再搭配 Toast 元件本身被貼上的 `animationend` 事件監聽，動畫跑完再執行元件卸載就大功告成。結束。

## 修改指南

`props.countDown` 單位也可直接設定為秒，修改如下：

```ts
/* States */
const {
  show,
  children,
  // 直接傳入單位為秒的 Toast 出現時間長度
  countDown = 2,
  disableAutoClose = false,
  pauseOnHover = false,
  classes = { snack: '', closeButton: '' },
  onClose,
  ...rest
} = props;
delete rest.className;
const progressBarStyle = useMemo(
  () =>
    disableAutoClose
      ? undefined
      : css({
          '&::before': {
            content: '""',
            width: '100%',
            height: '2px',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#4e342e',
            transformOrigin: 'top left',
            // 動畫長度直接帶入 props.countDown 即可
            animation: `${countDownAnimation} ${countDown}s ease`,
          },
        }),
  [disableAutoClose, countDown]
);
```

另外目前每一個 `Toast` 元件的尺寸是固定的，若需修改大小，請調整以下數值：

```ts
const defaultToastStyle = useMemo(
  () =>
    css({
      minHeight: '60px', // 改這裡
      minWidth: '240px', // 改這裡
      // 下略
    }),
  [pauseOnHover]
);
```

## 自評

只需要處理單一個 `Toast` 元件出現在畫面上的話，實作起來是不難。但這種元件通常會成群結隊出現，明天就來處理這個需求 =͟͟͞͞( •̀д•́)
