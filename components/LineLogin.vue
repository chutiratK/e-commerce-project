<template>
  <div>
    <!-- <img :src="pictureUrl" width="25%" />
    <p><b>UserId:</b> {{ userId }}</p>
    <p><b>DisplayName:</b> {{ displayName }}</p>
    <p><b>StatusMessage:</b> {{ statusMessage }}</p>
    <p><b>Email:</b> {{ email }}</p> -->
    <center>
      <v-btn
        v-if="!isLoggedIn"
        id="login-by-line-button"
        class="social-btn"
        elevation="0"
        outlined
        min-width="44"
        height="40"
        @click="logIn"
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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

  // @Watch("isLoggedIn")
  // onTimeChange() {
  //   console.log("profile jaaa:", this.isLoggedIn);
  // }

  // runApp() {
  //   liff
  //     .getProfile()
  //     .then((profile: any) => {
  //       this.pictureUrl = profile.pictureUrl;
  //       this.userId = profile.userId;
  //       this.displayName = profile.displayName;
  //       this.statusMessage = profile.statusMessage;
  //       this.email = liff.getDecodedIDToken()?.email;
  //     })
  //     .catch((err: any) => console.error(err));
  // }

  // async mounted() {
  //   await this.initLIFF();
  //   await this.main();
  // }

  // async initLIFF() {
  //   await liff.init({ liffId: "2003517508-8gKpw6JQ" });
  // }

  async logIn() {
    try {
      await liff.init({ liffId: "2003517508-8gKpw6JQ" });

      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
        return;
      }

      const user = await this.getUserProfile();
      console.log("ผู้ใช้เข้าสู่ระบบด้วย line จ้า:", user);
    } catch (error) {
      console.error("Error login line: ", error);
    }
  }

  async getUserProfile() {
    if (liff.isLoggedIn()) {
      const user = await liff.getProfile();
      // console.log("profile ja:", user);
      // this.runApp();
      await this.storeUserDataInFirestore(user, "line");
      this.isLoggedIn = true;
    } else {
      console.log("ยังไม่ได้เข้าสู่ระบบด้วย LINE");
    }
  }

  // async main() {
  //   if (liff.isInClient()) {
  //     await this.getUserProfile();
  //   } else {
  //     if (liff.isLoggedIn()) {
  //       await this.getUserProfile();
  //       this.isLoggedIn = true;
  //     } else {
  //       this.isLoggedIn = false;
  //     }
  //   }
  // }

  async storeUserDataInFirestore(user: any, provider: string) {
    const db = getFirestore();
    const userRef = doc(db, "users", user.userId);
    try {
      const docSnapshot = await getDoc(userRef);
      if (!docSnapshot.exists()) {
        const userData = {
          uid: user.userId,
          displayName: user.displayName || null,
          email: liff.getDecodedIDToken()?.email || null,
          phone: user.phone || null,
          address: user.address || null,
          role: "user",
          provider: provider,
        };

        await setDoc(userRef, userData);
        console.log("Document added with ID: ", user.uid);
      } else {
        console.log("Document already exist ");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}
</script>
