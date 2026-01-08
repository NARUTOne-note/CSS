# vertical-align

> 这个属性影响由inline-level（内联级）元素生成的盒子，在行盒子中竖直方向的对齐位置。

1. inline-level element (内联级元素)。内联级元素包括 display属性计算值为:

- inline 内联元素一般是用来包裹文本的元素，比如span、strong、em标签等
- inline-block 内联-块元素（内嵌的块元素）可以在一行中排列显示，以具有width，height（也有可能是通过其内容确定的）和padding，border及margin。比如img、input标签等
- line-table（本文不考虑）

2. line box（行盒子）：内联级元素（inline-level elements）在一行中一个挨一个地排列，一旦当前行放不下了，就在它下方创建一个新行，所有这些行都是所谓的行盒（line box），用来包住这一行的所有内容。不同大小的的内容意味着不等高的行盒。

## 如何确定inline-level elements（内联级元素）盒子的baseline位置

display属性计算值为

- inline，内联元素的baseline，是里面文本（即使没有字母x，可以想象文本中有一个字母x）字母x的下边缘线

- inline-block，内联块元素baseline位置的确定规则又分为以下三种：
（1） inline-block元素盒子里，没有内容(流内内容)，是一个空的盒子时，baseline位置就是该盒子margin-bottom的边界（没有margin-bottom值，就是盒子的边界值）。

（2）inline-block元素盒子里，有内容元素，并且overflow属性值为visible时(默认值)，那么该盒子的baseline位置就是里面最后一个内容元素的baseline。

（3）inline-block元素盒子里，有内容元素，并且overflow属性值为非visible时 (比如overflow:hidden)，那么该盒子的baseline位置就是该盒子margin-bottom的边界。

**设置元素的vertical-align属性，并没有改变该元素的baseline位置（元素baseline位置确定参照上面：如何确定inline-level elements（内联级元素）盒子的baseline位置。），改变的只是与父元素基线对齐的位置，所以父元素的基线位置是会移动的**