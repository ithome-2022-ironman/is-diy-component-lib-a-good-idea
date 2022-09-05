# 前言：為什麼不用人家寫好的東西？

因為 component library 提供的元件很少會直接符合設計稿的需求，外觀的客製化基本上不可避。

於是我開始好奇，比起閱讀官方文件來了解如何對元件進行深度客製化，從零開始打造一個符合開發需求的元件會不會讓人生更輕鬆🤔？畢竟掌握自己寫的 code 通常會比修改人家寫好的東西簡單。

剛好也找到一些資源說明「元件庫或許並非必要」的觀點，助長了自己動手做的氣燄：

- [Josh Comeau: You Don’t Need A UI Framework](https://www.smashingmagazine.com/2022/05/you-dont-need-ui-framework/)
- [In And Out Of Style | Jeremy Keith | CSS Day 2022](https://youtu.be/CdZZcbZG83o)

於是今年鐵人賽就來分享自刻元件的心得。

## 這 30 天預計會涵蓋的內容

在不使用 component library 的情況下，還原出 component library 提供的效果。

你會看到十幾組手刻元件，包含他們的完整原始碼、以及我如何實現他們的筆記與想法。還有這樣搞到底值不值得的感想 (ﾟ∀ﾟ)

因為終極目標並不是真的要發佈一套可供第三方使用的套件（主軸是想辦法手刻出套件提供的效果），故大部分的元件設計以滿足需求為主，通用性次之；容許高度客製化較不在本次鐵人賽的考量範圍內。

### 目錄

原則上參考平常切版習慣，從大到小來依序介紹。但有些使用率明顯比較高的元件會無視以上原則較早登場，因為先做完就可以在後續開發時直接讓自製元件上班了，耶 (ﾟ∀ﾟ)

1. （現在在這裡）前言：為什麼不用人家寫好的東西？
2. Container
3. NavBar
4. ScrollPercentageBar
5. SpaceWrapper
6. Stack
7. Divider
8. Image
9. Button
10. SVG icon
11. UploadButton
12. Dialog
13. Drawer
14. Toast
15. Toasts
16. TransferList
17. Accordion
18. Accordions
19. TabsGroup
20. Tooltip
21. Calendar
22. Input:text
23. Input:checkbox
24. Input:radio
25. Avatar
26. Badge
27. Chip
28. StyleLayer
29. useSystemColorScheme
30. 結語：所以值得嗎？

### 使用套件

使用 `create-react-app` 來搭建專案的基礎建設，除此之外預計會使用到的套件如下：

```json
"react": "^18"
"typescript": "^4.8.2"
"classnames": "^2.3.1"
"@emotion/css": "^11.10.0"
```

## 今天會有任何 code 可以看嗎？

沒有，抱歉。但從明天開始有連續 28 天可以看，今天就先這樣了，謝謝你的閱讀 (´▽`ʃ♡ƪ)