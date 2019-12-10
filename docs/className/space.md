# Space 边距
---

### 示例

<div class="m-20 text-20 font-weight-bold">
		<div class="flex-wrap">
			<div v-for="item in spaceMarginData">
				<div class="space-box mr-20">
					<div :class="item" class="absolute-all">
						<div class="bg-color-medium absolute-all flex-ju-al-center">{{ item }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-wrap mt-20">
			<div v-for="item in spacePaddingData">
				<div class="space-box mr-20">
					<div :class="item" class="absolute-all">
						<div class="bg-color-medium flex-ju-al-center" style="width: 100%;height: 100%;">{{ item }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<script>
  new Vue({
    el: '#main',
    data:{
        spaceMarginData: [
          'm-0', 'mt-20', 'mr-20', 'mb-20', 'ml-20', 'mx-20', 'my-20', 'm-20'
        ],
        spacePaddingData: [
          'p-0', 'pt-20', 'pr-20', 'pb-20', 'pl-20', 'px-20', 'py-20', 'p-20'
        ]
    }
  });
</script>



### 特性

> 1.边距类为向一个元素分配 margin 或者 padding 属性; <br />
 2.支持单个方向、所有方向，以及垂直方向和水平方向。<br />
 3.使用{property}{sides}-{size}格式命名;<br />
 4.项目中使用的边距设计基数为4
 
### {property} 属性

> 1.m为margin; <br />
 2.p为padding
 
### {sides} 方向

> 1.t为margin-top或者padding-top; <br />
  2.b为margin-bottom或者padding-bottom; <br />
  3.l为margin-left或者padding-left; <br />
  4.r为margin-right或者padding-right; <br />
  5.x为水平方向margin-left和margin-right或者padding-left和padding-right; <br />
  6.y为垂直方向margin-top和margin-bottom或者padding-top和padding-bottom; <br />
  7.空为margin或者padding; <br />
  
### {size} 大小
> {size}以4为基数的倍数，从0px到40px


---
 {docsify-updated} 
