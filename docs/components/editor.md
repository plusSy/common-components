### 富文本编辑器

<Common-code>
  <test-tinymce-tinymce></test-tinymce-tinymce>
  <highlight-code slot="codeText" lang="vue">
		<template>
    <div>
      <com-ocj-editor></com-ocj-editor>
    </div>
    </template>
    <script>
    export default {
        name: 'pager',
        data() {
            return {
                content:'表单基础数据'
            }
        },
        methods: {
            doit(){},
            $comSelectChange(data) {
                this.pager = Object.assign(this.pager, data)
                this.doit()
            }
        }
    }
    </script>
  </highlight-code>
</Common-code>

### 富文本 props

| Props  | name                     | default |
| ------ | ------------------------ | ------- |
| upload | 图片上传请求地址         |         |
| params | 图片上传时，自定义的参数 | {}      |

---

{docsify-updated}
