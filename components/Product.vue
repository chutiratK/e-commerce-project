<template>
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
                    <router-link class="linkDetail" to="/productDetail">detail</router-link>
                    <!-- <v-btn @click="addToCart" class="addCart">Add to Cart</v-btn> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';

interface CatalogItem {
    categoryName: string;
    description: string;
    price: number;
    imageUrl: string;
    
}
export default {
    data:() => ({
        catalogData: [] as CatalogItem[],
        
    }),
    methods: {
        addToCart() {
            
        },
        async fetchUserData() {
            const db = getFirestore();
            const catalogCollectionRef = collection(db, 'catalog');
            
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
}
.product-card img {
    margin: 10px;
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
</style>
  