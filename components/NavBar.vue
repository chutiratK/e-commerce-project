<template>
  <nav>
    <v-app-bar flat app elevation="4" rounded>
      <router-link :to="{ name: 'index' }" class="index">
        <v-toolbar-title class="text-uppercase grey--text">
          <span> E-Commerce </span>
          <span class="font-weight-light">E-Comjai</span>
        </v-toolbar-title>
      </router-link>
      <toggleBar />
      <span> </span>
      <Search />
      <div class="navbar">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About</router-link>
        <router-link class="link" to="/">Member</router-link>
        <template v-if="currentUser || isLineUser">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="transparent" dark v-bind="attrs" v-on="on">
                Welcome
              </v-btn>
            </template>
            <v-list style="background-color: rgba(255, 254, 254, 0.9)">
              <v-list-item @click="home" class="sub-menu-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >Home</v-list-item-title
                >
                <span>></span>
              </v-list-item>
              <v-list-item @click="goToProfile" class="sub-menu-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >Profile</v-list-item-title
                >
                <span>></span>
              </v-list-item>
              <v-list-item @click="toAddress" class="sub-menu-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="12"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#000000"
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >Address</v-list-item-title
                >
                <span>></span>
              </v-list-item>
              <v-list-item @click="wishList" class="sub-menu-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >wish list</v-list-item-title
                >
                <span>></span>
              </v-list-item>
              <v-list-item @click="orderPage" class="sub-menu-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >Order</v-list-item-title
                >
                <span>></span>
              </v-list-item>
              <v-list-item @click="signOut" class="sub-menu-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  />
                </svg>
                <v-list-item-title style="color: #525252"
                  >Sign Out</v-list-item-title
                >
                <span>></span>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="icon-cart">
            <button class="link" @click="toggleCart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
              >
                <path
                  d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                />
              </svg>
              <span>{{ cartItemCount }}</span>
            </button>
          </div>
        </template>
        <template v-else>
          <Modal />
        </template>
      </div>
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
import "bootstrap-icons/font/bootstrap-icons.css";
import "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Vue from "vue";
import Modal from "../components/modals/login-modal.vue";
import Search from "../components/searchTag.vue";
import toggleBar from "../components/ToggleBar.vue";
import liff from "@line/liff";

export default Vue.extend({
  name: "NavBar",
  components: { Modal, Search, toggleBar },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    // isLineUser() {
    //   return this.$store.state.user.isLineUser;
    // },
  },
  data: () => ({
    showCart: false,
    cartItemCount: "0",
    isLineUser: false,
  }),
  methods: {
    async signOut() {
      if (this.isLineUser) {
        await liff.logout();
        window.location.reload();
      } else {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // this.$router.go(0);
            this.$router.push("/");
          })
          .catch((error) => {
            console.error("error: ", error.message);
          });
      }
    },
    async updateCartItemCount() {
      const db = getFirestore();
      const cartDocRef = collection(
        db,
        "cart",
        this.currentUser.uid,
        "cartUser"
      );
      onSnapshot(cartDocRef, (snapshot) => {
        this.cartItemCount = snapshot.size.toString();
      });
    },
    async checkLineLogin() {
      if (liff.isLoggedIn()) {
        this.isLineUser = true;
        console.log("ล้อกอินไลน์");
        // this.runApp();
      } else {
        this.isLineUser = false;
      }

      // this.isLoggedIn = liff.isLoggedIn()
    },
    goToProfile() {
      this.$router.push("/account/profile");
    },
    home() {
      this.$router.push({ name: "index" });
    },
    pet() {
      this.$router.push({ path: "/product", query: { q: "pet" } });
      this.fetchData();
    },
    skincare() {
      this.$router.push({ path: "/product", query: { q: "skincare" } });
      this.fetchData();
    },
    furniture() {
      this.$router.push({ path: "/product", query: { q: "furniture" } });
      this.fetchData();
    },
    electronics() {
      this.$router.push({ path: "/product", query: { q: "electronics" } });
      this.fetchData();
    },
    toAddress() {
      this.$router.push("/account/address");
    },
    wishList() {
      this.$router.push("/account/wishList");
    },
    orderPage() {
      this.$router.push("/account/order");
    },
    toggleCart() {
      this.$router.push({ name: "shopCart" });
    },
  },
  mounted() {
    this.updateCartItemCount();
    this.checkLineLogin();
  },
});
</script>

<style>
.icon-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
.index {
  text-decoration: none;
  margin-left: 50px;
  margin-right: 30px;
  font-weight: bold;
}

.navbar {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 100px;
}
.link {
  font-weight: bold;
  text-decoration: none;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.5) !important;
}
.link:hover {
  color: rgb(217, 216, 216) !important;
}
.link svg {
  fill: #e0e0e0;
  margin-left: 10px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
}
.icon-cart .link {
  position: relative;
}
.icon-cart .link span {
  display: flex;
  background-color: #ff1818;
  width: 15px;
  height: 15px;
  font-size: 10px;
  color: #e5e2e2;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: -10px;
}
</style>
