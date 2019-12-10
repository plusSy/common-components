# Typography 文字
---



<div>
   <h3>文字大小</h3>
   <div class="flex-wrap mt-12">
		<div v-for="item in fontSizeData" class="mr-20 mb-20" style="width: 185px">
			<p class="font-weight-bold">{{ item.class }}</p>
			<span class="text-14">{{ item.details }}</span>
			<div :class="item.class" class="border-box bg-color-lighter flex-ju-al-center mt-8" style="height: 50px;">
				{{ item.class }}
			</div>
		</div>
   </div>
   <h3>文本颜色</h3>
   <div class="flex-wrap mt-12">
		<div v-for="item in fontColorData" class="mr-20 mb-20" style="width: 185px">
			<p class="font-weight-bold">{{ item.class }}</p>
			<span class="text-14">{{ item.name }}</span>
			<p class="text-12">{{ item.details }}</p>
			<div :class="item.class" class="border-box bg-color-black flex-ju-al-center mt-8 text-16" style="height: 50px;">
				{{ item.class }}
			</div>
		</div>
   </div>
</div>

<script>
  new Vue({
    el: '#main',
    data: {
        fontSizeData: [
          {
            class: 'text-12',
            details: '字体大小12px，行高20px'
          },
          {
            class: 'text-14',
            details: '字体大小14px，行高20px'
          },
          {
            class: 'text-16',
            details: '字体大小16px，行高22px'
          },
          {
            class: 'text-18',
            details: '字体大小18px，行高24px'
          },
          {
            class: 'text-20',
            details: '字体大小20px，行高26px'
          },
        ],
	fontColorData: [
        {
          class: "color-primary",
          name: "#0065FF",
          details: ""
        },
        {
          class: "color-white",
          name: "#ffffff",
          details: ""
        },
        {
          class: "color-black",
          name: "#212434",
          details: ""
        },
        {
          class: "color-success",
          name: "#0BB07B",
          details: ""
        },
        {
          class: "color-warning",
          name: "#FFAD0D",
          details: ""
        },
        {
          class: "color-danger",
          name: "#F03D3D",
          details: ""
        },
        {
          class: "color-lighter",
          name: "#F8F9FB",
          details: ""
        },
        {
          class: "color-light",
          name: "#E1E4E8",
          details: ""
        },
        {
          class: "color-medium",
          name: "#E8E8E8",
          details: ""
        },
        {
          class: "color-dark",
          name: "#828282",
          details: ""
        },
        {
          class: "color-dark-700",
          name: "#273A5B",
          details: ""
        },
        {
          class: "color-dark-400",
          name: "#53627C",
          details: ""
        },
        {
          class: "color-dark-100",
          name: "#758196",
          details: ""
        },
        {
          class: "color-gray-700",
          name: "#A6AEBC",
          details: ""
        },
        {
          class: "color-gray-500",
          name: "#C9CED6",
          details: ""
        },
        {
          class: "color-gray-400",
          name: "#E1E4E8",
          details: ""
        },
        {
          class: "color-gray-300",
          name: "#F1F2F4",
          details: ""
        },
        {
          class: "color-gray-200",
          name: "#F8F9FB",
          details: ""
        }
      ]
    }
  });
</script>



---
 {docsify-updated} 
