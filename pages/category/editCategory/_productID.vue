<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <div class="category">   
            <NavBar /> 
            <div >
                <div class="row">
                    <div class="text-center">
                        <h2>Edit category</h2>
                    </div>
                </div>
                <br>
                <hr>
                <br>
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8">
                        <form>
                            <div class="form-group">
                                <label>Product Name</label>
                                <input type="text" class="form-control" v-model="categoryName" required/>
                               
                            </div>
                            <div class="form-group">
                                <label>Product Description</label>
                                <textarea type="text" class="form-control" v-model="description"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Product Image</label>
                                <input type="text" class="form-control" v-model="imageUrl" required/>
                                
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="price" required/>
                                
                            </div><br>
                            <v-btn class="submit-btn" type="button" @click="editCategory">Edit</v-btn>
                            <v-btn class="red" @click="backHome">back</v-btn>
                        </form>
                    </div>
                </div>
            </div>
            <v-dialog v-model="editSuccess" max-width="400px" >
                <v-card class="popUp" style="background-color: white; color: #5b5353">
                    <center>
                        <img src="../../../assets/images/check.webp" width="200px" height="200px">
                        <h3>Edit successfully!</h3>
                        <v-btn class="success" @click="Success">ok</v-btn>
                    </center>
                </v-card>
            </v-dialog>
        </div>
    </v-app>
</template>

<script lang="ts">
import NavBar from "../../../components/NavBar.vue"
import SignIn from "../../../components/SignIn.vue"
import { getFirestore, setDoc, doc, collection, query, getDoc, getDocs } from 'firebase/firestore';

export default {
    name: "editCategory",
    components: { NavBar, SignIn},
    data:() => ({
        categoryName: '',
        description: '',
        imageUrl: '',
        price: '',
        editSuccess: false,
    }),
    mounted() {
        const productID = this.$route.params.productID;
        console.log('ProductID:', productID);
    },
    methods: {
        async fetchExistingData(productID: string) {
            const db = getFirestore();
            const productDocRef = doc(db, 'catalog', productID);

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
            }
        },
        async editCategory () {
            const db = getFirestore();
            
            const q = query(collection(db, 'catalog'));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = doc(db, 'catalog', querySnapshot.docs[0].id);
                const categoryData = {
                    categoryName: this.categoryName,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    price: this.price
                };

                try {
                    await setDoc(docRef, categoryData);
                    console.log('Category edited successfully!');
                    this.addSuccess = true;
                } catch (error) {
                    console.error('Error editing category: ', error);
                }
            } else {
            console.error('Category not found');
            }
            
        },
        Success() {
            this.$router.push('/');
        },
        backHome() {
            this.$router.push('/category/homeAdmin');
        },
    }
}
</script>

<style>
.category {
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    color: #5b5353;
    width: 500px;
    height: 500px;
    margin: auto;
    margin-top: 50px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.submit-btn {
    justify-content: center;
    margin: auto;
}
.form-group input {
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.form-group textarea {
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.popUp {
    height: 400px;
}
.popUp img {
    margin-top: 50px;
}

</style>