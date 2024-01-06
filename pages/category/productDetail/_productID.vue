<template>
    <v-app style="background-color: rgb(236, 236, 236);">
    <NavBar /> 
    <center>
        <div class="product-detail-card">
            <div v-if="loading" class="loading-spinner"></div>
            <div v-else>
                <img :src="imageUrl" alt="Product Image" width="200px" height="200px"/>
                <div>
                    <h1>{{ categoryName }}</h1>
                    <p>{{ description }}</p>
                    <p>฿ {{ price }}</p>
                    <!-- <label for="quantity">Quantity:</label> -->
                    <input type="number" class="quantity" v-model="quantity" min="1" /><br><br>
                    <v-btn @click="addToCart">Add to Cart</v-btn>
                    <v-btn @click="backToHome" color="red">back</v-btn>
                </div>
            </div>
        </div>
    </center>
    <v-dialog v-model="addSuccess" max-width="400px" >
        <v-card class="popUp" style="background-color: white; color: #5b5353">
            <center>
                <img src="../../../assets/images/check.webp" width="200px" height="200px">
                <h3>added to cart successfully!</h3><br>
                <v-btn class="success" @click="Success">ok</v-btn>
            </center>
        </v-card>
    </v-dialog>
   </v-app>
</template>
 
<script lang="ts">
import NavBar from '../../../components/NavBar.vue'
import SignIn from "../../../components/SignIn.vue"
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

export default {
    name: "productDetail",
    components: { NavBar, SignIn},
    data:() => ({
        loading: true,
        categoryName: '',
        description: '',
        imageUrl: '',
        price: '',
        quantity: 1,
        addSuccess: false,
    }),
    mounted() {
        try {
            const productID = this.$route.params.productID;
            console.log('ProductID detail page:', productID);
            setTimeout(() => {
                this.fetchExistingData(productID);
            }, 1000);
        } catch (error) {
            console.error('Error sending product id:', error.message);
        }
        
    },
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        async fetchExistingData(productID: string) {
            const db = getFirestore();
            const productDocRef = doc(db, 'catagory', productID);

            try {
                const productDocSnapshot = await getDoc(productDocRef);

                if (productDocSnapshot.exists()) {
                    const productData = productDocSnapshot.data();
                    this.categoryName = productData.categoryName;
                    this.description = productData.description;
                    this.imageUrl = productData.imageUrl;
                    this.price = productData.price;
                } else {
                    console.error('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product data:', error.message);
            } finally {
                this.loading = false;
            }
        },
        async addToCart() {
            const productID = this.$route.params.productID;
            const db = getFirestore();
            const cartData = {
                productID: productID,
                categoryName: this.categoryName,
                description: this.description,
                imageUrl: this.imageUrl,
                price: this.price,
                quantity: this.quantity,
                selected: true,
            };
            try {
                const userCartDocRef = doc(db, 'cart', this.currentUser.uid);
                const userCartDocSnapshot = await getDoc(userCartDocRef);

                if (userCartDocSnapshot.exists()) {
                    await setDoc(userCartDocRef, { ...userCartDocSnapshot.data(), ...cartData });
                } else {
                    await setDoc(userCartDocRef, {});
                }

                const cartUserDocRef = doc(userCartDocRef, 'cartUser', productID);
                await setDoc(cartUserDocRef, cartData);
                this.addSuccess = true;
                console.log('Add to cart success!');
            } catch (error) {
                console.error('Error adding product to cart:', error.message);
            }
        },
        backToHome() {
            this.$router.push('/')
        },
        Success() {
            this.$router.push('/');
        },
    }
};

</script>

<style>
.product-detail-card {
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    color:#5b5353 ;
    width: 500px;
    height:500px;
    margin-top: 50px;
    padding: 30px;
    box-shadow: 0 30px 30px #a4a3a3;
}
.quantity {
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 60px;
    
}
.product-detail-card img {
    border-radius: 15px;
}
.loading-spinner {
    margin: auto;
    margin-top: 180px;
}

.loading-spinner:before {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 7px solid #ccc;
    border-radius: 50%;
    border-top: 7px solid #666;
    animation: spin 1s linear infinite;
}
.popUp {
    height: 350px;
    padding: 8px;
}
</style>