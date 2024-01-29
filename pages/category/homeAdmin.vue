<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <div>
      <NavBar />
      <div class="createBtnContainer">
        <div class="createBtn" @click="createProduct">+ New Product</div>
        <div class="createBtn" @click="createCategory">+ New Category</div>
      </div>
      <!-- <SideBs -->
      <v-card class="productTable">
        <v-row class="header-row">
          <v-col> </v-col>
          <v-col>
            <strong>Name</strong>
          </v-col>
          <v-col>
            <strong>Category</strong>
          </v-col>
          <v-col>
            <strong>Price(Bath)</strong>
          </v-col>
          <v-col> </v-col>
        </v-row>
        <v-row
          v-for="(product, index) in paginatedData"
          :key="index"
          class="data-row"
        >
          <v-col>
            <img
              :src="product.imageUrl"
              alt="Product Image"
              width="50px"
              height="50px"
            />
          </v-col>
          <v-col>{{ product.productName }}</v-col>
          <v-col>{{ product.category }}</v-col>
          <v-col>{{ product.price }} Bath</v-col>
          <v-col class="button-column">
            <v-btn
              class="editBtn"
              @click="editProduct(product.productID, product.category)"
              >EDIT</v-btn
            >
            <v-btn
              class="detailBtn"
              @click="productDetail(product.productID, product.category)"
              >DETAIL</v-btn
            >
            <v-btn
              class="red"
              @click="deleteProduct(product.productID, product.category)"
              >DELETE</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
      <br />
      <div class="pagination">
        <p @click="previousPage" :disabled="currentPage === 1">Previous</p>
        <span>Page {{ currentPage }}</span>
        <p @click="nextPage" :disabled="currentPage === totalPages">Next</p>
      </div>

      <v-dialog v-model="delConfirmForm" max-width="400px">
        <v-card
          class="confirmDel"
          style="background-color: white; color: #5b5353"
        >
          <center>
            <h3>Are you sure?</h3>
            <v-btn class="success" @click="delsuccess">yes</v-btn>
            <v-btn class="red" @click="cancel">no</v-btn>
          </center>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <br />
            <img
              src="../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>delete successfully!</h3>
            <br />
            <v-btn class="success" @click="back">ok</v-btn>
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
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import SideBar from "../../components/AdminSideBar.vue";

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
    delConfirmForm: false,
    deletingProductID: "",
    deleteSuccess: false,
    search: "",
    categoryProduct: "",
    currentPage: 1,
    itemsPerPage: 6,
  }),
  components: {
    SideBar,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.catalogData.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.catalogData.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchCatalogData() {
      const db = getFirestore();
      const catalogCollectionRef = collection(db, "category");

      try {
        const catalogQuerySnapshot = await getDocs(catalogCollectionRef);

        const catalogProductIds = catalogQuerySnapshot.docs.map(
          (doc) => doc.id
        );
        console.log("catalogProductIds", catalogProductIds);

        const allCatalogData: CatalogItem[] = [];

        for (const categoryDoc of catalogQuerySnapshot.docs) {
          const productsCollectionRef = collection(categoryDoc.ref, "products");
          const productsQuerySnapshot = await getDocs(productsCollectionRef);

          productsQuerySnapshot.forEach((productDoc) => {
            const data = productDoc.data() as CatalogItem;

            allCatalogData.push(data);
          });
          this.catalogData = allCatalogData;
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    createProduct() {
      this.$router.push("/category/addProduct");
    },
    createCategory() {
      this.$router.push("/category/addCategory");
    },
    editProduct(productID: string, category: string) {
      this.$router.push({
        path: "/category/editCategory/",
        query: { category, productID },
      });
    },
    productDetail(productID: string, category: string) {
      this.$router.push("/category/productDetail/" + productID);
      this.$router.push({
        path: "/category/productDetail/",
        query: { category, productID },
      });
    },

    deleteProduct(productID: string, category: string) {
      this.deletingProductID = productID;
      this.categoryProduct = category;
      this.delConfirmForm = true;
    },

    async delsuccess() {
      try {
        const db = getFirestore();
        const catalogDocRef = doc(
          db,
          "category",
          this.categoryProduct,
          "products",
          this.deletingProductID
        );

        await deleteDoc(catalogDocRef);
        await this.fetchCatalogData();
        this.deletingProductID = "";
        this.delConfirmForm = false;
        this.deleteSuccess = true;
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    },
    cancel() {
      this.delConfirmForm = false;
      this.deletingProductID = "";
    },
    back() {
      this.deleteSuccess = false;
    },
  },

  mounted() {
    (this as any).fetchCatalogData();
  },
};
</script>

<style>
.popUp {
  height: 380px;
}
.confirmDel {
  height: 200px;
}
.confirmDel h3 {
  padding: 50px;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.productTable {
  border-radius: 10px;
  background-color: rgb(249, 249, 249) !important;
  color: #5b5353 !important;
  width: 1500px;
  height: auto;
  margin-top: 50px;
}
.product-card img {
  margin: 10px;
}
.product1 {
  margin-left: 30px;
}
.addCart {
  margin-top: 50px;
  margin-left: 100px;
}
.linkDetail {
  margin-left: 200px;
  text-decoration: none;
}
.createBtnContainer {
  display: flex;
  gap: 10px;
}
.createBtn {
  width: 200px;
  height: 140px;
  background-image: url("../../assets/images/bgbgbg.webp");
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: bold;
  box-shadow: 0 10px 10px #a4a3a3;
}

.createBtn:hover {
  background-color: rgb(195, 192, 214);
  box-shadow: 0 20px 20px #a4a3a3;
}

.editBtn {
  background-color: rgb(94, 89, 134) !important;
  margin: auto;
}
.editBtn,
.detailBtn,
.red {
  font-size: 10px;
  padding: 5px 10px;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
}
.tags-container span {
  background-color: #ccc;
  padding: 0 8px;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 3px;
}

.header-row,
.data-row {
  border-bottom: 1px solid #ccc;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}

.button-column {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.data-row img {
  border-radius: 8px;
}
</style>
