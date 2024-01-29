<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <div>
      <h1>Searching Result:</h1>
      <div class="product-container">
        <div v-for="(product, index) in searchResults" :key="index">
          <div class="product-card">
            <center>
              <img
                :src="product.imageUrl"
                alt="Product Image"
                width="200px"
                height="200px"
              />
            </center>
            <div class="product1">
              <h3>{{ product.productName }}</h3>
              <p>{{ product.description }}</p>
              <p>{{ product.price }}</p>
              <div class="tags-container">
                <span v-for="(tag, tagIndex) in product.tags" :key="tagIndex">{{
                  tag
                }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-btn
                class="detailBtnn"
                @click="productDetail(product.productID)"
                >detail</v-btn
              >
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Vue from "vue";

interface CatalogItem {
  productID: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: Array<string>;
}
export default {
  name: "searchResult",
  data: () => ({
    searchQuery: "",
    searchResults: [],
  }),
  created() {
    this.searchQuery = this.$route.query.q || "";
    console.log("this.searchQuery ", this.searchQuery);
  },
  methods: {
    async searchTag() {
      this.searchResults = [];

      const db = getFirestore();
      const categoryRef = collection(db, "category");
      const searchQueryLowerCase = this.searchQuery.toLowerCase();

      const querySnapshot = await getDocs(categoryRef);
      console.log(
        "query: ",
        querySnapshot.docs.map((doc) => doc.data())
      );
      const documents = querySnapshot.docs.map((doc) => doc.data());

      const results = [];
      documents.forEach((document) => {
        const tags = document.tags || [];
        if (tags.includes(searchQueryLowerCase)) {
          results.push(document.productID);
          console.log("Match found! ProductID:", document.productID);
        }
      });
      console.log("results", results);
      await this.fetchProductDetails(results);
    },
    async fetchProductDetails(productIDs: string[]) {
      const db = getFirestore();
      const categoryRef = collection(db, "category");

      const products = [];

      for (const productID of productIDs) {
        const productDoc = doc(categoryRef, productID);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data() as CatalogItem;
          products.push(productData);
        }
      }

      this.searchResults = products;
    },
    productDetail(productID: string) {
      this.$router.push("/category/productDetail/" + productID);
    },
  },
  async mounted() {
    await this.searchTag();
  },
};
</script>

<style>
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.product-card {
  border-radius: 10px;
  background-color: rgb(253, 253, 253);
  color: #5b5353;
  width: 300px;
  height: auto;
  margin-top: 50px;
  box-shadow: 0 30px 30px #a4a3a3;
}
.product-card img {
  margin: 10px;
  border-radius: 15px;
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
.detailBtnn {
  width: 85%;
  margin: 10px;
}
.gotoAdmin {
  display: flex;
  margin: auto;
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
</style>
