# day21: Accordions

MUI 的 Accordion 支援兩種行為：

- 每個 `Accordion` 元件的開闔狀態各自獨立：當畫面上有複數個 `Accordion` 元件時，開啟 `Accordion` 一號不會影響畫面上其餘的 `Accordion` 狀態
- 當畫面上有複數個 `Accordion` 元件時，同一時間只會有一個 `AccordionBody` 被展開

而昨天暫時跳過的變數 `hasOpenFromProps` 就是為了實現第二種功能，以下是解說時段。

## 成品

[原始碼](https://gist.github.com/tzynwang/985ad33401e12726c1985a1267315803)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Accordions)

## 開發思路

首先檢查是否有透過 `props` 傳入變數 `open`：

```ts
const hasOpenFromProps = useMemo(
  () => Object.keys(props).includes('open'),
  [props]
);
```

若有，則使用 `props.open` 來控制 `AccordionBody` 開闔，反之則使用 `Accordion` 內部的 `useState` 變數 `localOpen` 來管理狀態：

```ts
const openToUse = useMemo(
  () => (hasOpenFromProps ? open : localOpen),
  [hasOpenFromProps, open, localOpen]
);
```

當 `Accordion` 透過 `props.open` 控制開闔時，不使用 `Accordion` 元件內部的 `toggleAccordion` 來驅動開闔狀態：

```ts
setTitleElement(
  React.cloneElement(childElement, {
    open: openToUse,
    onClick: hasOpenFromProps ? undefined : toggleAccordion,
    accordionTitleClass: classes.title,
  })
);
```

使用方式：

```tsx
function AccordionsDemo(): React.ReactElement {
  const [currentOpen, setCurrentOpen] = useState<number>(0);

  // 當使用者點擊各個 Accordion 元件時，設定當下需要展開的 AccordionBody
  const openAccordion = (panelNumber: number) => () => {
    if (panelNumber === currentOpen) {
      setCurrentOpen(0);
    } else {
      setCurrentOpen(panelNumber);
    }
  };

  // 每一個 Accordion 透過 props.open 比對 currentOpen 來控制當下是哪一個 AccordionBody 需要展開
  return (
    <Stack>
      <Accordion onClick={openAccordion(1)} open={currentOpen === 1}>
        <AccordionTitle>title 1</AccordionTitle>
        <AccordionBody>body 1</AccordionBody>
      </Accordion>
      <Accordion onClick={openAccordion(2)} open={currentOpen === 2}>
        <AccordionTitle>title 2</AccordionTitle>
        <AccordionBody>body 2</AccordionBody>
      </Accordion>
      <Accordion onClick={openAccordion(3)} open={currentOpen === 3}>
        <AccordionTitle>title 3</AccordionTitle>
        <AccordionBody>body 3</AccordionBody>
      </Accordion>
    </Stack>
  );
}
```

## 自評

元件開闔的邏輯很單純，如果設計稿上 `Accordion` 的外觀與既有的第三方元件庫有落差的話，可以考慮自幹。

但上述的情境會帶出另一個問題：「那麼當初在選型時，是否沒有顧慮到該元件庫能與現行的設計風格搭配，才會出現元件庫不易配合設計稿的狀況」。

小結論：除了懷疑設計師為何會畫出不好實作的前端介面時，問題也有可能出在工程師挑選了不容易搭配現行設計的框架來開發。
