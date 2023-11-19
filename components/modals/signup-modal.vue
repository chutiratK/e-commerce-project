<template>
    <v-dialog max-width="400px" v-model="showSignUpModal">
        <v-card style="background-color: grey">
            <v-card-title>Sign Up</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="signUpWithEmail">
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                    <div style="display: flex; align-items: center;">
                        <v-text-field 
                        v-model="password" 
                        label="Password" 
                        :type="showPassword ? 'text' : 'password'" 
                        ></v-text-field><v-btn @click="togglePassword" icon>
                            <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                        </v-btn>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <v-text-field v-model="confirmPassword" label="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"></v-text-field>
                        <v-btn @click="toggleConfirmPassword" icon>
                            <v-icon>{{ showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                        </v-btn>
                    </div>
                    <center>
                        <div v-if="passwdMismatch" class="passwdMismatch">Password and Confirm Password do not match</div><br>
                        <v-btn type="submit" color="primary">Sign Up</v-btn>
                    </center>
                </v-form>
                <center>
                    <!-- <v-btn @click="signUpWithPhone" color="green">Sign Up with Phone</v-btn>
                    <SignUpPhone/> -->
                </center>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { EventBus } from '../../event-bus.js';
import SignUpPhone from "../modals/phone-signup.vue";
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';

export default ({
    data: () => ({
        showSignUpModal: false,
        email: '',
        password: '',
        confirmPassword: '',
        passwdMismatch: false,
        showPassword: false, 
        showConfirmPassword: false, 
    }),
    components: { SignUpPhone },
    methods: {
        signUpWithPhone() {
            EventBus.$emit('show-signup-phone-modal');
            this.showSignUpModal = false;
        },
        signUpWithEmail() {
            if (this.password == this.confirmPassword) {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth,this.email, this.password)
                .then((userCredential) => {
                    console.log('User signed up:', userCredential.user);
                    this.showSignUpModal = false;
                    alert("Sign up with email success!!!")
                    
                }) .catch((error) => {
                    console.error('Sign-up error:', error.message);
                });
            } else {
                this.passwdMismatch = true;
            }
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmPassword() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
    },
    mounted() {
        EventBus.$on('show-signup-modal', () => {
            this.showSignUpModal = true;
        });
    },
})
</script>

<style>
.passwdMismatch {
    color: red;
    text-align: center;
}
</style>