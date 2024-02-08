<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <div class="shopCart-container">
      <div class="card mb-3 content">
        <h2 class="m-3 pt-3">Shopping Cart {{ this.cartItemCount }}</h2>
        <hr />
        <div class="card-body">
          <div v-if="cart.length === 0">
            <center>
              <img
                src="../assets/images/cart.webp"
                width="200px"
                height="200px"
              />
              <h3>Let's start shopping!</h3>
            </center>
          </div>
          <div v-else>
            <div class="selectedProduct">
              <div class="allCheck">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="selectAllItems"
                />
                <label>Select All</label>
              </div>
              <div v-for="(product, index) in cart" :key="index">
                <div
                  :class="{
                    item: true,
                    even: index % 2 === 0,
                    odd: index % 2 !== 0,
                  }"
                >
                  <input
                    type="checkbox"
                    v-model="product.selected"
                    class="checkbox"
                    @change="updateCart(product)"
                  />
                  <img
                    :src="product.imageUrl"
                    alt="Product Image"
                    width="50px"
                    height="50px"
                  />
                  <p>{{ product.productName }}</p>
                  <p id="price">฿{{ product.price }}</p>
                  <input
                    type="number"
                    class="updateQuatity"
                    v-model="product.quantity"
                    @change="updateCart(product)"
                    min="1"
                  />
                  <span class="bin" @click="deleteCart(product.productID)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ff3838"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <br />
              <hr />
              <div class="total">
                <h3>Total:</h3>
                <p>฿{{ totalAmount }}</p>
              </div>
              <div class="btn">
                <v-btn @click="checkOut">Check Out</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="delConfirmForm" max-width="300px">
        <v-card
          class="popUpdel"
          style="background-color: white; color: #5b5353"
        >
          <center>
            <h3>Are you sure to delete?</h3>
            <br />
            <v-btn class="green" @click="deleteFromCart">YES</v-btn>
            <v-btn class="red" @click="cancel">NO</v-btn>
          </center>
        </v-card>
      </v-dialog>
      <v-dialog v-model="delSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>delete successfully!</h3>
            <br />
            <v-btn class="green" @click="delfin">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import {
  getFirestore,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
interface Cart {
  productID: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selected: boolean;
}
export default {
  name: "Cart",
  components: {},
  data: () => ({
    loading: true,
    delConfirmForm: false,
    delSuccess: false,
    cart: [] as Cart[],
    selectAll: false,
    cartItemCount: 0,
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    totalAmount(): number {
      return this.cart.reduce(
        (total, product) =>
          product.selected ? total + product.price * product.quantity : total,
        0
      );
    },
  },
  methods: {
    submit() {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    async fetchUserData() {
      const db = getFirestore();
      const userCartRef = collection(
        db,
        "cart",
        this.currentUser.uid,
        "cartUser"
      );
      try {
        onSnapshot(userCartRef, (snapshot) => {
          const cartData: Cart[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as Cart;
            cartData.push(data);
          });
          this.cart = cartData;
          this.loading = false;
          console.log("cart", this.cart);
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
      try {
        onSnapshot(userCartRef, (snapshot) => {
          this.cartItemCount = snapshot.size.toString();
          console.log("cart: ", this.cartItemCount);
        });
      } catch (error) {
        console.error("Error fetching cart user data:", error.message);
      }
    },
    async deleteCart(productID: string) {
      this.deletingProductID = productID;
      this.delConfirmForm = true;
    },
    async deleteFromCart() {
      try {
        const db = getFirestore();
        const catalogDocRef = doc(
          db,
          "cart",
          this.currentUser.uid,
          "cartUser",
          this.deletingProductID
        );

        await deleteDoc(catalogDocRef);
        await this.fetchUserData();
        this.deletingProductID = "";
        this.delConfirmForm = false;
        this.delSuccess = true;
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    },
    async updateCart(product: Cart) {
      try {
        const db = getFirestore();
        const cartDocRef = doc(
          db,
          "cart",
          this.currentUser.uid,
          "cartUser",
          product.productID
        );
        updateDoc(cartDocRef, {
          quantity: product.quantity,
          selected: product.selected,
        });
      } catch (error) {
        console.error("Error updating selection:", error.message);
      }
    },
    selectAllItems() {
      this.cart.forEach((product) => {
        product.selected = this.selectAll;
        this.updateCart(product);
      });
    },
    checkOut() {
      this.$router.push("/checkout");
    },
    cancel() {
      this.delConfirmForm = false;
    },
    delfin() {
      this.delSuccess = false;
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style>
.shopCart h1 {
  margin-top: 70px;
  margin-left: 20px;
  font-weight: 300px;
}

.shopCart-container {
  margin: auto;
}
.content {
  border-radius: 10px;
  background-color: rgb(253, 253, 253);
  color: #5b5353;
  width: 700px;
  height: 100%;
}
.content h2,
hr {
  margin: 20px 40px;
}
.shopCart h2 {
  text-align: center;
}
.card-body {
  margin: 20px 40px;
}
.selectedProduct {
  display: flex;
  flex-direction: column;
}
.selectedProduct p {
  font-weight: bold;
  margin-top: auto;
}
.selectedProduct #price {
  color: #f74949;
}
.selectedProduct .item img {
  margin-left: 10px;
  border-radius: 50%;
}
.selectedProduct .item {
  display: grid;
  grid-template-columns: 10px 90px 30px 1fr 50px 40px;
  gap: 15px;
  text-align: center;
  align-items: center;
  padding: 9px;
  margin-top: auto;
}
.selectedProduct .btn {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
.selectedProduct .total {
  display: grid;
}
.selectedProduct .item .bin {
  cursor: pointer;
  align-self: center;
  margin-left: auto;
  margin-right: 25px;
}
.selectedProduct .item.odd {
  background-color: #ebeaea;
  border-radius: 5px;
}
.selectedProduct .item.even {
  background-color: #ffffff;
  border-radius: 5px;
}
.selectedProduct .total {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
}
.selectedProduct .total h3 {
  margin-right: 230px;
}
.selectedProduct .total p {
  color: #f74949;
  font-weight: bold;
  font-size: 125%;
  margin-right: 20px;
}
.sidebarCart hr {
  margin: 5px;
}
.updateQuatity {
  width: 50px;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  margin-left: auto;
  height: 30px;
}
.popUpdel {
  height: 200px !important;
  padding: 8px;
  margin: auto;
}
.popUpdel h3 {
  margin-top: 40px;
}
.popUp {
  padding: 15px;
  height: 350px;
}
</style>
