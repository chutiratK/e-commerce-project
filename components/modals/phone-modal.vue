<template>
    <v-dialog class="phone-login" v-model="showPhoneModal" max-width="400px">
        <v-card style="background-color: grey">
            <v-card-title>Phone Login</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field 
                    type="tel"
                    label="Phone Number" 
                    id="phonenumber"
                    v-model="phoneNumber"
                    placeholder="+66xxxxxxxxx"
                    >
                    </v-text-field>
                    <div id="recaptcha-container" style="width:300px; margin:auto;"></div>
                <center>   
                    <v-btn class="login-button" @click="sendOTP">Send OTP</v-btn>
                </center>
                </v-form>
                <center>
                    <div v-if="warningPhone" class="warningPhone">Please enter phone number.</div>
                    <div v-else-if="invalidPhone" class="invalidPhone">Invalid phone number.</div>
                </center>
            
                <div>
                    <v-text-field
                    v-model="otp"
                    pattern="[0-9]{6}"
                    maxlength="6"
                    placeholder="Enter OTP"
                    ></v-text-field>
                    <center>
                        <v-btn @click="verifyOTP">Verify OTP</v-btn>
                        <div v-if="warningOTP" class="warningOTP">Please enter OTP.</div>
                        <div v-else-if="wrongOTP" class="wrongOTP">Invalid OTP.</div>
                    </center>
                <br>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider  } from "firebase/auth";
import { EventBus } from '../../event-bus.js';

export default Vue.extend({
    data: () => ({
        phoneNumber: '',
        showPhoneModal: false,
        confirmationResult: null,
        otp: null,
        recaptchaVerifier: null,
        warningPhone: false,
        warningOTP: false,
        wrongOTP: false,
        invalidPhone:false,
    }),
    methods: {
        async sendOTP() {
            const auth = getAuth();
            if (!this.phoneNumber) {
                this.warningPhone = true;
            } else {
                try {
                    const isPhoneNumberRegistered = await this.checkPhoneNumberRegistered(this.phoneNumber);
                    if (isPhoneNumberRegistered) {
                        const appVerifier = new RecaptchaVerifier('recaptcha-container', {
                            size: 'invisible',
                            callback: (response) => {
                                console.log('Recaptcha verified:', response);
                            },
                        }, auth);

                        const confirmationResult = await signInWithPhoneNumber(auth,this.phoneNumber, appVerifier);
                        this.confirmationResult = confirmationResult;
                        console.log("OTP sent successfully", confirmationResult);
                    } else {
                        this.invalidPhone = true;
                        return;
                    }
                } catch (error) {
                    this.invalidPhone = true
                    console.error("Error sending OTP:", error);
                }
            }
            
        },
        async verifyOTP() {
            if (!this.otp) {
                this.warningOTP = true;
            } else if (this.otp !== this.confirmationResult.verificationId){
                this.wrongOTP = true;
            }
            try {
                if (this.confirmationResult) {
                    const credential = PhoneAuthProvider.credential(
                        this.confirmationResult.verificationId,
                        this.otp
                    );

                    await signInWithCredential(getAuth(), credential);

                    console.log("OTP verified successfully");
                }
            } catch (error) {
                console.error("Error verifying OTP:", error);
            }
        },
        async checkPhoneNumberRegistered(phoneNumber) {
            const auth = getAuth();
            try {
                const provider = new PhoneAuthProvider(auth);
                const appVerifier = new RecaptchaVerifier('recaptcha-container', {
                    size: 'invisible',
                    callback: (response) => {
                        console.log('Recaptcha verified:', response);
                    },
                }, auth);
                
                await provider.verifyPhoneNumber(phoneNumber, appVerifier);
                return true; 
            } catch (error) {
                if (error.code === 'auth/invalid-phone-number') {
                    return false; 
                }
                throw error;
            }
            },
    },
    mounted() {
        EventBus.$on('show-phone-modal', () => {
            this.showPhoneModal = true;
        });
    },
});
</script>
<style>
.warningPhone {
    color: red;
    text-align: center;
}
.warningOTP {
    color: red;
    text-align: center;
}
.wrongOTP {
    color: red;
    text-align: center;
}
.invalidPhone {
    color: red;
    text-align: center;
}
</style>