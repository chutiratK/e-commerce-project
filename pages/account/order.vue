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
        <div>
          <div class="card mb-3 content">
            <h2 class="m-3 pt-3">Order</h2>
            <hr />
            <div class="card-body">
              <div class="orderList">
                <div v-for="(order, index) in paginatedData" :key="index">
                  <div class="item">
                    <div class="order-info">
                      <p>Order ID: {{ order.orderID }}</p>
                      <p
                        :class="{
                          'text-danger': !order.paymentSuccess,
                          'text-success': order.paymentSuccess,
                        }"
                      >
                        {{ order.paymentSuccess ? "ชำระสำเร็จ" : "รอชำระ" }}
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
              <div class="pagination">
                <p @click="previousPage" :disabled="currentPage === 1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
                    />
                  </svg>
                </p>
                <span>Page {{ currentPage }}</span>
                <p @click="nextPage" :disabled="currentPage === totalPages">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
                    />
                  </svg>
                </p>
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
  paymentSuccess: boolean;
}

export default Vue.extend({
  name: "order",
  components: { AccSideBar },
  data: () => ({
    loading: true,
    orders: [] as Order[],
    currentPage: 1,
    itemsPerPage: 5,
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.orders.slice(startIndex, endIndex);
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
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
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
