# flex 弹性盒子
---

### 示例

<div class="flex-wrap">
        <div v-for="item in flexData" class="mr-24 mb-24 cursor-pointer" style="width: 185px">
            <p class="font-weight-bold">{{ item.class }}</p>
            <span class="text-14">{{ item.details }}</span>
            <div :class="item.class" class="flex-box mt-8">
                <div v-for="items in item.num"></div>
            </div>
        </div>
        <div class="mr-24 mb-24" style="width: 200px">
            <p class="font-weight-bold">flex-auto</p>
            <span class="text-14">带flex-auto元素占据剩余宽高</span>
            <div class="flex-box d-flex mt-8">
                <div v-for="items in 1"></div>
                <div class="flex-auto"></div>
            </div>
        </div>
    </div>

<script>
new Vue({
  el: '#main',
  data: {
      flexData: [
                {
                    class: 'd-flex',
                    num: 2,
                    details: '设置元素display为flex'
                },
                {
                    class: 'flex-wrap',
                    num: 6,
                    details: '元素换行'
                },
                {
                    class: 'flex-column',
                    num: 6,
                    details: '元素垂直排列'
                },
                {
                    class: 'flex-ju-end',
                    num: 2,
                    details: '在元素末尾位置水平对齐'
                },
                {
                    class: 'flex-ju-center',
                    num: 1,
                    details: '居中水平对齐'
                },
                {
                    class: 'flex-ju-between',
                    num: 2,
                    details: '两端不留白水平对齐'
                },
                {
                    class: 'flex-al-center',
                    num: 1,
                    details: '在元素中间位置垂直对齐'
                },
                {
                    class: 'flex-ju-al-center',
                    num: 1,
                    details: '元素水平垂直居中对齐'
                },
                {
                    class: 'flex-ju-al-between',
                    num: 2,
                    details: '元素水平两端，垂直居中对齐'
                }
            ]
  }
})
</script>
---
 {docsify-updated} 
