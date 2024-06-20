<template>
  <div>
    <center>
      <v-btn
        id="login-by-line-button"
        class="social-btn"
        elevation="0"
        outlined
        min-width="44"
        height="40"
        @click="logInWithLine"
      >
        <v-img
          id="login-by-line-button-image"
          class="float-right"
          :src="require('../assets/images/lineIcon.png')"
          width="24"
          :aspect-ratio="1"
        />
      </v-btn>
    </center>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import liff from "@line/liff";

@Component
export default class lineLiff extends Vue {
  isLoggedIn: boolean = false;
  pictureUrl: string = "";
  userId: string = "";
  displayName: string = "";
  statusMessage: string = "";
  email: string | undefined = "";
  phone: string = "";
  address: string = "";

  async logInWithLine() {
    try {
      liff
        .init({
          liffId: "2003517508-8gKpw6JQ",
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            this.getUserProfile();
          } else {
            liff.login();
          }
        });
    } catch (error) {
      console.error("Error login line: ", error);
    }
  }

  async getUserProfile() {
    if (liff.isLoggedIn()) {
      const user = await liff.getProfile();
    } else {
      console.log("ยังไม่ได้เข้าสู่ระบบด้วย LINE");
    }
  }
}
</script>
