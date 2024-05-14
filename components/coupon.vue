<template>
  <div class="coupon-container" >
    <div class="track-coupon" v-for="(coupon, index) in couponList" :key="coupon.id">
        <div class="coupon" @click="checkCoupon(coupon.id, index)" :id="`-coupon-id-${coupon.id}`">
            <div class="center">
                <div>
                <h1>{{ coupon.percent_off }}% OFF</h1>
                <h3 v-if="!coupon.isCouponApplied">Coupon</h3>
                <h3 v-else style="color: red;">Coupon Used</h3>
                <small>Valid until May, 2040</small>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "coupon",
  data() {
    return {
      couponList: [],
    };
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
        this.couponList = response.data.couponList.map((coupon: any) => ({
        ...coupon,
        isCouponApplied: false
        }));
        return response;
      } catch (error) {
        console.error("Error list coupons:", error);
        return null;
      }
    },
    async checkCoupon(couponCode: any, index: any) {
      try {
        if (Array.isArray(this.couponList)) {
            this.couponList.forEach(coupon => {
                coupon.isCouponApplied = false;
            });
        }
        const response = await axios.post(
          "http://localhost:3000/api/v1/coupon",
          {
            coupon: couponCode,
          }
        );
        const coupon = response.data.coupon.percent_off;
        const discount = coupon / 100;
        this.$emit("couponApplied", discount);
        this.$set(this.couponList[index], 'isCouponApplied', true);

       
        // this.$set(this.couponApplied, index, true);
      } catch (error) {
        console.error("Error retrieving coupon:", error);
        return null;
      }
    },
  },
});
</script>

<style>
.coupon-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    margin: 30px;
    margin-left: 40px;
    padding: 10px;
}
.coupon-container::-webkit-scrollbar {
    margin-top: 15px;
    height: 5px;
    width: 10px;
}

.coupon-container::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.coupon-container::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius:8px;
}

.coupon-container::-webkit-scrollbar-thumb:hover {
    background: #898989;
}
.coupon {
  cursor: pointer;
  width: 180px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: stretch;
  position: relative;
  text-transform: uppercase;
}
.coupon::before,
.coupon::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: -1;
  transition: background-color 0.3s ease;
}

.coupon::before {
  left: 0;
  background-image: radial-gradient(
    circle at 0 50%,
    transparent 15px,
    rgb(223, 221, 210) 16px
  );
}

.coupon::after {
  right: 0;
  background-image: radial-gradient(
    circle at 100% 50%,
    transparent 15px,
    rgb(223, 221, 210) 16px
  );
}

.coupon:hover::before {
  left: 0;
  background-image: radial-gradient(
    circle at 0 50%,
    transparent 15px,
    rgb(245, 232, 159) 16px
  );
}

.coupon:hover::after {
  right: 0;
  background-image: radial-gradient(
    circle at 100% 50%,
    transparent 15px,
    rgb(245, 232, 159) 16px
  );
}

.coupon.disabled::before {
  left: 0;
  background-image: radial-gradient(
    circle at 0 50%,
    transparent 15px,
    rgb(196, 196, 196) 16px
  );
}

.coupon.disabled::after {
  right: 0;
  background-image: radial-gradient(
    circle at 100% 50%,
    transparent 15px,
    rgb(196, 196, 196) 16px
  );
}
.disabled {
    cursor: not-allowed;
}

.coupon > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  width: 40%;
  border-right: 2px dashed rgba(0, 0, 0, 0.13);
}
.left div {
  transform: rotate(-90deg);
  white-space: nowrap;
  font-weight: bold;
  font-size: 10px;
}

.center {
  flex-grow: 1;
  text-align: center;
}
.center h1 {
  color: rgb(255, 255, 255);
  padding: 0 10px;
  font-size: 18px;
  white-space: nowrap;
}

.center h3 {
  font-size: 13px;
}
.center small {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 2px;
}


@media screen and (max-width: 500px) {
  .coupon {
    display: grid;
    grid-template-columns: 1fr;
  }
  .left div {
    transform: rotate(0deg);
  }
  .right div {
    transform: rotate(0deg);
  }
}
</style>
