<template>
  <div>
    <NavBar />
    <Nuxt />
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
            <!-- <p>{{ product.description }}</p> -->
            <p>{{ product.price }} Bath</p>
            <div class="tags-container">
              <span v-for="(tag, tagIndex) in product.tags" :key="tagIndex">{{
                tag
              }}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn class="detailBtnn" @click="productDetail(product.productID)"
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
    categoryQuery: "",
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  created() {
    this.categoryQuery = this.$route.query.q || "";
    console.log("this.categoryQuery ", this.categoryQuery);
  },
  methods: {
    productDetail(productID: string) {
      this.$router.push("/category/productDetail/" + productID);
    },
    async fetchData() {
      const db = getFirestore();
      const catalogCollectionRef = collection(
        db,
        "category",
        this.categoryQuery,
        "products"
      );

      try {
        const catalogQuerySnapshot = await getDocs(catalogCollectionRef);

        const catalogData: CatalogItem[] = [];
        catalogQuerySnapshot.forEach((doc) => {
          const data = doc.data() as CatalogItem;
          catalogData.push(data);
        });

        this.catalogData = catalogData;
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
        console.error("Error fetching user data:", error);
      }
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
