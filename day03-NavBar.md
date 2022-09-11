# day03: NavBar

做出一個固定在畫面上方的導覽列沒什麼難度，故本日目標是實作 material-ui 的 [Elevate App bar](https://mui.com/material-ui/react-app-bar/#elevate-app-bar) 與 [Hide App bar](https://mui.com/material-ui/react-app-bar/#hide-app-bar) 這兩種導覽列。

## 開發思路

先觀察一下：
- Elevate App bar 的行為：畫面的不在頂部時，為導覽列加上陰影效果。
- Hide App bar 的行為：畫面往下捲動時，收起導覽列；畫面往上捲動時，導覽列滑出。

想讓元件本身的 code 單純好讀，也考慮到之後可能也會有其他元件用到捲動相關資料，故選擇把以上兩個邏輯判定包成 custom hooks `useScrollPercentage` 與 `useScrollDown` 來處理，不直接將捲動相關的邏輯寫在元件內。

能取得「畫面捲動百分比」與「捲動方向」的資料後，這兩個元件分別要處理的內容只剩下：
- Elevate App bar：根據捲動百分比，來控制元件是否加上 `filter: drop-shadow(...)` 樣式。
- Hide App bar：預設導覽列 `transform` 樣式為 `translateY(0px)`，在 `useScrollDown` 回傳 `true` 時，設定 `transform` 為 `translateY(-60px)` 將導元件往上方推移。並元件被隱藏時，同時取消陰影效果（`navWrapperHide` 的 `filter: unset`）

## 修改指南

- Elevate App bar 的陰影設定：調整 `navWrapperBgColor` 中的 `filter` 內容，展示用的陰影數值是透過 [Box Shadow CSS Generator](https://cssgenerator.org/box-shadow-css-generator.html) 產生的
- Hide App bar 的動畫效果：如果增高了整個元件的高度，需一併修改 `navWrapperHide` 的 `translateY` 數值。

## 自評

- 被取代性：高，有現成的。
- 開發難度：中低，邏輯並不複雜。

還可以，至少沒有花很多時間從頭開始造輪子。