# day11: Button

為昨天做好的 `ButtonBase` 補上一些樣式設定，再透過 `props.variant` 控制按鈕外型，以及 `props.{start | end}Icon` 來讓使用者傳入按鈕圖示。

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220922/20142759bT1dZU1GIB.png](https://ithelp.ithome.com.tw/upload/images/20220922/20142759bT1dZU1GIB.png)

[原始碼](https://gist.github.com/tzynwang/c78af1d195da641d0e17e261ce0f8aec)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Buttons)

## 開發思路

- 透過 `props.variant` 來控制要對元件套用哪一套樣式，可參考 `variantStyle` 的內容。
- 當使用者從 `props.startIcon` 或 `props.endIcon` 時，直接把圖示作為 `children` 放進 `ButtonBase`，如下：

```tsx
<ButtonBase
  className={cn(baseStyle, variantStyle, className)}
  disabled={disabled}
  {...rest}
>
  {startIcon}
  {children}
  {endIcon}
</ButtonBase>
```

## 修改指南

目前圖示與按鈕文字的間距設定放在 `baseStyle` 中，要修改間距的話，請調整 `gap` 數值：

```ts
const baseStyle = useMemo(
  () =>
    css({
      // 其他樣式先略
      gap: '8px', // 請改這邊
    }),
  []
);
```

而如果追加了 `props.variant` 種類，則 `variantStyle` 也會需要跟著擴充樣式喔 (ゝ ∀･)

## 自評

搞剛的都在昨天做掉了。

但整體做下來沒有想像中的輕鬆，開始感受到用人家寫好的 lib 是真的可以省掉不少事情 థ౪థ
