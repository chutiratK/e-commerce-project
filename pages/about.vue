
<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <NavBar />
        <Nuxt />
        <h1>About</h1>
        <stripe-element-card
        ref="elementRef"
        :pk="publishableKey"
        @token="tokenCreated"
        />
        <button @click="submit">Generate token</button>
        <!-- <div>
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
import { StripeCheckout, StripeElementCard } from '@vue-stripe/vue-stripe';
import axios from 'axios';
import { getFirestore, getDoc, onSnapshot, doc} from 'firebase/firestore';

export default ({
    name: "about",
    components: {StripeCheckout, StripeElementCard},
    data: () => ({
        publishableKey: 'pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7',
        token: null,
    }),
    methods: {
        async submit () {
            try {
                this.$refs.elementRef.submit();
            } catch (error) {
                console.error(error);
            }
        },
        tokenCreated (token) {
            console.log("token: ",token.id);
        },
        }
    // computed: {
    //     currentUser() {
    //         return this.$store.state.user;
    //     },
    // },
    // async mounted() {
    //     try {
    //     // const orderID = this.$route.params.orderID;
    //     const orderID = 'AMfILGZh51lMfonLBdnh'
    //     this.orderId = orderID;
    //     console.log('OrderID detail page:', orderID);

    //     const db = getFirestore();
    //     const orderRef = doc(db, 'order', this.currentUser.uid, 'orderUser', orderID);
    //     // const orderDoc = await getDoc(orderRef);

    //     onSnapshot(orderRef, (orderDoc) => {
    //         if (orderDoc.exists()) {
    //             const orderData = orderDoc.data();
    //             this.totalAmount = orderData.totalAmount;
    //             console.log('orderData:', this.totalAmount);
    //         } else {
    //             console.error('Order not found.');
    //         }
    //     });
    //     // const stripe = await loadStripe('pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7');
    //     } catch (error) {
    //         console.error('Error :', error);
    //     }
    // },
    // data () {
    //     return {
    //         publishableKey: "pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7",
    //         loading: false,
    //         lineItems: [
    //             {
    //                price: this.totalAmount,
    //                quantity: 1,
    //             },
    //         ],
    //         successURL: 'http://localhost:3000/',
    //         cancelURL: 'http://localhost:3000/',
    //         totalAmount: '',
    //         orderId: '',
    //     };
    // },
    // methods: {
    //     submit () {
    //         this.$refs.checkoutRef.redirectToCheckout();
    //     },
        
    // },
    
});
</script>

<style>

</style> 