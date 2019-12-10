# Background 背景颜色
---

### 背景颜色

<div class="flex-wrap mt-12">
		<div v-for="item in fontSizeData" class="mr-20 mb-20" style="width: 185px">
			<p class="font-weight-bold">{{ item.class }}</p>
			<span class="text-14">{{ item.name }}</span>
			<p class="text-12">{{ item.details }}</p>
			<div :class="item.class" class="border-box flex-ju-al-center mt-8 text-16" style="height: 50px;">
				{{ item.class }}
			</div>
		</div>
	</div>


<script>
new Vue({
  el: '#main',
  data: {
      fontSizeData: [
        {
          class: "bg-color-primary",
          name: "#0065FF",
          details: ""
        },
        {
          class: "bg-color-white",
          name: "#ffffff",
          details: ""
        },
        {
          class: "bg-color-black",
          name: "#212434",
          details: ""
        },
        {
          class: "bg-color-success",
          name: "#0BB07B",
          details: ""
        },
        {
          class: "bg-color-warning",
          name: "#FFAD0D",
          details: ""
        },
        {
          class: "bg-color-danger",
          name: "#F03D3D",
          details: ""
        },
        {
          class: "bg-color-lighter",
          name: "#F8F9FB",
          details: ""
        },
        {
          class: "bg-color-light",
          name: "#E1E4E8",
          details: ""
        },
        {
          class: "bg-color-medium",
          name: "#E8E8E8",
          details: ""
        },
        {
          class: "bg-color-dark",
          name: "#828282",
          details: ""
        }
      ]
  }
});
</script>


---
 {docsify-updated} 
