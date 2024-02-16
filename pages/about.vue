<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <h1>About</h1>
    <!-- <LineLogin /> -->
  </v-app>
</template>

<script>
import LineLogin from "../components/LineLogin.vue";
export default {
  components: { LineLogin },
};
</script>
