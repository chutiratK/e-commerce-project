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
                                <!-- <input type="text" class="form-control" v-model="imageUrl" required/> -->
                                <div class="drop-zone" @dragover.prevent @drop="handleDrop" @click="openFileDialog">
                                    <input type="file" ref="fileInput" style="display: none" @change="handleFileInput">
                                    <img v-if="imageUrl" :src="imageUrl" class="preview-image">
                                    <span v-else>Drag & Drop or Click to Upload</span>
                                    <span v-if="imageUrl" @click="removeImage">&times;</span>
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="price" required/>
                            </div>
                            <label>Tags</label>
                            <div class="tag-input">
                                <div 
                                v-for="(tag, index) in tags"
                                :key="tag"
                                class="tag"
                                >
                                <span @click="removeTag(index)">x</span>
                                {{ tag }}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter new tag"
                                    class="tag-text"
                                    @keydown="updateTag"
                                    @keydown.delete="removeLastTag"
                                />
                            </div>
                            <br>
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
import { getFirestore, setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export default {
    name: "editCategory",
    components: { NavBar, SignIn},
    data:() => ({
        categoryName: '',
        description: '',
        imageUrl: '',
        price: '',
        productID: '',
        tags: '',
        editSuccess: false,
        uploadedImage: null,
    }),
    mounted() {
        try {
            const productID = this.$route.params.productID;
            console.log('ProductID:', productID);
            if (productID) {
                this.fetchExistingData(productID);
                this.productID = productID
            }
        } catch (error) {
            console.error('Error sending product id:', error.message);
        }
        
    },
    methods: {
        openFileDialog() {
            this.$refs.fileInput.click();
        },
        handleDrop(event: any) {
            event.preventDefault();

            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.handleImage(files[0]);
            }
        },

        handleFileInput() {
            const files = this.$refs.fileInput.files;
            if (files.length > 0) {
                this.handleImage(files[0]);
            }
        },

        handleImage(file: any) {
            if (file) {
                this.uploadedImage = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage() {
            this.imageUrl = '';
            this.uploadedImage = null;
        },
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
                    this.tags = productData.tags;
                } else {
                    console.error('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product data:', error.message);
            }
        },
        async editCategory () {
            const db = getFirestore();
            const docRef = doc(db, 'catagory', this.productID);
            const categoryData = {
                categoryName: this.categoryName,
                description: this.description,
                imageUrl: this.imageUrl,
                price: this.price,
                productID: this.productID,
                tags: this.tags,
            };

            try {
                await updateDoc(docRef, categoryData); 
                console.log('Category edited successfully!');
                this.editSuccess = true;
            } catch (error) {
                console.error('Error editing category: ', error);
            }
            
        },
        updateTag(event) {
            if (event.code == 'Comma' || event.code == 'Enter') {
                event.preventDefault()
                var val = event.target.value.trim()

                if (val.length > 0) {
                    this.tags.push(val)
                    event.target.value = ''
                }
            }
        },
        removeTag(index) {
            this.tags.splice(index, 1);
        },
        removeLastTag(event) {
            if (event.target.value.length === 0) {
                this.removeTag(this.tags.length - 1)
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
    height: auto;
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