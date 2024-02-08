<template>
  <div>
    <Nuxt />
    <NavBar />
    <v-card
      style="background-color: rgb(255, 255, 255)"
      class="paymentSuccessCard"
    >
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment.</p>
      <v-btn class="backhome" @click="backHome">BACK TO HOME</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "about",
  methods: {
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.paymentSuccessCard {
  width: 400px;
  height: 300px;
  border-radius: 8px;
  padding: 8px;
  margin: auto;
  margin-top: 50px;
}
.paymentSuccessCard h1,
p {
  color: rgb(67, 67, 67) !important;
  margin-left: 40px;
}
.backhome {
  margin-left: 120px;
  margin-top: 100px;
}
</style>
