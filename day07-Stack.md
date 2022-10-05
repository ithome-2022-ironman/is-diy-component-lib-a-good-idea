# day07: Stack

對付大量等距間隔元件的排版專武，簡單好寫，值得擁有。搭配~~昨天做好的醬汁~~ `SpaceWrapper` 更是讓滋味變得妙不可言。

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220918/20142759yLOtTxOvwo.png](https://ithelp.ithome.com.tw/upload/images/20220918/20142759yLOtTxOvwo.png)

[原始碼（可試玩）](https://codesandbox.io/s/2022-day07-stack-r5gxr3?file=/src/App.tsx)

## 開發思路

### 排版

與昨天的 `SpaceWrapper` 類似，其實就是把 `display: flex` 與 `flex-direction` 包成元件的 `props` 來讓元件使用者能透過 `props` 快速設定排版數值。

### 分隔線

本質是「在傳入 `Stack` 元件的每一個 child node 之間插入分隔線元件」。

在開發時採取「先為每一個 children 中的 child node 搭配一個分隔線元素，最後再把多出來的分隔線透過 `.pop()` 移除掉」的作法。選擇這樣撰寫迴圈的理由是，原始碼比較容易閱讀。執行迴圈時只會一種行為，不需要在執行中進行條件判斷（根據 `index` 來判斷需要渲染 child node 搭配分隔線，或是只要渲染 child node）。

## 自評

好用，能少寫一個 css 就是多一份快樂。加了 `props.divider` 之後還能拿來當 Breadcrumb 用，超絕划算。
