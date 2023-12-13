<template>
  <v-app>
    <v-main style="background-color:rgb(236, 236, 236);">
      <v-container>
        <Nuxt />
        <!-- <ShopCart v-if="cartVisible"/> -->
      </v-container>
    </v-main>
    <ShoppingCart v-if="isCartOpen" />
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ShopCart from '../components/ShoppingCart.vue'
export default {
  name: 'DefaultLayout',
  components: {
    ShopCart,
  },
  data:() => ({
    
  }),
  computed: {
    isCartOpen() {
      return this.$store.state.isCartOpen;
    },
  },
}
</script>
