
<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <NavBar />
        <Nuxt />
        <h1>About</h1>
        <!-- <button @click="makePayment">Pay Now</button>
        <div>
            <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="v => loading = v"
            />
            <button @click="submit">pay!</button>
        </div> -->
    </v-app>

</template>
<script lang="ts">
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default ({
    name: "about",
    components: {StripeCheckout, },
    
//     data () {
//     this.publishableKey = "pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7";
//     return {
//       loading: false,
//       lineItems: [
//         {
//           price: 'price_1OUwbYFJUwe1va094z3E6lVZ',
//           quantity: 1,
          
//         },
//       ],
//       successURL: 'http://localhost:3000/',
//       cancelURL: 'http://localhost:3000/',
//     };
//   },
//   methods: {
//     submit () {
//       // You will be redirected to Stripe's secure checkout page
//       this.$refs.checkoutRef.redirectToCheckout();
//     },
//   },
    
});
</script>

<style>

</style> 