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

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component
export default class lineLiff extends Vue {}
</script>
