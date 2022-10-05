# day04: ProgressBar

回收再利用昨天做好的 hook `useScrollPercentage` 來跟普通的 ProgressBar 元件進行融合召喚，你會得到一個顯示畫面捲動百分比的進度條元件。

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220915/20142759vZ2tW3tq8Z.png](https://ithelp.ithome.com.tw/upload/images/20220915/20142759vZ2tW3tq8Z.png)

[原始碼（可試玩）](https://codesandbox.io/s/2022-day04-progressbar-0sf5br?file=/src/ProgressBar.tsx)

## 開發思路

### 如何根據 `props.percentage` 調整進度條填色比例

最簡單的作法是透過 `transform: scaleX(...)` 來根據百分比進行元件變形，不過這不太適合套在透過 `linear-gradient()` 設定背景色的進度條上（漸變色的比例會跑掉，因為 `scaleX` 縮放的是整個元件，包含背景色的繪製區塊，理想上是根據捲動的百分比揭露漸變色）。最後決定使用 `clip-path` 來處理遮蓋需求。

### 想要圓角（border-radius）效果

使用 `clip-path` 來處理進度條延展時，如果需要對「進度條顏色」套用圓角效果，則 `clip-path` 的設定值需要調整。可參考檔案 `ProgressBar.tsx` 第 43 至 45 行的處理：

```ts
clipPath: barRounded
    ? `inset(0 ${100 - percentage}% 0 0 round ${finalHeight}px)`
    : `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`,
```

這裡僅針對進度條顏色進行圓角效果，進度條「背景」部分的圓角可以直接透過 `props.classes` 來傳入樣式設定。

## 修改指南

預設高度：在現行的程式碼中要調整 `props.height` 與 `finalHeight` 中的 fallback 數值。參考以下列出部分：

```ts
const {
  height = 6, // 改這裡
} = props;

// finalHeight 裡面也要改
const finalHeight = useMemo(() => (height ? Math.ceil(height) : 6), [height]);
```

## 自評

處理漸變色搭配圓角效果較花時間，其他部分沒什麼複雜度。想要漸變色 ProgressBar 的朋友可以動手寫寫看 (`・ω・´)
