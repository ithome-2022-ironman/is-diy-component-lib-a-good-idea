# day06: SpaceWrapper

其實就是把 margin 跟 padding 打包成元件的 props 來定義元件樣式。搭配現有的元件來微調排版很方便。

## 開發思路

想還原 margin 與 padding 在原生 CSS 中輸入 1 到 4 個數值都能對應的設計，且 padding 與 margin 可共用同一套邏輯，於是有了 `getSpace` function

- 傳入單一數字時，結果為 `margin/padding: {props}px`
- 傳入陣列時：
  - 若內容不全為 `number` 則一律視為無效，回傳 `0px`
  - 若內容全為數字，則固定取前 4 組內容，透過 `.map` 加工為 `{props}px` 後再 `.join` 回字串

## 修改指南

截稿前的程式碼尚不支援原生 CSS 允許使用的 `auto` 樣式關鍵字，可調整 `!args.space.every((arg) => typeof arg === "number")` 條件內的回傳值內容。

## 自評

要在截稿前做出 MUI [system properties](https://mui.com/system/properties/) 這麼完整的效果還是有點難，但如果只是要滿足排版需求的話，今天的自製元件還算堪用。
