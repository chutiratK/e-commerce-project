<template>
    <v-card max-width="600px" class="login-modal">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="20" md="10" align="center">
        <v-card width="800" class="elevation-4 text-left" shaped>
            <v-card-title>Login</v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field
                label="email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="auth.email"
                ></v-text-field>

                <v-row class="password-field" align="center">
                <v-col cols="11">
                    <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="auth.password"
                    dense
                    ></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn @click="togglePassword" icon>
                    <v-icon>{{
                        showPassword ? "mdi-eye-off" : "mdi-eye"
                    }}</v-icon>
                    </v-btn>
                </v-col>
                </v-row>
                <center>
                <v-btn color="grey" class="login-button" @click="signIn"
                    >Login</v-btn
                >
                </center>
            </v-form>
            <div v-if="warningLogin" class="warningLogin">
                Please enter both email and password.
            </div>
            <div v-else-if="loginError" class="loginError">
                Invalid email or password.
            </div>
            </v-card-text>
            <p class="signup">
            not have an account? <a @click="signUp">Sign up</a>
            </p>
            <SignUp />
            <div class="social-btn">
            <PhoneModal />
            <LineLogin />
            <SignIn />
            </div>

            <br />
        </v-card>
        </v-col>
    </v-row>
    </v-card>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { EventBus } from "../event-bus.js";
  import SignIn from "./SignIn.vue";
  import SignUp from "./modals/signup-modal.vue";
  import PhoneModal from "./modals/phone-modal.vue";
  import LineLogin from "./LineLogin.vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { getFirestore, collection, addDoc } from "firebase/firestore";
  
  export default Vue.extend({
    data: () => ({
      showDialogSignin: false,
      showDialogSignup: false,
      showPhoneModal: false,
      warningLogin: false,
      loginError: false,
      showPassword: false,
      auth: {
        email: "",
        password: "",
        role: "",
      },
    }),
    components: { SignIn, SignUp, PhoneModal, LineLogin },
    methods: {
      signUp() {
        EventBus.$emit("show-signup-modal");
      },
      async signIn() {
        const auth = getAuth();
        const { email, password } = this.auth;
  
        if (!email || !password) {
          this.warningLogin = true;
          this.loginError = false;
          return;
        }
  
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          const user = result.user;
  
          await this.storeUserDataInFirestore(user, "email");
          this.showDialogSignin = false;
        } catch (error) {
          console.error("Error signing in:", error);
          this.loginError = true;
          this.warningLogin = false;
        }
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      async storeUserDataInFirestore(user: any, provider: string) {
        const db = getFirestore();
        const userRef = collection(db, "users");
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phone: user.phone || null,
          address: user.address || null,
          role: "user",
          provider: provider,
        };
  
        try {
          const docRef = await addDoc(userRef, userData);
          console.log("ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      },
    },
  });
  </script>
  
  <style>
  .login-modal {
    height: 400px;
    width: 600px;
    padding: 8px;
    overflow: hidden;
  }
  .social-btn {
    display: flex;
    justify-content: center;
    white-space: break-spaces;
    gap: 10px;
  }
  .warningLogin {
    color: red;
    text-align: center;
  }
  .loginError {
    color: red;
    text-align: center;
  }
  
  .signup {
    text-align: center;
  }
  </style>