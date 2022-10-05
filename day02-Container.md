# day02: Container

需求故事：希望有一個容器元件來管理各級 breakpoint 下的 RWD 效果（置中內容、限制 max-width 以及根據 breakpoint 調整 padding 數值等），而我在使用元件時，只要將內容灌進元件裡就好，不再需要關注排版設定。另外也希望能調整渲染時實際使用的 HTML 元件（而非一路 div 到底）。

實作時參考了 [MUI: Container](https://mui.com/material-ui/react-container/) 與 [chakra-ui: Box](https://chakra-ui.com/docs/components/box/usage) 此二元件。

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220913/20142759h3jlqV99QU.png](https://ithelp.ithome.com.tw/upload/images/20220913/20142759h3jlqV99QU.png)

![https://ithelp.ithome.com.tw/upload/images/20220913/201427597rJyMevT7r.png](https://ithelp.ithome.com.tw/upload/images/20220913/201427597rJyMevT7r.png)

[原始碼（可試玩）](https://codesandbox.io/s/2022-day02-container-shi65s)

## 開發思路

- 為了對應滿版背景，將元件拆成 wrapper（負責設定背景色的區塊）以及裝載實際內容的 child
- 不允許直接透過 `className` 來修改樣式，因為無法直接得知傳入的樣式是套用在 wrapper 或是 child 上。有覆寫樣式的需求一律根據對象元件將 `className` 傳入 `classes.wrapper` 或 `classes.child` 中
- 透過 `React.createElement` 根據 `props.renderAs` 決定要渲染為哪一種 HTML 元件，用來對應 nav bar 與 footer 的需求

## 修改指南

- 在沒有新增或刪除級距的情況下，想要調整各級距的 `min-width` 數值：直接修改 `BREAK_POINTS` 內各個項目的 `width` 值即可
- 想要修改級距名稱、或新增刪除級距選項：修改 `BREAK_POINTS` 內容後，將改好的級距名稱同步到 `type BreakPoint` 中

```ts
// 移除了一組 breakpoint 並把 scale 命名改為 tablet 與 screen

const NEW_BREAK_POINTS: BreakPoints = [
  { scale: 'tablet', width: 720 },
  { scale: 'screen', width: 960 },
];

type BreakPoint = 'tablet' | 'screen';
```

## 自評

在本次鐵人賽中少數做完後真的有拿去正式開發環境使用的元件，好吃印。
