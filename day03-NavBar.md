# day03: NavBar

做出一個固定在畫面上方的導覽列沒什麼難度，故本日目標是重現 MUI 的 [Elevate App bar](https://mui.com/material-ui/react-app-bar/#elevate-app-bar) 與 [Hide App bar](https://mui.com/material-ui/react-app-bar/#hide-app-bar) 這兩種導覽列。

## 成品

- [Elevate App bar](https://codesandbox.io/s/2022-day03-elevatednavbar-4ebgd6?file=/src/App.tsx)
- [Hide App bar](https://codesandbox.io/s/2022-day03-hidenavbar-cw6zxg?file=/src/App.tsx)

## 開發思路

先觀察：

- Elevate App bar 的行為：畫面的不在頂部時，為導覽列加上陰影效果。
- Hide App bar 的行為：畫面往下捲動時，收起導覽列；畫面往上捲動時，導覽列滑出。

想讓元件本身的 code 單純好讀，也考慮到之後可能也會有其他元件用到捲動相關資料，故選擇把以上兩個邏輯判定包成 custom hooks `useScrollPercentage` 與 `useScrollDown` 來處理，不直接將捲動相關的邏輯寫在元件內。

能取得「畫面捲動百分比」與「捲動方向」的資料後，這兩個元件分別要處理的內容只剩下：

- Elevate App bar：根據捲動百分比，來控制元件是否加上 `filter: drop-shadow(...)` 樣式。
- Hide App bar：預設導覽列 `transform` 樣式為 `translateY(0px)`，在 `useScrollDown` 回傳 `true` 時，設定 `transform` 為 `translateY(-60px)` 將導元件往上方推移。並元件被隱藏時，同時取消陰影效果（`navWrapperHide` 的 `filter: none`）

## 修改指南

- Hide App bar 的動畫效果：如果增高了整個元件的高度，需修改 `navWrapperHide` 的 `translateY` 數值。
- `useScrollPercentage` 與 `useScrollDown` 在目前的程式碼中預設延遲數值為 100 毫秒，如果要讓計算捲動的反應更即時，可下調在 hooks args 預設的 `delay` 數值。

## 自評

實作起來不難，如果是個人規模的專案或許可以不用使用套件而是自行製作。

## 參考資料

- [stackOverFlow: Cross-Browser Method to Determine Vertical Scroll Percentage in Javascript](https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript)
- [stackOverFlow: Detecting scroll direction](https://stackoverflow.com/questions/31223341/detecting-scroll-direction)
