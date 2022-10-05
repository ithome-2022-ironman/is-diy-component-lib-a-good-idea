# day06: SpaceWrapper

其實就是把 `margin` 跟 `padding` 打包成元件的 `props` 方便使用者快速定義元件間距。簡單暴力。

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220917/20142759kzX7CYy56c.png](https://ithelp.ithome.com.tw/upload/images/20220917/20142759kzX7CYy56c.png)

[原始碼（可試玩）](https://codesandbox.io/s/2022-day06-spacewrapper-exnmtt?file=/src/SpaceWrapper.tsx)

## 開發思路

想還原 `margin` 與 `padding` 在原生 CSS 中輸入 1 到 4 個數值都能對應的設計，且 `padding` 與 `margin` 可共用同一套邏輯，於是有了 `getSpace` function

- 傳入單一數字時，結果為 `margin/padding: {props}px`
- 傳入陣列時：
  - 若內容不全為 `number` 則視為無效，回傳 `0px`
  - 若內容全為數字，則固定取前 4 組內容，透過 `.map` 加工為 `{props}px` 後再 `.join` 回字串；比如傳入 `padding={[24, 48]}` 時，會透過 `.map` 得到 `['24px', '48px']` ，接著透過 `.join` 將陣列轉為 `24px 48px` 字串

## 修改指南

想要更偷懶的話可以直接把預設的 `padding` 與 `margin` 寫進 `props` 中，可修改檔案 `SpaceWrapper.tsx` 第 12 行的內容：

```ts
// 預設 SpaceWrapper 的間距為 margin: 16px; padding: 24px;
const { children, margin = 16, padding = 24, className, ...rest } = props;
```

另外目前的程式碼尚不支援原生 CSS 允許使用的 `auto` 樣式關鍵字，可調整 `!args.space.every((arg) => typeof arg === "number")` 條件內的程式碼。

## 自評

要在截稿前做出 MUI [system properties](https://mui.com/system/properties/) 這麼完整的效果還是有點難，但如果只是要滿足排版需求的話，今天的自製元件還算堪用。
