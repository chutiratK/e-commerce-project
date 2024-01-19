<template>
    <div >
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
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export default Vue.extend({
    
    methods: {
        async signInWithGoogle() {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
    
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                const docRefId = await this.storeUserDataInFirestore(user, 'google');
                this.$router.go(0);
                console.log('login with google success ja!', docRefId);
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

                const docRefId = await this.storeUserDataInFirestore(user, 'facebook');
                this.$router.go(0);
                console.log('login with facebook success', docRefId);
                
            } catch (error) {
                console.error('Error logging in with Facebook:', error);
            }
        },
        async storeUserDataInFirestore(user: any, provider: string) {
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            try {
                const docSnapshot = await getDoc(userRef);
                if (!docSnapshot.exists()) {
                    const userData = {
                        uid: user.uid,
                        displayName: user.displayName || null,
                        email: user.email || null,
                        phone: user.phone || null, 
                        address: user.address || null, 
                        role: 'user', 
                        provider: provider,
                    };

                    await setDoc(userRef, userData);
                    console.log('Document added with ID: ', user.uid);
                } else {
                    console.log('Document already exist ');
                }
                return user.uid;
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    },
});
</script>
  
<style>

</style>
  
  