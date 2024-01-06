<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <NavBar />
        <Nuxt />
        <div class="checkout-container">
            <div v-if="currentUser" >
                <div class="card mb-3 content">
                    <h2 class="m-3 pt-3">Address</h2>
                    <hr>
                    <div class="card-body">
                        <div class="selectedAddress">
                            <div class="address-info">
                                <p>{{ selectedAddress.name }}, {{ selectedAddress.phone }}, {{ selectedAddress.addr }}</p>
                                <v-btn @click="changeAddr">เปลี่ยนที่อยู่</v-btn>
                            </div>
                        </div>
                    </div>
                    <h2 class="m-3 pt-3">Order</h2>
                    <hr>
                    <div class="card-body">
                        <div class="orderedProduct">
                            <div v-for="(product, index) in selectedOrderItems" :key="index">
                                <div class="item">
                                    <img :src="product.imageUrl" alt="Product Image" width="50px" height="50px"/>
                                    <p>{{ product.categoryName }}</p>
                                    <p id="price">฿{{ product.price }}</p>
                                    <p>{{ product.quantity }}</p>
                                </div>
                            </div>
                            <div class="total">
                                <h3>Total:</h3>
                                <p>฿ {{ selectedTotalAmount  }}</p>
                            </div>
                            <v-btn class="payment" @click="pay_method()">ชำระเงิน</v-btn>
                        </div>
                    </div>
                </div>
            </div>   
        </div>  
        <v-dialog v-model="changeAddrModal" max-width="600px">
            <v-card style="background-color: white; color: #525252;" class="changeAddrModal">
                <v-card-title>เปลี่ยนที่อยู่</v-card-title>
                <hr>
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
                            <p>{{ address.name }}, {{ address.phone }}, {{ address.addr }}</p>
                        </div>
                    </div>
                </div>
                <v-btn class="blue" @click="changeAddrr">ok</v-btn>
                </center>
        </v-card>
    </v-dialog>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Stripe from 'stripe';
import { getFirestore, collection, updateDoc, onSnapshot, doc, setDoc, addDoc} from 'firebase/firestore';

interface Cart {
    productId: string;
    categoryName: string;
    imageUrl: string;
    quantity: number;
    price: number;
    selected: boolean;
}
interface Address {
    addressID: string;
    name: string;
    phone: string;
    addr: string;
    selectedAddr: boolean;
}
export default Vue.extend({
    name: 'checkout',
    components: { },
    data: () => ({
        loading: true,
        cart: [] as Cart[],
        addresses: [] as Address[],
        changeAddrModal: false,
        stripe: null,
    }),
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
        selectedTotalAmount(): number {
            return this.selectedOrderItems.reduce((total, product) => total + product.price * product.quantity, 0);
        },
        selectedAddress() {
            return this.addresses.find((address) => address.selectedAddr) || {};
        },
        selectedOrderItems(): Cart[] {
            return this.cart.filter((product) => product.selected);
        },
    },
    methods: {
        async fetchUserData() {
            const db = getFirestore();
            const userOrderRef = collection(db, 'cart', this.currentUser.uid, 'cartUser');
            const userAddrRef = collection(db, 'address', this.currentUser.uid, 'addressUser');

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
                console.error('Error fetching user data:', error);
            }

            try {
                onSnapshot(userOrderRef, (snapshot) => {
                    const updatedCart: Cart[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as Cart;
                        updatedCart.push(data);
                    });
                    this.cart = updatedCart;
                    this.loading = false;
                });

                console.log('cart', this.cart);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        updateSelectedAddr(addressID: string) {
            const db = getFirestore();
            const userDocRef = doc(db, 'address', this.currentUser.uid, 'addressUser', addressID);

            try {
                this.addresses.forEach((address) => {
                if (address.addressID !== addressID) {
                    updateDoc(doc(db, 'address', this.currentUser.uid, 'addressUser', address.addressID), {
                        selectedAddr: false,
                    });
                }
                });
                const selectedAddress = this.addresses.find((address) => address.addressID === addressID);
                if (selectedAddress) {
                    updateDoc(userDocRef, { selectedAddr: true });
                }
            } catch (error) {
                console.error('Error updating selected address:', error);
            }
        },
        async pay_method() {
            const db = getFirestore();
            const selectedAddress = this.addresses.find((address) => address.selectedAddr);
            const userOrderRef = collection(db, 'order', this.currentUser.uid, 'orderUser');
            const selectedCartItems = this.cart.filter((product) => product.selected);
            const orderUser = {
                userID: this.currentUser.uid,
                orderID: '',
                address: selectedAddress,
                orderDetails: selectedCartItems.map(product => ({
                    productId: product.productID,
                    categoryName: product.categoryName,
                    imageUrl: product.imageUrl,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: this.selectedTotalAmount, 
                payment: false,
            };
            const userOrderDocRef = await addDoc(userOrderRef, {});
            orderUser.orderID = userOrderDocRef.id;
            const userOrderDocRefWithData = doc(db, 'order', this.currentUser.uid, 'orderUser', userOrderDocRef.id);
            await setDoc(userOrderDocRefWithData, orderUser);
            
            this.$router.push('/order/payMethod/' + orderUser.orderID);
            console.log('Order details:', orderUser);
        },
        changeAddr() {
            this.changeAddrModal = true;
        },
        changeAddrr() {
            this.changeAddrModal = false;
        },
    },
    async mounted() {
        await this.fetchUserData();
       
    },
});
</script>

<style>
    .title-1 {
        font-weight: bold;
    }
    .content{
        border-radius: 10px;
        background-color: rgb(253, 253, 253);
        color:#5b5353 ;
        width: 700px;
        height:100%;
    }
    .content h2, hr{
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
    .payment {
        margin-left: 530px;
    }
    .address-info {
        flex: 1;
    }
    .orderedProduct .item img{
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
        height: 100%;
    }
</style>