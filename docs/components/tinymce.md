### tinyMCE 编辑器

---

<Common-code>
  <test-tinymce-tinymce></test-tinymce-tinymce>
  <highlight-code slot="codeText" lang="vue">
		<template>
        <com-ocj-tiny v-model="content"></com-ocj-tiny>
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
