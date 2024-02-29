<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <h1>About</h1>
    <!-- <LineLogin /> -->
    <div class="swiper-container swiper-container-free-mode">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a>Slide 1</a>
        </div>
        <div class="swiper-slide">
          <a>Slide 2</a>
        </div>
        <div class="swiper-slide">
          <a>Slide 3</a>
        </div>
        <div class="swiper-slide">
          <a>Slide 4</a>
        </div>
        <div class="swiper-slide">
          <a>Slide 5</a>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import LineLogin from "../components/LineLogin.vue";
import Swiper from "swiper";

export default {
  components: { LineLogin },
  mounted() {
    var swiperOptions = {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      speed: 1000,
      grabCursor: true,
      mousewheelControl: true,
      keyboardControl: true,
    };
    var swiper = new Swiper(".swiper-container", swiperOptions);
  },
};
</script>

<style>
.swiper-container {
  height: calc(50vh - 120px);
  margin: 60px;
}

.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: linear;
}

.swiper-slide {
  overflow: hidden;
  background-position: center center;
  background-size: cover;
}
</style>
