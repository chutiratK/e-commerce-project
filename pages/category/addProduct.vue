<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <div class="category">
      <NavBar />
      <div>
        <div class="row">
          <div class="text-center">
            <h2>Add Product</h2>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <form>
              <div class="selectCategory">
                <div>Selected Category: {{ selectCategory }}</div>
                <select v-model="selectCategory">
                  <option disabled value="">Please select one</option>
                  <option
                    v-for="(category, index) in this.categoryProductIds"
                    :key="index"
                  >
                    {{ category.toUpperCase() }}
                  </option>
                </select>
              </div>
              <span v-if="errorMessageName" class="error-message">
                please fill this field
              </span>

              <div class="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="productName"
                  required
                />
                <span v-if="errorMessageName" class="error-message"
                  >please fill this field</span
                >
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
                <span v-if="errorMessageImage" class="error-message"
                  >please fill this field</span
                >
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
                  @keydown="addTag"
                  @keydown.delete="removeLastTag"
                />
              </div>
              <br />
              <v-btn class="submit-btn" type="button" @click="addProduct"
                >Submit</v-btn
              >
              <v-btn class="red" @click="backHome">back</v-btn>
            </form>
          </div>
        </div>
      </div>
      <v-dialog v-model="addSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>added successfully!</h3>
            <v-btn class="success" @click="Success">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
interface CatalogItem {
  productID: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: Array<string>;
  stock: boolean;
}
export default {
  name: "addProduct",
  components: {},
  data: () => ({
    productName: "",
    description: "",
    imageUrl: "",
    price: "",
    uploadedImage: null,
    addSuccess: false,
    errorMessageName: false,
    errorMessageImage: false,
    errorMessagePrice: false,
    tags: [],
    selectCategory: "",
    selectedCategory: "",
    selectStocked: "",
    categoryProductIds: [],
    catalogData: [] as CatalogItem[],
    stock: false,
  }),
  async mounted() {
    await this.fetchCategory();
  },
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    removeImage() {
      this.imageUrl = "";
      this.uploadedImage = null;
    },
    async uploadImage() {
      if (this.uploadedImage) {
        const storageRef = ref(
          getStorage(),
          "images/" + this.uploadedImage.name
        );
        try {
          const uploadTask = await uploadBytes(storageRef, this.uploadedImage);
          this.imageUrl = await getDownloadURL(uploadTask.ref);
          console.log("Image uploaded successfully");
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle the error, such as showing a user-friendly message
        }
      }
    },
    async handleFileInput(event: any) {
      const files = event.target.files;
      if (files.length > 0) {
        if (this.uploadedImage) {
          alert("Only one image can be uploaded.");
          return;
        }
        const image = files[0];
        try {
          const storageRef = ref(getStorage(), "images/" + image.name);
          const uploadTask = await uploadBytes(storageRef, image);
          const imageUrl = await getDownloadURL(uploadTask.ref);
          this.imageUrl = imageUrl;
          this.uploadedImage = image;
          console.log("upload success");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async handleDrop(event: any) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        if (this.uploadedImage) {
          alert("Only one image can be uploaded.");
          return;
        }
        const image = files[0];
        try {
          const storageRef = ref(getStorage(), "images/" + image.name);
          const uploadTask = await uploadBytes(storageRef, image);
          const imageUrl = await getDownloadURL(uploadTask.ref);
          this.imageUrl = imageUrl;
          this.uploadedImage = image;
          console.log("upload success");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async addProduct() {
      await this.uploadImage();
      if (this.productName && this.imageUrl && this.price) {
        const db = getFirestore();
        if (this.selectStocked === 'available') {
          this.stock = true;
        } else if (this.selectStocked === 'unavailable') {
          this.stock = false;
        }
        const productData = {
          productID: "",
          category: "",
          productName: this.productName,
          description: this.description,
          imageUrl: this.imageUrl,
          price: this.price,
          tags: this.tags,
          stock: this.stock,
        };
        try {
          this.selectedCategory = this.selectCategory.toLowerCase();
          console.log("check:", this.selectedCategory);
          const categoryRef = doc(db, "category", this.selectedCategory);
          const categorySnapshot = await getDoc(categoryRef);
          if (!categorySnapshot.exists()) {
            await setDoc(categoryRef, {});
          }

          const productRef = await addDoc(
            collection(categoryRef, "products"),
            productData
          );
          console.log("Category added successfully with ID: ", productRef.id);
          productData.productID = productRef.id;
          productData.category = this.selectedCategory;
          await setDoc(
            doc(
              db,
              "category",
              this.selectedCategory,
              "products",
              productRef.id
            ),
            productData
          );
          this.addSuccess = true;
        } catch (error) {
          console.error("Error adding category: ", error);
        }
      } else {
        if (!this.productName) {
          this.errorMessageName = true;
        }
        if (!this.imageUrl) {
          this.errorMessageImage = true;
        }
        if (!this.price) {
          this.errorMessagePrice = true;
        }
      }
    },
    addTag(event) {
      if (event.code == "Comma" || event.code == "Enter") {
        event.preventDefault();
        var val = event.target.value.trim();

        if (val.length > 0) {
          this.tags.push(val);
          event.target.value = "";
        }
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
      this.$router.push("/category/homeAdmin");
    },
    backHome() {
      this.$router.push("/category/homeAdmin");
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
.error-message {
  color: red;
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
.preview-image {
  width: 100px;
  height: 100px;
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
