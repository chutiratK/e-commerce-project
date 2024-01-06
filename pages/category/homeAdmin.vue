<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <div>
            <NavBar /> 
            <v-btn class="createBtn" @click="createProduct">create product</v-btn>
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
                            <!-- <router-link :to="{ name: '/category/editCategory' }">EDIT</router-link> -->
                            <v-btn class="editBtn" @click="editProduct(product.productID)">EDIT</v-btn>
                            <v-btn class="detailBtn" @click="productDetail(product.productID)">DETAIL</v-btn>
                            <v-btn class="red" @click="deleteProduct(product.productID)">DELETE</v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <v-dialog v-model="delConfirmForm" max-width="400px">
                <v-card class="confirmDel" style="background-color: white; color: #5b5353">
                    <center>
                        <h3>Are you sure?</h3>
                        <v-btn class="success" @click="delsuccess">yes</v-btn>
                        <v-btn class="red" @click="cancel">no</v-btn>
                    </center>
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteSuccess" max-width="400px" >
                <v-card class="popUp" style="background-color: white; color: #5b5353">
                    <center>
                        <br>
                        <img src="../../assets/images/check.webp" width="200px" height="200px">
                        <h3>delete successfully!</h3><br>
                        <v-btn class="success" @click="back">ok</v-btn>
                    </center>
                </v-card>
            </v-dialog>
        </div>
    </v-app>
</template>

<script lang="ts">
import { getFirestore, collection, getDocs, doc,deleteDoc } from 'firebase/firestore';

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
        delConfirmForm: false,
        deletingProductID: '',
        deleteSuccess: false,
    }),
    methods: {
        addToCart() {
            
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
            
        },
        createProduct() {
            this.$router.push('/category/addCategory');
        },
        editProduct(productID: string) {
            this.$router.push('/category/editCategory/' + productID);
        },
        productDetail(productID: string) {
            this.$router.push('/category/productDetail/' + productID);
        },
        
        deleteProduct(productID: string) {
            this.deletingProductID = productID;
            this.delConfirmForm = true;
        },

        async delsuccess() {
            try {
                const db = getFirestore();
                const catalogDocRef = doc(db, 'catagory', this.deletingProductID);

                await deleteDoc(catalogDocRef);
                await this.fetchUserData();
                this.deletingProductID = '';
                this.delConfirmForm = false;
                this.deleteSuccess = true;
            } catch (error) {
                console.error('Error deleting product:', error.message);
            }
        },
        cancel(){
            this.delConfirmForm = false;
            this.deletingProductID = '';
        },
        back() {
            this.deleteSuccess = false;
        },
        
    },
    mounted() {
        (this as any).fetchUserData();
    },
};
</script>

<style>
.popUp{
    height: 380px;
}
.confirmDel{
    height: 200px;
}
.confirmDel h3{ 
    padding: 50px;
}
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
.createBtn {
    display: flex;
    margin: auto;
    background-color: #5f5f5f !important;
}
.editBtn {
    background-color:rgb(94, 89, 134) !important;
    margin: auto;
}
</style>
  