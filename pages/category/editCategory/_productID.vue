<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <div class="category">
      <NavBar />
      <div>
        <div class="row">
          <div class="text-center">
            <h2>Edit Product</h2>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <form>
              <!-- <div class="selectCategory">
                <div>Selected Category: {{ this.category }}</div>
                <select v-model="selectedCategory">
                  <option disabled value="">Please select one</option>
                  <option
                    v-for="(category, index) in this.categoryProductIds"
                    :key="index"
                  >
                    {{ category.toUpperCase() }}
                  </option>
                </select>
              </div> -->

              <div class="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="productName"
                  required
                />
              </div>
              <div class="form-group">
                <label>Product Description</label>
                <textarea
                  type="text"
                  class="form-control"
                  v-model="description"
                ></textarea>
              </div>
              <div class="form-group">
                <label>Product Image</label>
                <!-- <input type="text" class="form-control" v-model="imageUrl" required/> -->
                <div
                  class="drop-zone"
                  @dragover.prevent
                  @drop="handleDrop"
                  @click="openFileDialog"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="handleFileInput"
                  />
                  <img v-if="imageUrl" :src="imageUrl" class="preview-image" />
                  <span v-else>Drag & Drop or Click to Upload</span>
                  <span v-if="imageUrl" @click="removeImage">&times;</span>
                </div>
              </div>

              <div class="form-group group3">
                <div class="price">
                  <label>Price</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="price"
                    required
                  />
                  <span v-if="errorMessagePrice" class="error-message"
                    >please fill this field</span
                  >
                </div>
                <div class="selectStocked">
                  <div>Stock: {{ selectStocked }}</div>
                  <select v-model="selectStocked">
                    <option disabled value="">Please select one</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Out of Stock</option>
                  </select>
                  <span v-if="errorMessagePrice" class="error-message"
                    >please fill this field</span
                  >
                </div>
              </div>

              <label>Tags</label>
              <div class="tag-input">
                <div v-for="(tag, index) in tags" :key="tag" class="tag">
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
              <br />
              <v-btn class="submit-btn" type="button" @click="editCategory"
                >Edit</v-btn
              >
              <v-btn class="red" @click="backHome">back</v-btn>
            </form>
          </div>
        </div>
      </div>
      <v-dialog v-model="editSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>Edit successfully!</h3>
            <v-btn class="success" @click="Success">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import NavBar from "../../../components/NavBar.vue";
import SignIn from "../../../components/SignIn.vue";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  name: "editCategory",
  components: { NavBar, SignIn },
  data: () => ({
    productName: "",
    description: "",
    imageUrl: "",
    price: "",
    productID: "",
    tags: "",
    category: "",
    selectedCategory: "",
    categoryChoice: "",
    editSuccess: false,
    uploadedImage: null,
    selectStocked: "",
    stock: false,
  }),
  created() {
    this.category = this.$route.query.category;
    this.productID = this.$route.query.productID;
  },
  async mounted() {
    this.fetchExistingData(this.productID, this.category);
    await this.fetchCategory();
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
      this.imageUrl = "";
      this.uploadedImage = null;
    },
    async fetchExistingData(productID: string, category: string) {
      const db = getFirestore();
      const productDocRef = doc(
        db,
        "category",
        category,
        "products",
        productID
      );
      // try {
      //   if (this.stock) {
      //     this.selectStocked = 'available'
      //   } else {
      //     this.selectStocked = 'unavailable'
      //   }
      // } catch (error) {
      //   console.error("Error fetching stock data:", error);
      // }

      try {
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          this.productName = productData.productName;
          this.category = productData.category;
          this.description = productData.description;
          this.imageUrl = productData.imageUrl;
          this.price = productData.price;
          this.tags = productData.tags;
          this.stock = productData.stock;

          if (this.stock === true) {
            this.selectStocked = 'available';
          } else if (this.stock === false) {
            this.selectStocked = 'unavailable';
          }
        } else {
          console.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    async editCategory() {
      const db = getFirestore();
      if (this.selectStocked === 'available') {
        this.stock = true;
      } else if (this.selectStocked === 'unavailable') {
        this.stock = false;
      } 
      const docRef = doc(
        db,
        "category",
        this.category,
        "products",
        this.productID
      );

      const productData = {
        productName: this.productName,
        category: this.category,
        description: this.description,
        imageUrl: this.imageUrl,
        price: this.price,
        productID: this.productID,
        tags: this.tags,
        stock: this.stock,
      };

      try {
        await updateDoc(docRef, productData);
        console.log("Category edited successfully!");
        this.editSuccess = true;
      } catch (error) {
        console.error("Error editing category: ", error);
      }
    },
    updateTag(event) {
      if (event.code == "Comma" || event.code == "Enter") {
        event.preventDefault();
        var val = event.target.value.trim();

        if (val.length > 0) {
          this.tags.push(val);
          event.target.value = "";
        }
      }
    },
    async fetchCategory() {
      const db = getFirestore();
      const catalogCollectionRef = collection(db, "category");

      try {
        const catalogQuerySnapshot = await getDocs(catalogCollectionRef);
        const catalogProductIds = catalogQuerySnapshot.docs.map(
          (doc) => doc.id
        );
        this.categoryProductIds = catalogProductIds;
        console.log("catalogProductIds", this.categoryProductIds);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
    Success() {
      this.$router.push("/");
    },
    backHome() {
      this.$router.push("/category/homeAdmin");
    },
  },
};
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
  width: auto;
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
.preview-image {
  width: 100px;
  height: 100px;
}
.form-group .drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.form-group .drop-zone:hover {
  background-color: #f5f5f5;
}
.form-group .drop-zone:active {
  background-color: #e0e0e0;
}
.drop-zone {
  border-radius: 7px;
  color: #869be6;
}
.drop-zone:hover {
  opacity: 0.6;
}
.tag-input {
  width: 100%;
  border: 1px solid #ccc;
  font-size: 0.9em;
  height: auto;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 8px;
}
.tag {
  height: 30px;
  float: left;
  margin-left: 10px;
  background-color: #ccc;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 8px;
}
.tag span {
  cursor: pointer;
  opacity: 0.75;
}
.tag-text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
.selectCategory select {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 300px;
}
.selectStocked select {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: auto;
}
.group3 {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
</style>
