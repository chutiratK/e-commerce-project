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
                                <p>{{ orderAddress.name }}, {{ orderAddress.phone }}, {{ orderAddress.addr }}</p>
                                <v-btn @click="changeAddr">เปลี่ยนที่อยู่</v-btn>
                            </div>
                        </div>
                    </div>
                    <h2 class="m-3 pt-3">Order</h2>
                    <hr>
                    <div class="card-body">
                        <div class="orderedProduct">
                            <div v-for="(orders, index) in orderDetails" :key="index">
                                <div class="item">
                                    <img :src="orders.imageUrl" alt="Product Image" width="50px" height="50px"/>
                                    <p>{{ orders.categoryName }}</p>
                                    <p id="price">฿{{ orders.price }}</p>
                                    <p>{{ orders.quantity }}</p>
                                </div>
                            </div>
                            <div class="total">
                                    <h3>Total:</h3>
                                    <p>฿ {{ this.totalAmount }}</p>
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
                <!-- <v-btn class="blue" @click="changeAddrr">ok</v-btn> -->
                </center>
        </v-card>
    </v-dialog>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { getFirestore, collection, updateDoc, onSnapshot, doc, getDoc, addDoc} from 'firebase/firestore';
interface Address {
    addressID: string;
    name: string;
    phone: string;
    addr: string;
    selectedAddr: boolean;
}
interface Order {
    orderID: string;
    categoryName: string;
    price: number;
    imageUrl: string;
    quantity: number;
}
export default Vue.extend({
    name: 'checkout',
    components: { },
    data: () => ({
        changeAddrModal: false,
        totalAmount: '',
        orderId: '',
        orderDetails: [], 
        orderAddress: [],
        addresses: [] as Address[],
        orders: [] as Order[],
    }),
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
        selectedAddress() {
            return this.addresses.find((address) => address.selectedAddr) || {};
        },
    },
    mounted() {
        try {
            const orderID = this.$route.params.orderID;
            console.log('OrderID detail page:', orderID);
            this.fetchUserData(orderID);
            this.orderId = orderID;
            
        } catch (error) {
            console.error('Error sending product id:', error.message);
        }
    },
    methods: {
        async fetchUserData(orderID) {
            const db = getFirestore();
            const userOrderRef = doc(db, 'order', this.currentUser.uid, 'orderUser',orderID);
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
                console.error('Error fetching user data:', error.message);
            }
            try {
                const orderDoc = await getDoc(userOrderRef);

                onSnapshot(userOrderRef, (orderDoc) => {
                    if (orderDoc.exists()) {
                        const orderData = orderDoc.data();
                        if (orderData && Array.isArray(orderData.orderDetails)) {
                            this.orderDetails = orderData.orderDetails;
                        } else {
                            console.error('Order details array is missing or invalid');
                        }
                        this.orderAddress = orderData.address;
                        this.totalAmount = orderData.totalAmount;
                    } else {
                        console.error('Order not found.');
                    }
                });

            } catch (error) {
                console.error('Error fetching order data:', error.message);
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

                    const orderID = this.$route.params.orderID;
                    const orderRef = doc(db, 'order', this.currentUser.uid, 'orderUser', orderID);
                    updateDoc(orderRef, {
                        'address.name': selectedAddress.name,
                        'address.phone': selectedAddress.phone,
                        'address.addr': selectedAddress.addr,
                    });
                }
            } catch (error) {
                console.error('Error updating selected address:', error.message);
            }
        },

        async pay_method() {
            const orderID = this.$route.params.orderID;
            this.$router.push('/order/payMethod/' + orderID);

            
        },
        changeAddr() {
            this.changeAddrModal = true;
        },
        changeAddrr() {
            this.changeAddrModal = false;
        },
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
        height: 400px;

    }
</style>