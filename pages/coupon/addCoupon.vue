<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <div>
      <NavBar />
      <div class="text-center">
        <h2>Create coupon</h2>
        <v-btn class="addCoupon" @click="addCouponBtn">+ New Coupon</v-btn>
      </div>

      <v-card class="couponTable">
        <v-row class="header-row">
          <v-col>
            <strong>Coupon ID</strong>
          </v-col>
          <v-col>
            <strong>Duration(month)</strong>
          </v-col>
          <v-col>
            <strong>Percent Off(%)</strong>
          </v-col>
          <v-col> </v-col>
        </v-row>
        <v-row
          v-for="(coupon, index) in paginatedData"
          :key="index"
          class="data-row"
        >
          <v-col>{{ coupon.id }}</v-col>
          <v-col>{{ coupon.duration_in_months }}</v-col>
          <v-col>{{ coupon.percent_off }} %</v-col>
          <v-col class="button-column">
            <!-- <v-btn
                class="editBtn"
                @click="editCoupon(product.productID, product.category)"
                >EDIT</v-btn
                > -->
            <v-btn class="red" @click="deleteCoupon(coupon.id)">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <br />
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

      <v-dialog
        v-model="addCouponModal"
        max-width="400px"
        class="addCouponModal"
      >
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <v-card-title>Add coupon</v-card-title>
          <hr />
          <br />
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <form>
                <div class="form-group">
                  <label>Duration(month)</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="duration"
                    required
                  />
                  <span v-if="errorMessageDuration" class="error-message"
                    >please fill this field</span
                  >
                </div>

                <div class="form-group group3">
                  <div class="price">
                    <label>Percentage discount(%)</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="percentOff"
                      required
                    />
                    <span v-if="errorMessagePercentOff" class="error-message"
                      >please fill this field</span
                    >
                  </div>
                </div>

                <br />
                <v-btn
                  class="submit-btn"
                  type="button"
                  @click="createCoupon(duration, percentOff)"
                  >Submit</v-btn
                >
                <v-btn class="red" @click="closeModal">back</v-btn>
              </form>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addCouponSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>added coupon successfully!</h3>
            <v-btn class="success" @click="Success">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteCouponSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>delete coupon successfully!</h3>
            <v-btn class="success" @click="Success">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "createCoupon",
  data() {
    return {
      duration: 0,
      percentOff: 0.0,
      errorMessageDuration: false,
      errorMessagePercentOff: false,
      addCouponSuccess: false,
      addCouponModal: false,
      deleteCouponSuccess: false,
      currentPage: 1,
      itemsPerPage: 6,
      couponList: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.couponList.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.couponList.slice(startIndex, endIndex);
    },
  },
  mounted() {
    (this as any).fetchCouponData();
  },
  methods: {
    async fetchCouponData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/coupon-list"
        );
        console.log("list:", response.data.couponList.length);
        this.couponList = response.data.couponList;
        return response;
      } catch (error) {
        console.error("Error list coupons:", error);
        return null;
      }
    },
    async createCoupon(duration: any, percentOff: any) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/create-coupon",
          {
            duration: duration,
            percentOff: percentOff,
          }
        );
        this.addCouponSuccess = true;
        return response;
      } catch (error) {
        console.error("Error create coupon:", error);
        return null;
      }
    },
    addCouponBtn() {
      this.addCouponModal = true;
    },
    closeModal() {
      this.addCouponModal = false;
    },
    Success() {
      this.$router.push("/category/homeAdmin");
    },
    async deleteCoupon(couponID: any) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/delete-coupon",
          {
            couponID: couponID,
          }
        );
        this.deleteCouponSuccess = true;
        return response;
      } catch (error) {
        console.error("Error create coupon:", error);
        return null;
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
  },
});
</script>

<style>
.text-center h2 {
  color: #636363;
}
.addcoupon-container {
  color: #5b5353;
  margin: auto;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.couponTable {
  border-radius: 10px;
  background-color: rgb(249, 249, 249) !important;
  color: #5b5353 !important;
  width: auto;
  height: auto;
  margin-top: 50px;
  padding: 15px;
}
.form-group input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: auto;
}
.popUp {
  height: 400px;
  overflow: hidden;
}
.popUp img {
  margin-top: 50px;
}
.error-message {
  color: red;
}
.pagination {
  display: flex;
  color: #656565;
}
.pagination p {
  cursor: pointer;
}
.pagination svg {
  fill: #656565;
  width: 10px;
  height: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.header-row,
.data-row {
  border-bottom: 1px solid #ccc;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}
</style>
