<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <div class="category">   
            <NavBar /> 
            <div >
                <div class="row">
                    <div class="text-center">
                        <h2>Add category</h2>
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
                                <span v-if="errorMessageName" class="error-message">please fill this field</span>
                            </div>
                            <div class="form-group">
                                <label>Product Description</label>
                                <textarea type="text" class="form-control" v-model="description"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Product Image</label>
                                <input type="text" class="form-control" v-model="imageUrl" required/>
                                <span v-if="errorMessageImage" class="error-message">please fill this field</span>
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="price" required/>
                                <span v-if="errorMessagePrice" class="error-message">please fill this field</span>
                            </div><br>
                            <v-btn class="submit-btn" type="button" @click="addCategory">Submit</v-btn>
                            <v-btn class="red" @click="backHome">back</v-btn>
                        </form>
                    </div>
                </div>
            </div>
            <v-dialog v-model="addSuccess" max-width="400px" >
                <v-card class="popUp" style="background-color: white; color: #5b5353">
                    <center>
                        <img src="../../assets/images/check.webp" width="200px" height="200px">
                        <h3>added successfully!</h3>
                        <v-btn class="success" @click="Success">ok</v-btn>
                    </center>
                </v-card>
            </v-dialog>
        </div>
    </v-app>
</template>

<script lang="ts">
import axios from "axios";
import NavBar from "../../components/NavBar.vue"
import SignIn from "../../components/SignIn.vue"
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

export default {
    name: "addCategory",
    components: { NavBar, SignIn},
    data:() => ({
        categoryName: '',
        description: '',
        imageUrl: '',
        price: '',
        addSuccess: false,
        errorMessageName: false,
        errorMessageImage: false,
        errorMessagePrice: false,
    }),
    methods: {
        async addCategory () {
            if (this.categoryName && this.imageUrl && this.price) {
                const db = getFirestore();
                
                const categoryData = {
                    productID: '',
                    categoryName: this.categoryName,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    price: this.price
                };
                try {
                    const docRef = await addDoc(collection(db, 'catalog'), categoryData);
                    console.log('Category added successfully with ID: ', docRef.id);
                    categoryData.productID = docRef.id;
                    await setDoc(doc(db, 'catalog', docRef.id), categoryData);
                    this.addSuccess = true;
                    
                } catch (error) {
                    console.error('Error adding category: ', error);
                }
            } else {
                if (!this.categoryName) {this.errorMessageName = true;}
                if (!this.imageUrl) {this.errorMessageImage = true;}
                if (!this.price) {this.errorMessagePrice = true;}
            }
            
        },
        Success() {
            this.$router.push('/category/homeAdmin');
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
    border: 1px solid #dc8b8b; 
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
.error-message {
    color: red;
}
</style>