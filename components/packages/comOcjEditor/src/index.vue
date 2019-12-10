<template>
  <div>
    <!-- 工具栏容器 -->
    <div :id="idToolbar"></div>
    <!-- 编辑器容器 -->
    <div :id="idEditor"></div>
  </div>
</template>
<script>
import EditorDocument from "@ckeditor/ckeditor5-build-decoupled-document";
import EditorInline from "@ckeditor/ckeditor5-build-balloon-block";
import "./zh-cn-document.js";
import "./zh-cn-inline.js";

export default {
    name: "comOcjEditor",
    props: {
    // 上传图片地址
    // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
    // 后台需要返回 {"uploaded":1,"url":"/"}
        uploadUrl: {
            type: String,
            default: "/"
        },
        // 默认数据
        defaultData: {
            type: String,
            default: ""
        },
        // 是否只读
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 主题
        kind: {
            type: String,
            default: "document"
        },
        // 加载完毕
        onloaded: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            // 编辑器实例
            editor: null,
            // 工具栏id
            idToolbar: "ocj-toolbar-" + Number(`${Math.random()}`.split(".")[1]),
            // 编辑器id
            idEditor: "ocj-editor-" + Number(`${Math.random()}`.split(".")[1])
        };
    },
    mounted() {
    // 初始化
        this.initCKEditor();
    },
    methods: {
    // 获取方法
        getRef() {
            return this.editor;
        },
        // 初始化
        async initCKEditor() {
            let Editor = null;
            console.log(EditorDocument);
            // 默认类型
            if (this.kind === "document") {
                Editor = EditorDocument;
                // // 汉化包
                // await import('./zh-cn-document.js');
                // // 默认主题
                // Editor = await import('@ckeditor/ckeditor5-build-decoupled-document');
            } else if (this.kind === "inline") {
                Editor = EditorInline;
                // // 汉化包
                // await import('./zh-cn-inline.js');
                // // 行内主题
                // Editor = await import('@ckeditor/ckeditor5-build-balloon-block');
            } else {
                return null;
            }
            Editor.create(document.querySelector(`#${this.idEditor}`), {
                // 中文
                language: `zh-cn-${this.kind}`,
                // 上传图片
                ckfinder: {
                    uploadUrl: this.uploadUrl
                },
                // 是否只读
                isReadOnly: this.isReadOnly
            })
                .then(editor => {
                    if (this.kind === "document") {
                        const toolbarContainer = document.querySelector(
                            `#${this.idToolbar}`
                        );
                        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                    }
                    // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
                    this.editor = editor;
                    editor.setData(this.defaultData);
                    // 加载完毕
                    this.onloaded(editor);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>
<style scoped>
.ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),
.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners {
  border: 1px solid #d6d6d6;
}
</style>
