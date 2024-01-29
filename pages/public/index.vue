<template>
    <div>
        <!-- Display a payment form -->
        <form id="payment-form">
            <div id="payment-element">
                <!-- Stripe.js injects the Payment Element -->
            </div>
            <button id="submit">
                <div class="spinner" :class="{ 'hidden': !loading }" id="spinner"></div>
                <span id="button-text" :class="{ 'hidden': loading }">Pay now</span>
            </button>
            <div id="payment-message" :class="{ 'hidden': message === '' }">{{ message }}</div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { loadStripe  } from '@stripe/stripe-js';

export default {
    data() {
        return {
            stripe: null,
            elements: null,
            items: [{ id: "" }],
            loading: false,
            message: "",
        };
    },
    mounted() {
        this.initialize();
        this.checkStatus();
    },
    methods: {
        async initialize() {
            try {
                const totalAmount = 10;

                const response = await axios.post("/create-payment-intent", {
                    items: this.items,
                    totalAmount,
                });

                const { clientSecret } = response.data;

                // Initialize Stripe before accessing elements
                this.stripe = await loadStripe(
                    "pk_test_51OPNLwFJUwe1va09pikfEhMZZw3SrXulpaqGMXQbeT9kTm2MB6nbWKNWPNcTe3OJ1fJHw5a0d3H6TzA73NS3Ykjk003g6rTcC7"
                );

                const appearance = {
                    theme: "stripe",
                };

                this.elements = this.stripe.elements({ appearance, clientSecret });

                const paymentElementOptions = {
                    layout: "tabs",
                };

                const paymentElement = this.elements.create("payment", paymentElementOptions);
                paymentElement.mount("#payment-element");
            } catch (error) {
                console.error("Error fetching totalAmount:", error);
                this.showMessage("Error fetching totalAmount.");
            }
        },

        async handleSubmit(e) {
            e.preventDefault();
            this.setLoading(true);

            const { error } = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: "http://localhost:3000",
                },
            });

            if (error.type === "card_error" || error.type === "validation_error") {
                this.showMessage(error.message);
            } else {
                this.showMessage("An unexpected error occurred.");
            }

            this.setLoading(false);
        },

        async checkStatus() {
            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );

            if (!clientSecret) {
                return;
            }

            try {
                const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);

                switch (paymentIntent.status) {
                    case "succeeded":
                        this.showMessage("Payment succeeded!");
                        break;
                    case "processing":
                        this.showMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        this.showMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        this.showMessage("Something went wrong.");
                        break;
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
                this.showMessage("Error checking payment status.");
            }
        },

        showMessage(messageText) {
            this.message = messageText;

            setTimeout(() => {
                this.message = "";
            }, 4000);
        },

        setLoading(isLoading) {
            this.loading = isLoading;
        },
    },
};

</script>

<style scoped>
* {
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
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
</style>
