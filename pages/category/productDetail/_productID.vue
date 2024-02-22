<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <center>
      <div class="product-detail-card">
        <div v-if="loading" class="loading-spinner"></div>
        <div v-else>
          <img
            :src="imageUrl"
            alt="Product Image"
            width="200px"
            height="200px"
          />
          <div>
            <h1>{{ productName }}</h1>
            <p>{{ description }}</p>
            <p>฿ {{ price }}</p>
            <input
              type="number"
              class="quantity"
              v-model="quantity"
              min="1"
            /><br /><br />
            <v-btn @click="addToWishList" class="wishList">
              <span
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  /></svg
                >Add to Wish List
              </span>
            </v-btn>
            <v-btn @click="addToCart">Add to Cart</v-btn>
            <v-btn @click="backToHome" color="red">back</v-btn>
          </div>
        </div>
      </div>
    </center>
    <v-dialog v-model="addCartSuccess" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <center>
          <img
            src="../../../assets/images/check.webp"
            width="200px"
            height="200px"
          />
          <h3>added to cart successfully!</h3>
          <br />
          <v-btn class="success" @click="Success">ok</v-btn>
        </center>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addWishSuccess" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <center>
          <img
            src="../../../assets/images/check.webp"
            width="200px"
            height="200px"
          />
          <h3>added to wish list successfully!</h3>
          <br />
          <v-btn class="success" @click="Success">ok</v-btn>
        </center>
      </v-card>
    </v-dialog>
    <!-- <Modal ref="loginModal" /> -->
  </v-app>
</template>

<script lang="ts">
import NavBar from "../../../components/NavBar.vue";
import SignIn from "../../../components/SignIn.vue";
import Modal from "../../../components/modals/login-modal.vue";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default {
  name: "productDetail",
  components: { NavBar, SignIn, Modal },
  data: () => ({
    loading: true,
    productName: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: 1,
    category: "",
    productID: "",
    addCartSuccess: false,
    addWishSuccess: false,
  }),
  mounted() {
    this.fetchExistingData();
    this.$store.dispatch("fetchUser");
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  created() {
    this.category = this.$route.query.category;
    this.productID = this.$route.query.productID;
    console.log("this.searchQuery ", this.category, this.productID);
  },
  methods: {
    async fetchExistingData() {
      const db = getFirestore();
      const productDocRef = doc(
        db,
        "category",
        this.category,
        "products",
        this.productID
      );

      try {
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          this.productName = productData.productName;
          this.description = productData.description;
          this.imageUrl = productData.imageUrl;
          this.price = productData.price;
        } else {
          console.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      } finally {
        this.loading = false;
      }
    },
    async addToCart() {
      const db = getFirestore();
      const cartData = {
        productID: this.productID,
        category: this.category,
        productName: this.productName,
        description: this.description,
        imageUrl: this.imageUrl,
        price: this.price,
        quantity: this.quantity,
        selected: true,
      };
      if (this.currentUser) {
        try {
          const userCartDocRef = doc(db, "cart", this.currentUser.uid);
          const userCartDocSnapshot = await getDoc(userCartDocRef);

          if (userCartDocSnapshot.exists()) {
            await setDoc(userCartDocRef, {
              ...userCartDocSnapshot.data(),
              ...cartData,
            });
          } else {
            await setDoc(userCartDocRef, {});
          }

          const cartUserDocRef = doc(
            userCartDocRef,
            "cartUser",
            this.productID
          );
          await setDoc(cartUserDocRef, cartData);
          this.addCartSuccess = true;
          console.log("Add to cart success!");
        } catch (error) {
          console.error("Error adding product to cart:", error.message);
        }
      } else {
        this.$refs.loginModal.showModal();
      }
    },
    async addToWishList() {
      const db = getFirestore();
      const cartData = {
        productID: this.productID,
        category: this.category,
        productName: this.productName,
        imageUrl: this.imageUrl,
        price: this.price,
      };
      if (this.currentUser) {
        try {
          const userCartDocRef = doc(db, "wishList", this.currentUser.uid);
          const userCartDocSnapshot = await getDoc(userCartDocRef);

          if (userCartDocSnapshot.exists()) {
            await setDoc(userCartDocRef, {
              ...userCartDocSnapshot.data(),
              ...cartData,
            });
          } else {
            await setDoc(userCartDocRef, {});
          }

          const cartUserDocRef = doc(
            userCartDocRef,
            "wishListUser",
            this.productID
          );
          await setDoc(cartUserDocRef, cartData);
          this.addWishSuccess = true;
          console.log("Add to wish list success!");
        } catch (error) {
          console.error("Error adding product to wish list:", error.message);
        }
      } else {
        this.$refs.loginModal.showModal();
      }
    },
    backToHome() {
      this.$router.push("/");
    },
    Success() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.product-detail-card {
  border-radius: 10px;
  background-color: rgb(253, 253, 253);
  color: #5b5353;
  width: 500px;
  height: 500px;
  margin-top: 50px;
  padding: 30px;
  box-shadow: 0 30px 30px #a4a3a3;
}
.quantity {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 60px;
}
.product-detail-card img {
  border-radius: 15px;
}
.loading-spinner {
  margin: auto;
  margin-top: 180px;
}

.loading-spinner:before {
  content: "";
  box-sizing: border-box;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 7px solid #ccc;
  border-radius: 50%;
  border-top: 7px solid #666;
  animation: spin 1s linear infinite;
}
.popUp {
  height: 350px;
  padding: 8px;
}
.wishList {
  background-color: #5b5353;
}
.wishList svg {
  fill: #ffffff;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
