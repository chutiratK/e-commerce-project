<template>
   <v-app style="background-color: rgb(236, 236, 236);">
    <NavBar /> 
    <center>
        <div class="product-detail-card">
            <img src="" alt="Product Image" width="200px" height="200px"/>
            <div>
                <h1>{{ userData.name }}</h1>
                <p>{{ userData.detail }}</p>
                <v-btn @click="addToCart" color="primary">Add to Cart</v-btn>
                <router-link to="/" color="red">back</router-link>
            </div>
        </div>
    </center>
  </v-app>
</template>

<script lang="ts">
import NavBar from "../components/NavBar.vue"
import SignIn from "../components/SignIn.vue"
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default {
    name: "product1",
    components: { NavBar, SignIn},
    data() {
        return {
            userData: {
                name: '', 
                detail: '',
            },
        };
    },
    methods: {
        addToCart() {
            
        },
        async fetchUserData() {
            const db = getFirestore();
            const userDocRef = doc(db, 'product', 'Product1');
            
            try {
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    this.userData = userDocSnapshot.data();

                } else {
                    console.error('User document does not exist.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
            
        },
    },
    mounted() {
        (this as any).fetchUserData();
    },
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
}
</style>