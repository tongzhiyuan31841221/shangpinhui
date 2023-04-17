<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(value, i) in list" :key="value.id">
        <img :src="value.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-for="val in list" :key="val.id"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper/js/swiper";
export default {
  name: "Carsouel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler(nv, ov) {
        // watch执行了知识代表数据有了，但数据未必渲染完了
        this.$nextTick(() => {
          let swiper = new Swiper(this.$refs.swiper, {
            loop: true,
            autoplay: {
              delay: 2000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          swiper.el.onmouseenter = function () {
            swiper.autoplay.stop();
          };
          swiper.el.onmouseleave = function () {
            swiper.autoplay.start();
          };
        });
      },
    },
  },
};
</script>

<style>
</style>