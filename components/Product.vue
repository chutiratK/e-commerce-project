<template>
  <div>
    <v-btn v-if="isAdmin" @click="goToAdminPage" class="gotoAdmin"
      >Go to Admin Page</v-btn
    >
    <div class="product-container">
      <div v-for="(product, index) in catalogData" :key="index">
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
            <p>{{ product.price }}</p>
            <div class="tags-container">
              <span v-for="(tag, tagIndex) in product.tags" :key="tagIndex">{{
                tag
              }}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              class="detailBtnn"
              @click="productDetail(product.productID, product.category)"
              >detail</v-btn
            >
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
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
    isAdmin: false,
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    productDetail(productID: string, category: string) {
      // this.$router.push("/category/productDetail/" + category +"-"+ productID);
      this.$router.push({
        path: "/category/productDetail/",
        query: { category, productID },
      });
    },
    async fetchData() {
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

      try {
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, this.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          if (userData.role === "admin") {
            this.isAdmin = true;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
    goToAdminPage() {
      this.$router.push("/category/homeAdmin");
    },
  },
  mounted() {
    (this as any).fetchData();
    this.$store.dispatch("fetchUser");
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
