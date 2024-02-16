<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <div class="checkout-container">
      <div v-if="currentUser">
        <div class="card mb-3 content">
          <h2 class="m-3 pt-3">Address</h2>
          <hr />
          <div class="card-body">
            <div class="selectedAddress">
              <div class="address-info">
                <p>
                  {{ orderAddress.name }}, {{ orderAddress.phone }},
                  {{ orderAddress.addr }}
                </p>
                <v-btn v-if="!paymentSuccess" @click="changeAddr"
                  >เปลี่ยนที่อยู่</v-btn
                >
              </div>
            </div>
          </div>
          <h2 class="m-3 pt-3">Order</h2>
          <hr />
          <div class="card-body">
            <div class="orderedProduct">
              <div v-for="(orders, index) in orderDetails" :key="index">
                <div class="item">
                  <img
                    :src="orders.imageUrl"
                    alt="Product Image"
                    width="50px"
                    height="50px"
                  />
                  <p>{{ orders.productName }}</p>
                  <p id="price">฿{{ orders.price }}</p>
                  <p>{{ orders.quantity }}</p>
                </div>
              </div>
              <div class="total">
                <h3>Total:</h3>
                <p>฿ {{ this.totalAmount }}</p>
              </div>
              <div v-if="!paymentSuccess" class="payPageBtn">
                <v-btn class="red" @click="cancelOrderconfirm()"
                  >ยกเลิกออเดอร์</v-btn
                >
                <v-btn @click="payMethod">ชำระเงิน</v-btn>
              </div>
              <div v-else class="backPage">
                <button class="backPageBtn" @click="backPage">BACK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="changeAddrModal" max-width="600px">
      <v-card
        style="background-color: white; color: #525252"
        class="changeAddrModal"
      >
        <v-card-title>เปลี่ยนที่อยู่</v-card-title>
        <hr />
        <center>
          <div v-for="(address, index) in addresses" :key="index">
            <div class="item">
              <input
                type="radio"
                :id="'radioo' + index"
                :checked="address.selectedAddr"
                @change="updateSelectedAddr(address.addressID)"
              />
              <div class="address-info">
                <p>
                  {{ address.name }}, {{ address.phone }}, {{ address.addr }}
                </p>
              </div>
            </div>
          </div>
          <!-- <v-btn class="blue" @click="changeAddrr">ok</v-btn> -->
        </center>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancelOrderConfirmForm" max-width="300px">
      <v-card class="popUpdel" style="background-color: white; color: #5b5353">
        <center>
          <h3>Are you sure to cancel?</h3>
          <br />
          <v-btn class="green" @click="cancelOrder">YES</v-btn>
          <v-btn class="red" @click="cancel">NO</v-btn>
        </center>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancelOrderSuccess" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <center>
          <img
            src="../../../assets/images/check.webp"
            width="200px"
            height="200px"
          />
          <h3>cancel successfully!</h3>
          <br />
          <v-btn class="green" @click="cancelfin">ok</v-btn>
        </center>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import {
  getFirestore,
  collection,
  updateDoc,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

interface Address {
  addressID: string;
  name: string;
  phone: string;
  addr: string;
  selectedAddr: boolean;
}
interface Order {
  orderID: string;
  productName: string;
  price: number;
  imageUrl: string;
  quantity: number;
  paymentSuccess: boolean;
}
export default Vue.extend({
  name: "checkout",
  components: { StripeElementCard },
  data: () => ({
    changeAddrModal: false,
    totalAmount: "",
    paymentSuccess: false,
    orderId: "",
    orderDetails: [],
    orderAddress: [],
    addresses: [] as Address[],
    orders: [] as Order[],
    cancelOrderConfirmForm: false,
    cancelOrderSuccess: false,
    cancelOrderID: "",
    stripePromise: loadStripe(
      "pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7"
    ),
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    selectedAddress() {
      return this.addresses.find((address) => address.selectedAddr) || {};
    },
  },
  mounted() {
    try {
      const orderID = this.$route.params.orderID;
      console.log("OrderID detail page:", orderID);
      this.fetchUserData(orderID);
      this.orderId = orderID;
    } catch (error) {
      console.error("Error sending product id:", error);
    }
  },
  methods: {
    async fetchUserData(orderID: any) {
      const db = getFirestore();
      const userOrderRef = doc(
        db,
        "order",
        this.currentUser.uid,
        "orderUser",
        orderID
      );
      const userAddrRef = collection(
        db,
        "address",
        this.currentUser.uid,
        "addressUser"
      );
      try {
        onSnapshot(userAddrRef, (snapshot) => {
          const updatedAddr: Address[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as Address;
            updatedAddr.push(data);
          });
          this.addresses = updatedAddr;
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      try {
        const orderDoc = await getDoc(userOrderRef);

        onSnapshot(userOrderRef, (orderDoc) => {
          if (orderDoc.exists()) {
            const orderData = orderDoc.data();
            if (orderData && Array.isArray(orderData.orderDetails)) {
              this.orderDetails = orderData.orderDetails;
            } else {
              console.error("Order details array is missing or invalid");
            }
            this.orderAddress = orderData.address;
            this.totalAmount = orderData.totalAmount;
            this.paymentSuccess = orderData.paymentSuccess;
          } else {
            console.error("Order not found.");
          }
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    },

    updateSelectedAddr(addressID: string) {
      const db = getFirestore();
      const userDocRef = doc(
        db,
        "address",
        this.currentUser.uid,
        "addressUser",
        addressID
      );

      try {
        this.addresses.forEach((address) => {
          if (address.addressID !== addressID) {
            updateDoc(
              doc(
                db,
                "address",
                this.currentUser.uid,
                "addressUser",
                address.addressID
              ),
              {
                selectedAddr: false,
              }
            );
          }
        });

        const selectedAddress = this.addresses.find(
          (address) => address.addressID === addressID
        );
        if (selectedAddress) {
          updateDoc(userDocRef, { selectedAddr: true });

          const orderID = this.$route.params.orderID;
          const orderRef = doc(
            db,
            "order",
            this.currentUser.uid,
            "orderUser",
            orderID
          );
          updateDoc(orderRef, {
            "address.name": selectedAddress.name,
            "address.phone": selectedAddress.phone,
            "address.addr": selectedAddress.addr,
          });
        }
      } catch (error) {
        console.error("Error updating selected address:", error);
      }
    },

    async payMethod() {
      const orderID = this.$route.params.orderID;
      this.$router.push("/order/payMethod/" + orderID);
    },

    async cancelOrderconfirm() {
      const orderID = this.$route.params.orderID;
      this.cancelOrderID = orderID;
      this.cancelOrderConfirmForm = true;
    },
    async cancelOrder() {
      try {
        const db = getFirestore();
        const catalogDocRef = doc(
          db,
          "order",
          this.currentUser.uid,
          "orderUser",
          this.cancelOrderID
        );

        await deleteDoc(catalogDocRef);
        this.cancelOrderConfirmForm = false;
        this.cancelOrderSuccess = true;
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    changeAddr() {
      this.changeAddrModal = true;
    },
    changeAddrr() {
      this.changeAddrModal = false;
    },
    cancel() {
      this.cancelOrderConfirmForm = false;
    },
    backPage() {
      this.$router.push("/account/order");
    },
    cancelfin() {
      this.$router.push("/account/order");
    },
  },
});
</script>

<style>
.title-1 {
  font-weight: bold;
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
.checkout-container {
  margin: auto;
}
.card-body {
  margin: 20px 40px;
}
.orderedProduct p {
  font-weight: bold;
  margin-top: auto;
}
.orderedProduct .item {
  flex: 0 0 calc(33.33% - 10px);
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: grid;
  grid-template-columns: 50px 230px 5px 1fr;
  gap: 15px;
  text-align: center;
  align-items: center;
  margin-top: auto;
}
.orderedProduct .total {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
}
.orderedProduct .total h3 {
  margin-right: 230px;
}
.orderedProduct .total p {
  font-weight: bold;
  font-size: 125%;
  margin-right: 20px;
}
.payPageBtn {
  padding: 12px;
  margin-left: 300px;
}
.address-info {
  flex: 1;
}
.orderedProduct .item img {
  margin-left: 10px;
  border-radius: 50%;
}
.changeAddrModal .item {
  flex: 0 0 calc(33.33% - 10px);
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1px;
  display: grid;
  grid-template-columns: 50px 230px 5px 1fr;
  gap: 15px;
  text-align: center;
  align-items: center;
  margin-top: auto;
  margin-right: 40px;
  margin-left: 40px;
}
.changeAddrModal {
  height: 400px;
}
.backPageBtn {
  background-color: #5b5353;
  color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  width: 30%;
  margin-bottom: 10px;
}
.backPage {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
