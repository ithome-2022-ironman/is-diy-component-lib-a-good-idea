# day04: ScrollPercentageBar

回收再利用昨天做好的 useScrollPercentage 來寫一個根據畫面捲動百分比延展的進度條。

## 開發思路

最簡單的作法是透過 `transform: scaleX(...)` 來根據百分比進行元件變形，不過這不太適合套在透過 `linear-gradient()` 設定背景色的進度條上（漸變色的比例會跑掉，因為整個元件透過 `scaleX` 變形，理想上是根據捲動的百分比揭露漸變色）。最後決定使用 `clipPath` 來處理遮蓋需求。

## 修改指南

TODO: day04 修改指南

## 自評

- 被取代性：中高，material-ui 的 LinearProgress 搭配 props value 就可以達成類似需求，不過 mui 提供的預設樣式不包含漸變背景。~~贏了一點點~~。
- 開發難度：低，謝謝決定把捲動判定邏輯打包成 custom hook 的我。

簡單實惠。