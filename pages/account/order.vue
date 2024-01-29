<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <h1 class="m-3 pt-3" style="color: #5b5353">Account User</h1>
    <hr />
    <br />
    <div class="row">
      <AccSideBar />
      <div class="col-md-8 mt-1">
        <div v-if="currentUser">
          <div class="card mb-3 content">
            <h2 class="m-3 pt-3">Order</h2>
            <hr />
            <div class="card-body">
              <div class="orderList">
                <div v-for="(order, index) in orders" :key="index">
                  <div class="item">
                    <div class="order-info">
                      <p>Order ID: {{ order.orderID }}</p>
                      <p
                        :class="{
                          'text-danger': !order.payment,
                          'text-success': order.payment,
                        }"
                      >
                        {{ order.payment ? "ชำระสำเร็จ" : "รอชำระ" }}
                      </p>
                    </div>
                    <div class="button-container">
                      <v-btn
                        class="ordetailBtn"
                        @click="orderDetails(order.orderID)"
                        >Detail</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AccSideBar from "../../components/AccountSideBar.vue";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
interface Order {
  orderID: string;
  productName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default Vue.extend({
  name: "order",
  components: { AccSideBar },
  data: () => ({
    loading: true,
    orders: [] as Order[],
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async fetchUserData() {
      const db = getFirestore();
      const userOrderRef = collection(
        db,
        "order",
        this.currentUser.uid,
        "orderUser"
      );

      try {
        onSnapshot(userOrderRef, (querySnapshot) => {
          const orderData: Order[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Order;
            orderData.push(data);
          });

          this.orders = orderData;
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    orderDetails(orderID) {
      this.$router.push("/order/orderDetail/" + orderID);
    },
  },
  mounted() {
    (this as any).fetchUserData();
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
  height: auto;
}
.content h2,
hr {
  margin: 20px 40px;
}
.card-body {
  margin: 20px 40px;
  height: auto;
}

.orderList .item img {
  margin-left: 10px;
  border-radius: 50%;
}
.orderList .item {
  flex: 0 0 calc(33.33% - 10px);
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1px;
  display: grid;
  grid-template-columns: 50px 230px 5px 1fr;
  gap: 15px;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderList .item .order-info {
  flex: 1;
}

.orderList .item .order-info p {
  margin: 0;
}

.orderList .item p.text-success {
  color: green;
}

.orderList .item p.text-danger {
  color: red !important;
}

.orderList .item .button-container {
  margin-left: 10px;
}
</style>
