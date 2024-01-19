<template>
    <div>
      <label>Card Number</label>
      <div id="card-number"></div>
      <label>Card Expiry</label>
      <div id="card-expiry"></div>
      <label>Card CVC</label>
      <div id="card-cvc"></div>
      <div id="card-error"></div>
      <button id="custom-button" @click="createToken">Generate Token</button>
    </div>
</template>
  
<script>
//   export default {
//     data () {
//       return {
//         token: null,
//         cardNumber: null,
//         cardExpiry: null,
//         cardCvc: null,
//       };
//     },
//     computed: {
//       stripeElements () {
//         return this.$stripe.elements();
//       },
//     },
//     mounted () {
//       // Style Object documentation here: https://stripe.com/docs/js/appendix/style
//       const style = {
//         base: {
//           color: 'black',
//           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//           fontSmoothing: 'antialiased',
//           fontSize: '14px',
//           '::placeholder': {
//             color: '#aab7c4',
//           },
//         },
//         invalid: {
//           color: '#fa755a',
//           iconColor: '#fa755a',
//         },
//       };
//       this.cardNumber = this.stripeElements.create('cardNumber', { style });
//       this.cardNumber.mount('#card-number');
//       this.cardExpiry = this.stripeElements.create('cardExpiry', { style });
//       this.cardExpiry.mount('#card-expiry');
//       this.cardCvc = this.stripeElements.create('cardCvc', { style });
//       this.cardCvc.mount('#card-cvc');
//     },
//     beforeDestroy () {
//       this.cardNumber.destroy();
//       this.cardExpiry.destroy();
//       this.cardCvc.destroy();
//     },
//     methods: {
//       async createToken () {
//         const { token, error } = await this.$stripe.createToken(this.cardNumber);
//         if (error) {
//           // handle error here
//           document.getElementById('card-error').innerHTML = error.message;
//           return;
//         }
//         console.log(token);
//         // handle the token
//         // send it to your server
//       },
//     }
//   };
  </script>
  
  <style scoped>
  #custom-button {
    height: 30px;
    outline: 1px solid grey;
    background-color: green;
    padding: 5px;
    color: white;
  }
  
  #card-error {
    color: red;
  }
</style>

<!-- <template>
    <div>
        <form id="payment-form">
            <div id="payment-element">
            </div>
            <button id="submit">
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Pay now</span>
            </button>
            <div id="payment-message" class="hidden"></div>
        </form>
    </div>
</template>

<script lang="ts">
import Stripe from 'stripe';
import { defineComponent, ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

export default({
    name: 'Checkout',
    setup() {
        const stripe = new Stripe('pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7');
        const items = [{ id: '' }];
        const totalAmount = 27;
        const elements = ref<Stripe.elements.Elements>(null);
        const isLoading = ref(false);
        const message = ref('');

        async function initialize() {
            try {
                const totalAmount = 27
                const response  = await fetch("/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, totalAmount }),
                });
                const { clientSecret } = await response .json();

                const appearance = {
                theme: 'stripe',
                };
                elements = stripe.elements({ appearance, clientSecret });

                const paymentElementOptions = {
                layout: "tabs",
                };

                const paymentElement = elements.create("payment", paymentElementOptions);
                paymentElement.mount("#payment-element");

            } catch (error) {
                console.error("Error fetching totalAmount:", error);
                showMessage("Error fetching totalAmount.");
            }
        }

        const handleSubmit = async () => {
        try {
            isLoading(true);
            const { error } = await stripe.confirmPayment({
            elements: elements.value,
            confirmParams: {
                return_url: 'http://localhost:3000',
            },
            });

            if (error) {
            message.value = error.message;
            } else {
            message.value = 'Payment succeeded!';
            }
        } catch (error) {
            console.error('Payment error:', error);
            message.value = 'An unexpected error occurred.';
        } finally {
            isLoading(false);
        }
        };

        const checkStatus = async () => {
        
        // Implementation for checking payment status after submission
        };

        initialize();
        checkStatus();

        return {
            stripe,
            elements,
            isLoading,
            message,
            handleSubmit,
        };
    },
});
</script>

<style>
* {
    box-sizing: border-box;
}

form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
        0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
}

.hidden {
    display: none;
}

#payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
}

#payment-element {
    margin-bottom: 24px;
}

/* Buttons and links */
button {
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

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
    border-radius: 50%;
}
.spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}
.spinner:before,
.spinner:after {
    position: absolute;
    content: "";
}
.spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
}
}
@keyframes loading {
0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
}
}

@media only screen and (max-width: 600px) {
form {
    width: 80vw;
    min-width: initial;
}
}
</style> -->