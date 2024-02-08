<template>
  <v-app>
    <v-main style="background-color: rgb(236, 236, 236)">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <ShoppingCart v-if="isCartOpen" /> -->
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import ShopCart from "../components/ShoppingCart.vue";
export default {
  name: "DefaultLayout",
  components: {},
  data: () => ({}),
  computed: {
    isCartOpen() {
      return this.$store.state.isCartOpen;
    },
  },
};
</script>
