<template>
  <v-app style="background-color: rgb(236, 236, 236);">
    <NavBar />
    <Nuxt />
    <div class="paymethod-container">
      
      <div v-if="currentUser">
        <v-row>
          <v-col v-for="(paymentMethod, index) in paymentMethods" :key="index" cols="12" md="4">
            <v-card @click="selectPaymentMethod(paymentMethod)" style="background-color: rgb(255, 255, 255); ">
              <div class="pay-content">
                <div class="pay-title-row">
                  <v-card-title class="titlePay">{{ paymentMethod.name }}</v-card-title>
                  <v-card-subtitle class="subPay">{{ paymentMethod.description }}</v-card-subtitle>
                </div>
                <div class="pay-img-row">
                  <img :src="paymentMethod.image" alt="Payment Method">
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <br>
        <div v-if="selectedPaymentMethod && selectedPaymentMethod.name === 'Credit Card'" class="creditCard" style="background-color: white; color: #525252;">
          
          <!-- <div class="creditCardContainer">
            <div class="creditCardTitle">{{ selectedPaymentMethod.name }}</div>
            <div class="creditCardSubtitle">{{ selectedPaymentMethod.description }}</div>
            <hr><br> 
            <div ref="paymentForm" class="payForm">
              <div class="input-group-cardNumber">
                <label for="cardNumber" class="input-label">Card Number</label>
                <input 
                v-model="cardNumber" 
                id="cardNumber" 
                type="text" 
                @input="formatCardNumber" 
                maxlength="19" 
                placeholder="0000 0000 0000 0000" 
                required >
              </div><br>

              <div class="input-row">
                <div class="input-group-expiryDate">
                  <label for="expiryDate" class="input-label">Expiry Date</label>
                  <input 
                  v-model="expiryDate" 
                  id="expiryDate" 
                  type="text" 
                  maxlength="5" 
                  @input="formatExpiryDate" 
                  placeholder="MM/YY" 
                  required>
                </div>
                <div class="input-group-cvc">
                  <label for="cvc" class="input-label">CVC</label>
                  <input 
                  v-model="cvc" 
                  id="cvc" 
                  type="text" 
                  maxlength="3" 
                  @input="formatCvc" 
                  placeholder="123" 
                  required>
                </div>
                
              </div>
              
              <br><br> -->
              <!-- <v-btn @click="submitPayment" class="creditBtn">Submit Payment</v-btn> -->
            <!-- </div> -->
          </div>
        </div>
        
        <div v-if="selectedPaymentMethod && selectedPaymentMethod.name === 'PayPal'" class="creditCard" style="background-color: white; color: #525252;">
          <div class="creditCardContainer">
            <div class="creditCardTitle">{{ selectedPaymentMethod.name }}</div>
            <div class="creditCardSubtitle">{{ selectedPaymentMethod.description }}</div>
            <hr>
            
          </div>
        </div>

        <div v-if="selectedPaymentMethod && selectedPaymentMethod.name === 'Bank Transfer'" class="creditCard" style="background-color: white; color: #525252;">
          <div class="creditCardContainer">
            <div class="creditCardTitle">{{ selectedPaymentMethod.name }}</div>
            <div class="creditCardSubtitle">{{ selectedPaymentMethod.description }}</div>
            <hr>
            
          </div>
        </div>
      </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { getFirestore, getDoc, onSnapshot, doc} from 'firebase/firestore';

export default Vue.extend({
  name: 'PaymentMethod',
  components: {},
  data: () => ({
    paymentMethods: [
    {
        name: 'Credit Card',
        description: 'Pay with your credit card',
        image: 'https://www.datavisor.com/wp-content/uploads/2022/04/MasterCard-1.png',
    },
    {
        name: 'PayPal',
        description: 'Pay with PayPal',
        image: 'https://th.bing.com/th/id/R.c01292cdd7f51d3520c75031fc479c2b?rik=0qZxmR9AXGhBdw&pid=ImgRaw&r=0',
    },
    {
        name: 'Bank Transfer',
        description: 'Transfer money from your bank account',
        image: 'https://cdn1.iconfinder.com/data/icons/business-and-finance-20/200/vector_65_09-512.png',
    },
    ],
    selectedPaymentMethod: false,
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    loading: false,
    message: "",
    orderId: '',
    totalAmount: '',
    paymentElement: null,

  }),
  methods: {
    selectPaymentMethod(paymentMethod: any) {
      this.selectedPaymentMethod = paymentMethod;
    },

    // handlePaymentSuccess(token) {
    //   console.log('token id: ', token)
    // },
    // formatCardNumber() {
    //   this.cardNumber = this.cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    // },
    // formatExpiryDate() {
    //   this.expiryDate = this.expiryDate.replace(/\D/g, '').replace(/^(.{2})/, '$1/').substring(0, 5);
    // },
    // formatCvc() {
    //   this.cvc = this.cvc.replace(/\D/g, '').substring(0, 3);
    // },
      
  },

  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },

  async mounted() {
    try {
      const orderID = this.$route.params.orderID;
      this.orderId = orderID;
      console.log('OrderID detail page:', orderID);

      const db = getFirestore();
      const orderRef = doc(db, 'order', this.currentUser.uid, 'orderUser', orderID);
      // const orderDoc = await getDoc(orderRef);

      onSnapshot(orderRef, (orderDoc) => {
        if (orderDoc.exists()) {
            const orderData = orderDoc.data();
            this.totalAmount = orderData.totalAmount;
            console.log('orderData:', this.totalAmount);
        } else {
            console.error('Order not found.');
        }
      });
      const stripe = await loadStripe('pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7');
    } catch (error) {
      console.error('Error :', error);
    }
  }

});
</script>

<style>
.paymethod-container .titlePay{
    color: rgb(56, 56, 56) !important;
}
.paymethod-container .subPay{
    color: rgb(56, 56, 56) !important;
}
.creditCardTitle {
  font-size: 25px;
  margin-left: 30px;
  margin-top: 25px;
}
.creditCardSubtitle {
  margin-left: 40px;
  margin-bottom: 10px;
}
.creditCard {
  margin: auto;
  width: 600px;
  height: 450px;
  padding: 15px;
  box-shadow: 0 10px 10px #a4a3a3;
  border-radius: 8px;
}
.creditCard .payForm {
    color: rgb(56, 56, 56) !important;
}
.input-label {
    font-size: 12px;
    margin-bottom: 4px; 
    display: block; 
}
.payForm input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    margin-right: 10px;
}
/* .payForm{
  margin-left: 110px;
} */
/* .input-group-cardNumber input {
  width: 350px;
}
.input-group-expiryDate input {
  width: 100px;
}
.input-group-cvc input {
  width: 100px;
} */
.card-icon {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 195px;
    right: 530px;
}
/* .input-row {
  display: flex;
}
.input-group-expiryDate,
.input-group-cvc {
  flex: 1;
}
.creditBtn {
  margin-left: 100px;
} */
.pay-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
}
.pay-img-row {
  display: flex;
  width: 70px;
  height: 70px;
  margin-right: 40px;
}
hr {
  margin-left: 30px;
  margin-right: 30px;
}
.hidden {
  display: none;
}

#payment-message {
  color: rgb(104, 104, 104);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

.payBtn{
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
