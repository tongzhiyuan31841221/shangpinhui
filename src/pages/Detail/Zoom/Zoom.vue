<template>
  <div @changedefault="getImg" class="spec-preview">
    <!--  skuImageList[curindex]最好用个单独的对象{}.img不会报错 -->
    <img :src="skuImageList[curindex].imgUrl || skuDefaultImg" />
    <div ref="container" @mousemove="changemove" class="event"></div>
    <div class="big">
      <img ref="big" :src="skuImageList[curindex].imgUrl || skuDefaultImg" />
    </div>
    <div ref="mask" class="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList", "skuDefaultImg"],
  data() {
    return {
      curindex: 0,
    };
  },
  methods: {
    getImg(index) {
      this.curindex = index;
      console.log(this.curindex + "zoom");
    },
    changemove(e) {
      let big = this.$refs.big;
      let mask = this.$refs.mask;
      let container = this.$refs.container;
      let left = 0;
      let top = 0;

      // 注意一下越界
      if (e.offsetX < mask.offsetWidth / 2) {
        left = 0;
      } else if (e.offsetX + mask.offsetWidth / 2 > container.offsetWidth) {
        left = container.offsetWidth - mask.offsetWidth;
      } else {
        left = e.offsetX - mask.offsetWidth / 2;
      }
      if (e.offsetY < mask.offsetHeight / 2) {
        top = 0;
      } else if (e.offsetY + mask.offsetHeight / 2 > container.offsetHeight) {
        top = container.offsetHeight - mask.offsetHeight;
      } else {
        top = e.offsetY - mask.offsetHeight / 2;
      }
      let radio = big.offsetWidth / container.offsetWidth;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -radio * left + "px";
      big.style.top = -radio * top + "px";
    },
  },
  mounted() {
    this.$bus.$on("getindex", this.getImg);
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>