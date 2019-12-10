# Border 边框
---


<div class="text-20 font-weight-bold mt-20 ">
		<h3>基本边框</h3>
		<div class="flex-wrap mt-12">
			<div v-for="item in borderData" class="m-20" style="width: 185px">
				<p class="font-weight-bold">{{ item.class }}</p>
				<span class="text-14">{{ item.details }}</span>
				<div :class="item.class" class="border-box bg-color-lighter flex-ju-al-center mt-8">
					{{ item.class }}
				</div>
			</div>
		</div>
		<h3>圆角Radius</h3>
		<div class="flex-wrap mt-12">
			<div v-for="item in borderRadiusData" class="m-20" style="width: 185px">
				<p class="font-weight-bold">{{ item.class }}</p>
				<span class="text-14">{{ item.details }}</span>
				<div :class="item.class" class="border-box bg-color-dark flex-ju-al-center mt-8">
					{{ item.class }}
				</div>
			</div>
		</div>
</div>

<script>
  new Vue({
    el: '#main',
    data:  {
	msg: 'Vue',
        borderData: [
          {
            class: 'border-outline',
            details: '外边框'
          },
          {
            class: 'border-none',
            details: '无边框'
          },
          {
            class: 'border-top',
            details: '上边框'
          },
          {
            class: 'border-right',
            details: '右边框'
          },
          {
            class: 'border-bottom',
            details: '下边框'
          },
          {
            class: 'border-left',
            details: '左边框'
          },
          {
            class: 'border-top-0',
            details: '上边框为none'
          },
          {
            class: 'border-right-0',
            details: '右边框为none'
          },
          {
            class: 'border-bottom-0',
            details: '下边框为none'
          },
          {
            class: 'border-left-0',
            details: '左边框为none'
          }
        ],
        borderRadiusData: [
          {
            class: 'radius-2',
            details: '圆角为2px'
          },
          {
            class: 'radius-4',
            details: '圆角为4px'
          },
          {
            class: 'radius-50',
            details: '圆角为50%'
          },
          {
            class: 'radius-top-4',
            details: '顶部圆角为4px'
          },
          {
            class: 'radius-right-4',
            details: '右边圆角为4px'
          },
          {
            class: 'radius-bottom-4',
            details: '底部圆角为4px'
          },
          {
            class: 'radius-left-4',
            details: '左边圆角为4px'
          }
        ]
    }
  })
</script>

---
 {docsify-updated} 
