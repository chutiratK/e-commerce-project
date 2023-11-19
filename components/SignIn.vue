<template>
    <div>
      <v-form>
        <center>
            <v-btn color="red" class="login-button" @click="signInWithGoogle">Login with Google</v-btn><br><br>
            <v-btn color="blue" class="login-button" @click="signInWithFacebook">Login with Facebook</v-btn>
        </center>
      </v-form>
    </div>
  </template>
  
<script lang="ts">
import Vue from 'vue';
// import PhoneModal from "./modals/phone-modal.vue"
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";

export default Vue.extend({
    methods: {
        async signInWithGoogle() {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
    
            try {
                await signInWithPopup(auth, provider);
                console.log('login with google success ja!');
            } catch (error) {
                console.error('error login in with google');
            }
        },
        async signInWithFacebook() {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log('Login with Facebook success:', user);
            } catch (error) {
                console.error('Error logging in with Facebook:', error.message);
            }
        },
    },
});
</script>
  
<style>

</style>
  
<!-- <script>
export default {
mounted(){
    const firebaseui = require('firebaseui');
    require("firebaseui/dist/firebaseui.css");

    const ui = 
    firebaseui.auth.AuthUI.getInstance() || 
    new firebaseui.auth.AuthUI(this.$fire.auth);

    const config = {
        signInOptions: [
            this.$fireModule.auth.PhoneAuthProvider.PROVIDER_ID,
            this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
            this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
            this.$fireModule.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: '/', 
    };
    ui.start("#auth-container", config);
},
};
</script> -->

<style>

</style>
  
  