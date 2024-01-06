<template>
    <div>
        <v-btn v-if="isAdmin" @click="goToAdminPage" class="gotoAdmin">Go to Admin Page</v-btn>
        <div class="product-container">
            <div v-for="(product, index) in catalogData" :key="index">
                <div class="product-card">
                    <center>
                        <img :src="product.imageUrl" alt="Product Image" width="200px" height="200px"/>
                    </center>
                    <div class="product1">
                        <h3>{{ product.categoryName }}</h3>
                        <p>{{ product.description }}</p>
                        <p>{{ product.price }}</p>
                        <v-spacer></v-spacer>
                        <v-btn class="detailBtnn" @click="productDetail(product.productID)">detail</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getFirestore, collection, getDoc, doc, getDocs } from 'firebase/firestore';

interface CatalogItem {
    productID: string;
    categoryName: string;
    description: string;
    price: number;
    imageUrl: string;
    
}
export default {
    data:() => ({
        catalogData: [] as CatalogItem[],
        isAdmin: false,
    }),
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        productDetail (productID: string) {
            this.$router.push('/category/productDetail/' + productID);
        },
        async fetchUserData() {
            const db = getFirestore();
            const catalogCollectionRef = collection(db, 'catagory');
            
            try {
                const catalogQuerySnapshot = await getDocs(catalogCollectionRef);

                const catalogData: CatalogItem[] = [];
                catalogQuerySnapshot.forEach((doc) => {
                    const data = doc.data() as CatalogItem;
                    catalogData.push(data);
                });

                this.catalogData = catalogData;
                
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }

            try {
                const usersCollectionRef = collection(db, 'users');
                const userDocRef = doc(usersCollectionRef, this.currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                console.log("user: ",)
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();

                    if (userData.role === 'admin') {
                        this.isAdmin = true;
                    }
                }

            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        },
        goToAdminPage() {
            this.$router.push('/category/homeAdmin');
        },
    },
    mounted() {
        (this as any).fetchUserData();
    },
};
</script>

<style>
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around; 
}
.product-card {
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    color:#5b5353 ;
    width: 300px;
    height:400px;
    margin-top: 50px;
    box-shadow: 0 30px 30px #a4a3a3;
}
.product-card img {
    margin: 10px;
    border-radius: 15px;
}
.product1 {
    margin-left: 30px;
}
.addCart{
    margin-top: 50px;
    margin-left: 100px;
} 
.linkDetail {
    margin-left: 200px;
    text-decoration: none;
}
.detailBtnn {
    width: 85%;
}
.gotoAdmin {
    display: flex;
    margin: auto;
}
</style>
  