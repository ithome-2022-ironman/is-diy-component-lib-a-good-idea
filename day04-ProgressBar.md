# day04: ProgressBar

回收再利用昨天做好的 useScrollPercentage 來寫一個根據畫面捲動百分比延展的進度條。

## 開發思路

最簡單的作法是透過 `transform: scaleX(...)` 來根據百分比進行元件變形，不過這不太適合套在透過 `linear-gradient()` 設定背景色的進度條上（漸變色的比例會跑掉，因為整個元件透過 `scaleX` 變形，理想上是根據捲動的百分比揭露漸變色）。最後決定使用 `clipPath` 來處理遮蓋需求。

## 修改指南

- 預設高度：在現行的程式碼中要調整 `props.height` 與 `finalHeight` 中的 fallback 數值。
- 進度條顏色：調整 `props.color`
- 背景顏色：調整 `props.barColor`

## 自評

hook 都寫好了就幫他繼續找工作。