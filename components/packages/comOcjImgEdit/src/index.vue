<!--
 * @Author: zhangyonggang
 * @Date: 2019-08-14 13:47:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-08-21 14:51:31
 * @Description: detial
 -->
<template>
  <div class="wrapper" style="width:480px;">
    <div>坐标点(截图框相对于图片)</div>
    <div>左上角:{{ oX }},{{ oY }}</div>
    <div>剪辑框的宽度:{{ cropWidth }}</div>
    <div>放大倍数:{{ Math.round(scale * 100) / 100 }}</div>
    <div>旋转度数:{{ rotate }}</div>
    <div class="test" style="width:480px;">
      <vueCropper
        ref="cropper"
        aspectRatio="1/1"
        :img="imgUrl"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :info="option.info"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        @realTime="realTime"
        :enlarge="option.enlarge"
        fixed
        :fixedNumber="option.fixedNumber"
      ></vueCropper>
      <div class="test-button">
        <el-button @click="refreshCrop" size="mini" icon="el-icon-close">取消</el-button>
        <div class="button-icon">
          <svg
            @click="refreshCrop"
            t="1566200951215"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9289"
            width="26"
            height="26"
          >
            <path
              d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9 0.6 3.7 1.8 5.2 2.9 3.6 8.1 4.3 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8c-1.5-1.2-3.3-1.8-5.2-1.8-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8z m752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-0.6-3.7-1.8-5.2-2.9-3.6-8.1-4.3-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-0.2-4.4-3.8-8-8.2-8z"
              p-id="9290"
            />
          </svg>
          <svg
            @click="changeScale(1)"
            t="1566200352775"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8816"
            width="26"
            height="26"
          >
            <path
              d="M855 160.1l-189.2 23.5c-6.6 0.8-9.3 8.8-4.7 13.5l54.7 54.7-153.5 153.5c-3.1 3.1-3.1 8.2 0 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l153.6-153.6 54.7 54.7c4.7 4.7 12.7 1.9 13.5-4.7L863.9 169c0.7-5.2-3.7-9.6-8.9-8.9zM416.6 562.3c-3.1-3.1-8.2-3.1-11.3 0L251.8 715.9l-54.7-54.7c-4.7-4.7-12.7-1.9-13.5 4.7L160.1 855c-0.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-0.8 9.3-8.8 4.7-13.5l-54.7-54.7 153.6-153.6c3.1-3.1 3.1-8.2 0-11.3l-45.2-45z"
              p-id="8817"
            />
          </svg>
          <svg
            @click="changeScale(-1)"
            t="1566200461028"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8934"
            width="26"
            height="26"
          >
            <path
              d="M881.7 187.4l-45.1-45.1c-3.1-3.1-8.2-3.1-11.3 0L667.8 299.9l-54.7-54.7c-4.7-4.7-12.7-1.9-13.5 4.7L576.1 439c-0.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-0.8 9.3-8.8 4.7-13.5l-54.7-54.7 157.6-157.6c3-3 3-8.1-0.1-11.2zM439 576.1l-189.2 23.5c-6.6 0.8-9.3 8.9-4.7 13.5l54.7 54.7-157.5 157.5c-3.1 3.1-3.1 8.2 0 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l157.6-157.6 54.7 54.7c4.7 4.7 12.7 1.9 13.5-4.7L447.9 585c0.7-5.2-3.7-9.6-8.9-8.9z"
              p-id="8935"
            />
          </svg>
          <svg
            @click="rotateLeft"
            t="1566200868043"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9170"
            width="26"
            height="26"
          >
            <path
              d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H188V494h440v326z"
              p-id="9171"
            />
            <path
              d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-0.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7 0.4 12.6-6.1v-63.9c12.9 0.1 25.9 0.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8 11 40.7 14 82.7 8.9 124.8-0.7 5.4-1.4 10.8-2.4 16.1h74.9c14.8-103.6-11.3-213-81-302.3z"
              p-id="9172"
            />
          </svg>
        </div>
        <el-button @click="done" size="mini" type="success" plain icon="el-icon-check">确定</el-button>
      </div>
    </div>

    <!-- <div>坐标点(图片相对于容器)</div>
    <div>x1 // 左上角{{ imgAxis.x1 }}</div>
    <div>x2// 右上角{{ imgAxis.x2 }}</div>
    <div>y1 // 左下角{{ imgAxis.y1 }}</div>
    <div>y2// 右下角{{ imgAxis.y2 }}</div>-->
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  props: ["imgUrl"],
  data: function() {
    return {
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},

      img:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1004193740,755429050&fm=26&gp=0.jpg", //图片路径
      option: {
        full: false, //是否输出原图比例的截图
        info: true, //裁剪框的大小信息
        outputType: "png", //裁剪生成图片的格式
        canMove: true, //图片能否移动
        fixedBox: false, //固定截图框大小 不允许改变
        original: false, //上传图片按照原始比例渲染
        canMoveBox: true, //截图框能否拖动
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 200, //默认生成截图框宽度
        autoCropHeight: 200, //默认生成截图框高度
        centerBox: true, //截图框是否被限制在图片里面
        high: false, //是否按照设备的dpr 输出等比例图片
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "contain", //图片默认渲染方式
        fixedNumber: [1, 1] //截图框的宽高比例
      },
      //坐标信息
      cropAxis: {},
      imgAxis: {},
      oX: "", //左上角x坐标
      oY: "", //左上角y坐标
      downImg: "#",
      scale: "", //放大倍数
      rotate: "", //旋转度数
      cropWidth: "" //剪辑框宽度
    };
  },
  methods: {
    //取消剪辑
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
      this.$emit("refreshCrop");
    },
    //放大缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //确认剪辑
    done() {
      let _data={
        cropWidth:this.cropWidth,//剪辑框宽度
        scale:this.scale,//放大倍数
        oX:this.oX,//左上角X坐标
        oY:this.oY,//左上角Y坐标
        rotate:this.rotate//旋转角度
      }
      // console.log(_data)
      this.$emit("newImgUrl", _data);
    },
    // 实时预览函数
    realTime() {
      this.scale = this.$refs.cropper.scale;
      this.rotate = this.$refs.cropper.rotate;
      var cropAxis = this.$refs.cropper.getCropAxis(); //截图框对于容器
      var imgAxis = this.$refs.cropper.getImgAxis(); //图片相对于容器
      let cropNum = cropAxis.x2 - cropAxis.x1;
      let oXNum = cropAxis.x1 - imgAxis.x1;
      let oYNum = cropAxis.y1 - imgAxis.y1;
      this.cropWidth = Math.round(cropNum * 100) / 100;
      this.cropAxis = cropAxis;
      this.imgAxis = imgAxis;

      this.oX = Math.round(oXNum * 100) / 100;
      this.oY = Math.round(oYNum * 100) / 100;
    }
  },
  components: {
    VueCropper
  },
  mounted() {
    // console.log(VueCropper, "===");
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.content {
  margin: auto;
  width: 480px;
  margin-bottom: 100px;
}
.test {
  width: 480px;
  height: 540px;
  position: relative;
}
.test-button {
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: #ebebeb;
}
.button-icon {
  display: inline;
  padding: 0 54px;
}
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 10px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}
</style>
