<template>
  <v-dialog max-width="600px" v-model="showDialogSignin">
    <template v-slot:activator="{ on }">
      <v-btn text class="primary" v-on="on"> Sign in </v-btn>
    </template>
    <loginSection />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import loginSection from "../LoginSection.vue"

export default Vue.extend({
  data: () => ({
    showDialogSignin: false,
    showDialogSignup: false,
    showPhoneModal: false,
  }),
  components: { loginSection },
});
</script>

<style>

</style>
