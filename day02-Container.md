# day02: Container

在處理 landing page 排版時，希望有一個容器元件專門處理不同 breakpoint 下的 RWD 效果（限制 maxWidth、根據 breakpoint 調整 padding 數值等）

## 開發思路

- 為了對應滿版背景，將 container 拆成 wrapper（負責設定背景色的區塊）以及裝載實際內容的 child
- 不允許直接透過 className 來修改樣式，因為無法直接得知傳入的樣式是套用在 wrapper 或是 child 上。有覆寫樣式的需求一律根據對象元件將 className 傳入 classes.wrapper 或 classes.child 中
- child 根據專案設計稿需求設定好 padding
  - 在遇到個別區塊需要特別設定 padding 數值的情況，傳入 disablePadding 來移除綁在 childStyle 上的 padding
- 透過 React.createElement 根據 renderAs 決定要渲染為哪一種 HTML element，用來對應 nav bar 與 footer 的需求

## 修改指南

- 在沒有新增或刪除 scale 的情況下，調整各級距的 min-width 數值：直接修改 BREAK_POINTS 內各個項目的 width 值即可
- 想要修改 scale 名稱、或新增刪除 scale 選項：更新完 BREAK_POINTS 內容後，將改好的 scale 名稱更新到 type BreakPoint 中

```tsx
// 移除了一組 breakpoint 並把 scale 命名改為 tablet 與 screen

const NEW_BREAK_POINTS: BreakPoints = [
  { scale: 'tablet', width: 720 },
  { scale: 'screen', width: 960 },
];

type BreakPoint = 'tablet' | 'screen';
```

- 想要修改 padding：直接改原始碼第 36 跟 45 行的內容吧

## 自評

做完後有實際拿去做產品開發，好用，好吃印。