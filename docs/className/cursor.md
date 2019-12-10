# Cursor 光标类型
---

### 示例

<div class="text-20 font-weight-bold mt-20 flex-wrap">
    <div v-for="item in cursorData" style="width: 185px">
			<p class="font-weight-bold">{{ item.class }}</p>
			<span class="text-14">{{ item.details }}</span>
			<div :class="item.class" class="flex-box bg-color-white border-outline flex-ju-al-center mt-8">
				{{ item.name }}
			</div>
    </div>
</div>


<script>
  new Vue({
    el: '#main',
	  data: {
	      cursorData: [
	        {
	          name: 'pointer',
	          class: 'cursor-pointer',
	          details: '显示小手状态'
	        },
	        {
	          name: 'move',
	          class: 'cursor-move',
	          details: '显示移动状态'
	        },
	        {
	          name: 'wait',
	          class: 'cursor-wait',
	          details: '显示等待状态'
	        },
	        {
	          name: 'not-allowed',
	          class: 'cursor-not-allowed',
	          details: '显示禁用状态'
	        }
	      ]
	    
	  }
	});
</script>


---
 {docsify-updated} 
