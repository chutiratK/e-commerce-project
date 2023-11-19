<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <Nuxt />
    <div class="flex flex-column align-start align-self-styart justify-start">
      <h1>HOME</h1>
      <!-- <p>logged in</p> -->
    </div>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue"

export default {
  name: 'IndexPage',
  components: { NavBar },

}
</script>
