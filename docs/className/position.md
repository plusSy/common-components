# Position 位置
---

### relative: 相对定位

```css
.relative{
	position: relative;
}
```
### absolute: 绝对定位

```css
.absolute{
	position: absolute;
}
```
### fixed: 固定定位

```css
.fixed{
	position: fixed;
}
```

### absolute-all 和absolute-y

```css
.absolute-all {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.absolute-y {
	position: absolute;
	top: 0;
	bottom: 0;
}
```

> absolute-all： 在外层div添加position定位为relative，那么使用absolute-all的元素会与父元素同宽高，占满父元素

> absolute-y： 在外层div添加position定位为relative，那么使用absolute-y的元素会与父元素同高度

---
 {docsify-updated} 
