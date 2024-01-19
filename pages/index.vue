<template >
  <v-app style="background-color: rgb(236, 236, 236);">
    <NavBar />
    <Nuxt />
      <Product />
  </v-app>
</template>

<script lang="ts">
import NavBar from "../components/NavBar.vue"
import Product from "../components/Product.vue"
import Search from '../components/searchTag.vue'

export default {
  name: 'home',
  components: { NavBar, Product, Search },
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
