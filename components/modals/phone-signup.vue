<template>
    <v-dialog max-width="400px" v-model="showSignUpPhoneModal">
        <v-card style="background-color: grey">
            <v-card-title>Sign Up With Phone</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="sendOTP">
                    <v-text-field 
                    v-model="phoneNumber" 
                    label="Phone Number"
                    placeholder="+66xxxxxxxxx" 
                    required></v-text-field>
                    <v-btn type="submit" color="primary">Send OTP</v-btn>
                </v-form>
                <!-- <div id="recaptcha-container"></div> -->
                <v-form @submit.prevent="signUpWithPhone">
                    <v-text-field
                    v-model="otp"
                    pattern="[0-9]{6}"
                    maxlength="6"
                    placeholder="Enter OTP"
                    ></v-text-field>
                    <v-btn color="primary" type="submit">Verify</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { EventBus } from '../../event-bus.js';
import { getAuth , PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential } from 'firebase/auth';

export default Vue.extend ({
    data: () => ({
        showSignUpPhoneModal: false,
        phoneNumber: '',
        otp: '',
        confirmationResult: null,
        appVerifier: null,
    }),
    methods: {
        async sendOTP() {
            const auth = getAuth();
            try {

                const appVerifier = new RecaptchaVerifier('recaptcha-container', {
                    size: 'invisible',
                    callback: (response:any) => {
                        console.log('Recaptcha verified');
                    },
                }, auth);
                this.confirmationResult = await signInWithPhoneNumber(auth, this.phoneNumber, appVerifier);

                console.log("OTP sent successfully");
            } catch (error) {
                console.error('Error sending OTP', error);
            }
        },
        async signUpWithPhone() {
            try {
                if (this.confirmationResult !== null) {
                    const credential = PhoneAuthProvider.credential(
                        this.confirmationResult.verificationId,
                        this.otp
                    );
                    await signInWithCredential(getAuth(), credential);
                }

                console.log('User signed in successfully');
            } catch (error) {
                console.error('Error signing in with phone', error);
            }
        },
    },
    mounted() {
        EventBus.$on('show-signup-phone-modal', () => {
            this.showSignUpPhoneModal = true;
        });
    },
});
</script>

<style>

</style>