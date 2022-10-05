# day20: Accordion

原理：「點擊 `AccordionTitle` 部位後，顯示下方的 `AccordionBody` 內容」。

不過為了還原 [MUI Accordion](https://mui.com/material-ui/react-accordion/#main-content) 的結構，實作時使用了 `React.cloneElement` 來讓 title 與 body 部位可以作為 children 被包進 `Accordion` 元件中。

以下為您獻上原始碼 ─=≡Σ((( つ•̀ω•́)つ

## 成品

[原始碼](https://gist.github.com/tzynwang/d0edecb49bf283a6e4a0b8fe468f0882)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Accordion)

## 開發思路

### AccordionTitle

把之前做好的 `ButtonBase` 找出來，設定滿版寬（`width: 100%`）再把 `ExpendLessIcon` 放上去，基本外觀完成。
而在 Accordion 進入 `open` 狀態時，透過 `transform: rotate(180deg);` 旋轉 `ExpendLessIcon` 的方向，搞定。

### AccordionBody

基本上僅負責處理 Accordion 開關的動畫效果。

### Accordion

重點：透過 `React.Children` 來取出傳入 `Accordion` 元件中排序為 0 與 1 的 child node 設定為 `AccordionTitle` 與 `AccordionBody`

```ts
/* Hooks */
useEffect(() => {
  React.Children.forEach(children, (child, index) => {
    const childElement = child as JSX.Element;
    if (index === 0) {
      setTitleElement(
        React.cloneElement(childElement, {
          open: openToUse,
          onClick: hasOpenFromProps ? undefined : toggleAccordion,
          accordionTitleClass: classes.title,
        })
      );
    }
    if (index === 1) {
      setBodyElement(
        React.cloneElement(childElement, {
          open: openToUse,
          accordionBodyClass: cn(openToUse && defaultBodyStyle, classes.body),
        })
      );
    }
  });
}, [
  children,
  openToUse,
  hasOpenFromProps,
  classes.title,
  classes.body,
  toggleAccordion,
]);
```

變數 `hasOpenFromProps` 是為了明天的 `Accordions` 元件設置，在今天的展示情境（每一個 `Accordion` 元件的開關狀態各自獨立時）暫時還不會用到，先跳過。

## 自評

截稿前沒做出 MUI Accordion 的元件開關動畫效果，到目前為止體感上做動畫比設計邏輯難。

![CSS is awesome](https://css-tricks.com/wp-content/uploads/2021/04/css-is-awesome.jpg)
