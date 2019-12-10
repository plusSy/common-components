<template>
  <textarea></textarea>
</template>
<script>
// const baseURL =
//   "//ocj-erp-frontendonline.oss-cn-shanghai.aliyuncs.com/common/tinymce/";
const baseURL = "//frontendonline-erp.ocj.com.cn/common/tinymce/";
const uploadFail = "//frontendonline-erp.ocj.com.cn/common/upload-fail.png";
// 一像素展位图
const ploceholder = "//frontendonline-erp.ocj.com.cn/img/s.gif";
export default {
  props: ["name", "value", "upload", "params"],
  data() {
    return {
      editor: null,
      innerChange: false
    };
  },
  watch: {
    value() {
      if (this.innerChange) {
        return (this.innerChange = false);
      }
      this.reset();
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  beforeDestroy() {
    this.remove();
  },
  methods: {
    reset() {
      if (this.editor === null) {
        return this.init();
      }
      if (this.value) {
        return this.editor.setContent(this.value);
      }
      this.editor.setContent("");
    },
    load() {
      let script = document.createElement("script");
      script.src = baseURL + "tinymce.min.js";
      document.body.appendChild(script);
      script.onload = script.onreadystatechange = this.init;
    },
    remove() {
      window.tinyMCE.remove(this.editor);
    },
    init() {
      let tinyMCE = window.tinyMCE,
        uploadURL = this.upload || "/api/bom/upload/image",
        that = this;
      if (!tinyMCE) {
        return this.load();
      }
      if (this.editor) {
        this.remove();
      }
      tinyMCE.init({
        target: this.$el,
        menubar: false,
        statusbar: false,
        images_dataimg_filter: img => {
          return false;
        },
        toolbar:
          "undo redo | bold italic underline styleselect image link | alignleft aligncenter alignright | numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen",
        plugins:
          "autolink fullscreen image link table charmap advlist lists charmap emoticons",
        toolbar_drawer: "floating",
        width: "100%",
        language: "zh_CN",
        link_title: false,
        image_description: false,
        images_upload_credentials: true,
        images_upload_handler: (blobInfo, success, failure) => {
          let xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", uploadURL);
          let tokenInfo = ocj.getToken();
          if (tokenInfo) {
            xhr.setRequestHeader("token", tokenInfo.token);
            xhr.setRequestHeader("source", tokenInfo.source);
          }
          xhr.onload = function() {
            let json;
            if (xhr.status !== 200) {
              return success(uploadFail);
            }
            json = JSON.parse(xhr.responseText);
            if (!json || json.code !== "99990000") {
              return success(uploadFail);
            }
            if (json.data) {
              success(json.data.imagePath);
            }
          };
          formData = new FormData();
          formData.append(
            "info",
            JSON.stringify({
              suffix: "p_detail"
            })
          );
          const params = that.params;
          if (params) {
            for (let key in params) {
              formData.append(key, params[key]);
            }
          }
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          xhr.send(formData);
        },
        init_instance_callback: editor => {
          that.editor = editor;
          if (that.value) {
            editor.setContent(that.value);
          } else {
            editor.setContent("");
          }
          editor.on("Change", function(e) {
            that.innerChange = true;
            that.$emit("input", editor.getContent());
          });
        }
      });
    }
  }
};
</script>
