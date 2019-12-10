import Vue from 'vue';
class Dialog {
  constructor() {
      this.baseDialogOptions = {
          data() {
              return {
                  visible: false,
              };
          },
          methods: {
              /**
               * 显示dialog
               */
              open() {
                  this.visible = true;
              },
              /**
               * dialog 是否展示
               */
              isShowing() {
                  return this.visible;
              },
              /**
               * 隐藏dialog
               */
              close() {
                  this.visible = false;
              }
          }
      }
  }
  createDialog(dialog, options = {}) {
      let dialogVM = new(Vue.extend(dialog))({
          el: document.createElement('div'),
          mixins: [this.baseDialogOptions],
          propsData: {
              ...options
          },
          watch: {
              visible(val){
                  if (!val) {
                      document.body.removeChild(dialogVM.$el);
                  } else {
                      document.body.appendChild(dialogVM.$el);
                  }
              }
          }
      });
      return dialogVM;
  }

}  
export default new Dialog();
