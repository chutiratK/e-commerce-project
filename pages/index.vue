<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <Product />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import NavBar from "../components/NavBar.vue";
import Product from "../components/Product.vue";
import Search from "../components/searchTag.vue";
import liff from "@line/liff";
import axios from "axios";

@Component
export default class lineLiff extends Vue {
  pictureUrl: string = "";
  userId: string = "";
  name: string = "";
  email: string | undefined = "";

  components = {
    NavBar,
    Product,
    Search,
  };

  async getUserProfile() {
    try {
      if (liff.isLoggedIn()) {
        const user = await liff.getProfile();
        await this.storeUserDataInFirestore(user, "line");
        await this.sendUserDataToCloudFunction(user);
      } else {
        console.log("ยังไม่ได้เข้าสู่ระบบด้วย LINE");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async main() {
    try {
      await liff.init({ liffId: "2003517508-8gKpw6JQ" });
      if (liff.isInClient()) {
        await this.getUserProfile();
      } else {
        if (liff.isLoggedIn()) {
          await this.getUserProfile();
          console.log("access_token: ", liff.getAccessToken());
        } else {
          console.log("ยังไม่ได้เข้าสู่ระบบด้วย LINE");
        }
      }
    } catch (error) {
      console.error("login error", error);
    }
  }

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
        console.log("Document already exist ja ");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async sendUserDataToCloudFunction(user: any) {
    try {
      const response = await axios.post(
        "https://us-central1-nuxt-firebase-auth-6c26b.cloudfunctions.net/authenticateWithLine",
        {
          access_token: liff.getAccessToken(),
          id: user.userId,
          name: user.displayName,
          picture: user.pictureUrl,
          email: liff.getDecodedIDToken()?.email,
        }
      );

      const firebaseToken = response.data.token;
    } catch (error) {
      console.error("Error sending data to Cloud Function:", error);
    }
  }

  async mounted() {
    await this.main();
  }
}
</script>
