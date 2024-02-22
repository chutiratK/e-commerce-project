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
      >
        <div class="more">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                  />
                </svg>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item @click="editCategory(category.categoryId)">
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
              <v-list-item @click="deleteCategory(category.categoryId)">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <span class="titleCategory"
          >{{ category.categoryId }} {{ category.productCount }}</span
        >
      </div>
      <div class="add-category-btn" @click="addCategoryBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </div>
    </div>

    <v-dialog v-model="addCategoryModal" max-width="400px">
      <v-card class="popUp" style="background-color: white; color: #5b5353">
        <v-card-title>Add category</v-card-title>
        <hr />
        <div class="addCate">
          <label>Category Name</label><br />
          <input v-model="category" />
        </div>
        <center>
          <div class="btn">
            <v-btn class="green" @click="Success">Add</v-btn>
            <v-btn class="red" @click="cancel">Cancel</v-btn>
          </div>
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
          <v-btn class="green btn" @click="ok">OK</v-btn>
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
    addCategoryModal: false,
    addCategorySuccess: false,
    category: "",
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
        console.error("Error fetching user data:", error);
      }
    },
    categoryDetail() {},
    async categoryCount() {
      const db = getFirestore();
      // const cartDocRef = collection(
      //   db,
      //   "category",
      //   this.currentUser.uid,
      //   "cartUser"
      // );
      // onSnapshot(cartDocRef, (snapshot) => {
      //   this.cartItemCount = snapshot.size.toString();
      // });
    },
    async Success() {
      const db = getFirestore();
      const catalogCollectionRef = collection(db, "category");
      const categoryNameToCheck = this.category.trim();
      const catalogQuerySnapshot = await getDocs(catalogCollectionRef);
      try {
        const categoryNames = catalogQuerySnapshot.docs.map((doc) => doc.id);

        if (categoryNames.includes(categoryNameToCheck)) {
          alert(
            "Category name already exists. Please choose a different name."
          );
        } else {
          const newCategoryDocRef = doc(catalogCollectionRef, this.category);
          await setDoc(newCategoryDocRef, {});
          this.addCategoryModal = false;
          this.addCategorySuccess = true;
          this.fetchCatalogData();
        }
      } catch (error) {
        console.error("Error checking category name:", error);
      }
    },
    // editCategory(category: any) {},
    async deleteCategory(categoryId: any) {
      const db = getFirestore();
      const categoryDocRef = doc(db, "category", categoryId);

      try {
        await deleteDoc(categoryDocRef);

        this.fetchCatalogData();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
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
  transition: transform 0.3s ease-in-out;
}
.category-card span {
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
}
.titleCategory {
  margin-top: 5px;
}

.category-card:hover {
  background-color: rgb(207, 207, 207);
  cursor: pointer;
  box-shadow: 0 20px 20px #a4a3a3;
  transform: scale(1.1);
}
.more {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
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
.add-category-btn {
  background-color: #ffffff;
  width: 250px;
  height: 200px;
  border-radius: 10px;
  color: #474385;
  margin-top: 50px;
  box-shadow: 0 10px 10px #a4a3a3;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-category-btn:hover {
  cursor: pointer;
  box-shadow: 0 20px 20px #a4a3a3;
  transform: scale(1.1);
}
.add-category-btn svg {
  fill: #636363;
  width: 50px;
  height: 50px;
}
.btn {
  margin-bottom: 8px;
}
.popUp {
  height: 300px;
}
</style>
