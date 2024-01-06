<template >
  <v-app style="background-color: rgb(236, 236, 236);">
    <NavBar />
    <Nuxt />
      <div >
      <Product />
      </div>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import Product from "../components/Product.vue"

export default {
  name: 'home',
  components: { NavBar, Product },
  head() {
    return {
      script: [
        { src: "https://js.stripe.com/v3/" }
      ]
    };
  },
}
</script>

<style>

</style>
