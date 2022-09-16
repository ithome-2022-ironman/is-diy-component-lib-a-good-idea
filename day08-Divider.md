# day08: Divider

在只使用原生 hr 元件的條件限制下，盡量還原出 [MUI Divider](https://mui.com/material-ui/react-divider/#main-content) 的效果。

## 開發思路

### 顏色

透過 `props.orientation` 來控制 `styleByOrientation` 要設定 `border-bottom` 或 `border-left` 的樣式。

而為了要允許漸層色背景效果，使用 `props.gradientColor` 來決定是否使用 `border-image` 來設定分隔線背景。

### 標籤

基本上就是透過偽元素的 `content` 來放置文字（或圖片內容），再透過 `position: absolute` 與 `transform` 等來調整標籤位置。注意 defaultStyle 有設定 `position: relative` 與 `overflow: visible` 來讓標籤內容可以不受到 hr 的高度限制，能正常顯示在畫面上。

## 修改指南

標籤左右（上下）側的空間效果目前僅能透過「設定標籤 `padding` 並指定 `background-color` 使用與目前背景一致的顏色」來達成（可修改 `labelStyleHorizontalHr` 的 `backgroundColor` 來觀察）。故在使用「分隔線＋標籤」時，需根據分隔線放置的背景顏色來修改 `props.labelStyle` 中的 `background-color` 設定值。

## 自評

賣點：漸變色背景與 hr 原生元件。不強求這兩點的話，用人家寫好的元件比較輕鬆。

## 參考資料

- [Simple Styles for hr](https://css-tricks.com/examples/hrs/)
