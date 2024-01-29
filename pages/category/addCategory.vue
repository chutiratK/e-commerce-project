<template>
  <div class="category-container">
    <NavBar />
    <h1>Categories</h1>
    <v-btn class="addCategory" @click="addCategoryBtn">+ New Category</v-btn>

    <div class="categoryy">
      <div
        v-for="(category, index) in categoryData"
        :key="index"
        class="category-card"
        @click="categoryDetail(categoryId)"
      >
        <div class="more" @click="toggleDropdown">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
            />
          </svg>
        </div>
        <div class="dropdown-content" v-show="isDropdownOpen">
          <div @click="editItem">Edit</div>
          <div @click="deleteItem">Delete</div>
        </div>
        <span>{{ category.categoryId }} {{ category.productCount }}</span>
      </div>
    </div>

    <v-dialog v-model="addCategoryModal" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <v-card-title>Add category</v-card-title>
        <hr />
        <div class="addCate">
          <label>Category Name</label><br />
          <input v-model="categoryName" />
        </div>
        <center>
          <v-btn class="green" @click="Success">Add</v-btn>
          <v-btn class="red" @click="cancel">Cancel</v-btn>
        </center>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addCategorySuccess" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <center>
          <img
            src="../../assets/images/check.webp"
            width="200px"
            height="200px"
          />
          <h3>add successfully!</h3>
          <v-btn class="green" @click="ok">OK</v-btn>
        </center>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

interface CatalogItem {
  productID: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: Array<string>;
}
export default {
  data: () => ({
    catalogData: [] as CatalogItem[],
    categoryProductIds: [],
    categoryData: [],
    isDropdownOpen: false,
    addCategoryModal: false,
    addCategorySuccess: false,
    categoryName: "",
  }),
  methods: {
    addCategoryBtn() {
      this.addCategoryModal = true;
    },

    async fetchCatalogData() {
      const db = getFirestore();
      const catalogCollectionRef = collection(db, "category");

      try {
        const catalogQuerySnapshot = await getDocs(catalogCollectionRef);
        const categoryData = [];
        for (const doc of catalogQuerySnapshot.docs) {
          const categoryId = doc.id;

          const productsCollectionRef = collection(
            db,
            "category",
            categoryId,
            "products"
          );
          const productsQuerySnapshot = await getDocs(productsCollectionRef);

          const productCount = productsQuerySnapshot.size;
          categoryData.push({ categoryId, productCount });
          this.categoryData = categoryData;
        }
        console.log("Category Data:", categoryData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    categoryDetail() {},
    async categoryCount() {
      const db = getFirestore();
      const cartDocRef = collection(
        db,
        "category",
        this.currentUser.uid,
        "cartUser"
      );
      onSnapshot(cartDocRef, (snapshot) => {
        this.cartItemCount = snapshot.size.toString();
      });
    },
    async Success() {
      const db = getFirestore();
      const catalogCollectionRef = collection(db, "category");
      const categoryNameToCheck = this.categoryName.trim();
      const catalogQuerySnapshot = await getDocs(catalogCollectionRef);
      try {
        const categoryNames = catalogQuerySnapshot.docs.map((doc) => doc.id);

        if (categoryNames.includes(categoryNameToCheck)) {
          alert(
            "Category name already exists. Please choose a different name."
          );
        } else {
          const newCategoryDocRef = doc(
            catalogCollectionRef,
            this.categoryName
          );
          await setDoc(newCategoryDocRef, {});
          this.addCategoryModal = false;
          this.addCategorySuccess = true;
          this.fetchCatalogData();
        }
      } catch (error) {
        console.error("Error checking category name:", error.message);
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    editItem() {
      console.log("Edit item");
      this.isDropdownOpen = false;
    },
    deleteItem() {
      console.log("Delete item");
      this.isDropdownOpen = false;
    },
    cancel() {
      this.addCategoryModal = false;
    },
    ok() {
      this.addCategorySuccess = false;
    },
  },
  mounted() {
    (this as any).fetchCatalogData();
  },
};
</script>

<style>
h1 {
  color: #636363;
}
.addCategory {
  background-color: rgb(145, 145, 245) !important;
  color: #fbfbfb;
}
.categoryy {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.category-card {
  width: 250px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/images/unicornBG.webp");
  color: #ffffff;
  margin-top: 50px;
  box-shadow: 0 10px 10px #a4a3a3;
  display: flex;
  align-items: flex-end;
}
.category-card span {
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
}
.category-card:hover {
  background-color: rgb(207, 207, 207);
  cursor: pointer;
  box-shadow: 0 20px 20px #a4a3a3;
}
.more {
  position: relative;
  top: 0;
  right: 0;
}
.more svg {
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: #ffffff;
}

.more svg:hover {
  background-color: #ffffff;
  opacity: 0.1;
  border-radius: 50%;
  fill: #2f61d4;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content div {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content div:hover {
  background-color: #ddd;
}
.addCate input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 300px;
}
.addCate {
  margin-left: 40px;
  margin-bottom: 65px;
  margin-top: 30px;
}
</style>
