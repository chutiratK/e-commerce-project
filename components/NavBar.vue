<template>
    <nav>
        <v-app-bar
            flat 
            app 
            elevation="4" 
            rounded
        >
            <v-toolbar-title class="text-uppercase grey--text">
                <span> E-Commerce  </span>
                <span class="font-weight-light">E-Comjai</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        
            <v-flex class="mt-4 mb-3">
                <template v-if="currentUser">
                    <span>Welcome</span>
                    <v-btn text class="icon-button" @click="signOut">
                        <i class="bi bi-box-arrow-right"></i>
                    </v-btn>
                </template>
                <template v-else>
                    <Modal />
                </template>
            </v-flex>
        </v-app-bar>
    </nav>
</template>

<script lang="ts">
import "bootstrap-icons/font/bootstrap-icons.css";
import "firebase/auth";
import { getAuth, signOut } from 'firebase/auth';
import Vue from 'vue'
import Modal from '../components/modals/login-modal.vue'

export default Vue.extend ({
    name: "NavBar",
    components: { Modal }, 
    computed: { 
        currentUser() {
            return this.$store.state.user
        },
    },
    methods: {
        async signOut() {
            const auth = getAuth();
            signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
                console.error("error: ")
            });
        },
    }

    // async asyncData({ $fire }) {
    //     const user = $fire.auth.currentUser;
    //     return { user };
    // },
    // methods: {
    //     async signIn() {
    //         const { $fire } = this;
    //         if (!$fire.auth.currentUser) {
    //             // ทำงานที่นี่
    //         }
    //     },
    // },
});
</script>

<style>

.icon-button {
  background: transparent; 
  border: none;
  padding: 0; 
  cursor: pointer;
}
</style>