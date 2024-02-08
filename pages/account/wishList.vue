<template>
  <v-app style="background-color: rgb(236, 236, 236)">
    <NavBar />
    <Nuxt />
    <h1 class="m-3 pt-3" style="color: #5b5353">Account User</h1>
    <hr />
    <br />
    <div class="row">
      <AccSideBar />
      <div class="col-md-8 mt-1">
        <div v-if="currentUser">
          <div class="card mb-3 content">
            <h2 class="m-3 pt-3">My Wish List ({{ this.wishCount }})</h2>
            <hr />
            <div class="card-body">
              <div class="wishListCard">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Price (Bath)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- @click="productDetail(item.productID, item.category)" -->
                    <tr
                      v-for="(item, index) in paginatedData"
                      :key="index"
                      class="productDetail"
                    >
                      <td>
                        <img
                          :src="item.imageUrl"
                          alt="Product Image"
                          width="50px"
                          height="50px"
                        />
                      </td>
                      <td @click="productDetail(item.productID, item.category)">
                        {{ item.productName }}
                      </td>
                      <td>{{ item.price }} ฿</td>
                      <td>
                        <div class="wishbtn">
                          <!-- <div
                            @click="addToCart(item.productID)"
                            class="addcart"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                              />
                            </svg>
                          </div> -->
                          <div @click="unWish(item.productID)" class="unwish">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="14"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="#ff3838"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination">
                  <p @click="previousPage" :disabled="currentPage === 1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
                      />
                    </svg>
                  </p>
                  <span>Page {{ currentPage }}</span>
                  <p @click="nextPage" :disabled="currentPage === totalPages">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="addCartSuccess" max-width="400px">
        <v-card class="popUp" style="background-color: white; color: #5b5353">
          <center>
            <img
              src="../../assets/images/check.webp"
              width="200px"
              height="200px"
            />
            <h3>added to cart successfully!</h3>
            <br />
            <v-btn class="success" @click="Success">ok</v-btn>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AccSideBar from "../../components/AccountSideBar.vue";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

interface WishList {
  productID: string;
  category: string;
  productName: string;
  imageUrl: string;
  price: number;
}
export default Vue.extend({
  name: "wishlist",
  components: { AccSideBar },
  data: () => ({
    wishlist: "",
    allwishlist: [] as WishList[],
    productName: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: 1,
    category: "",
    productID: "",
    addCartSuccess: false,
    currentPage: 1,
    itemsPerPage: 3,
    wishCount: 0,
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    totalPages() {
      return Math.ceil(this.allwishlist.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allwishlist.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchUserData() {
      const db = getFirestore();
      const userwishListRef = collection(
        db,
        "wishList",
        this.currentUser.uid,
        "wishListUser"
      );

      try {
        onSnapshot(userwishListRef, (snapshot) => {
          const updatedAddr: WishList[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as WishList;
            updatedAddr.push(data);
          });
          this.allwishlist = updatedAddr;
          console.log("Wishlist data:", updatedAddr);
        });
      } catch (error) {
        console.error("Error fetching wishList user data:", error.message);
      }

      try {
        onSnapshot(userwishListRef, (snapshot) => {
          this.wishCount = snapshot.size.toString();
          console.log("cart: ", this.wishCount);
        });
      } catch (error) {
        console.error("Error fetching wishList user data:", error.message);
      }
    },
    // async addToCart(productID: string) {
    //   const db = getFirestore();
    //   const cartData = {
    //     productID: this.productID,
    //     category: this.category,
    //     productName: this.productName,
    //     description: this.description,
    //     imageUrl: this.imageUrl,
    //     price: this.price,
    //     quantity: this.quantity,
    //     selected: true,
    //   };
    //   if (this.currentUser) {
    //     try {
    //       const userCartDocRef = doc(db, "cart", this.currentUser.uid);
    //       const userCartDocSnapshot = await getDoc(userCartDocRef);

    //       if (userCartDocSnapshot.exists()) {
    //         await setDoc(userCartDocRef, {
    //           ...userCartDocSnapshot.data(),
    //           ...cartData,
    //         });
    //       } else {
    //         await setDoc(userCartDocRef, {});
    //       }

    //       const cartUserDocRef = doc(userCartDocRef, "cartUser", productID);
    //       await setDoc(cartUserDocRef, cartData);
    //       this.addCartSuccess = true;
    //       console.log("Add to cart success!");
    //     } catch (error) {
    //       console.error("Error adding product to cart:", error.message);
    //     }
    //   } else {
    //     this.$refs.loginModal.showModal();
    //   }
    // },
    async unWish(productID: string) {
      try {
        const db = getFirestore();
        const userWishList = doc(
          db,
          "wishList",
          this.currentUser.uid,
          "wishListUser",
          productID
        );

        await deleteDoc(userWishList);
        await this.fetchUserData();
      } catch (error) {
        console.error("Error deleting product on wish list:", error.message);
      }
    },
    totalPages() {
      return Math.ceil(this.catalogData.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.catalogData.slice(startIndex, endIndex);
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
    productDetail(productID: string, category: string) {
      // this.$router.push("/category/productDetail/" + productID);
      this.$router.push({
        path: "/category/productDetail/",
        query: { category, productID },
      });
    },
  },
  mounted() {
    (this as any).fetchUserData();
  },
});
</script>

<style>
.title-1 {
  font-weight: bold;
}
.content {
  border-radius: 10px;
  background-color: rgb(253, 253, 253);
  color: #5b5353;
  width: 700px;
  height: 500px;
  overflow: auto;
}
.content h2,
hr {
  margin: 20px 40px;
}
.card-body {
  margin: 20px 40px;
}
.wishListCard img {
  border-radius: 50%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
td {
  cursor: pointer;
  /* transition: transform 0.3s ease-in-out; */
}
/* td:hover {
  background-color: #e8f3ff;
  transform: scale(1.1);
} */
.pagination {
  display: flex;
  color: #656565;
}
.pagination p {
  cursor: pointer;
}
.pagination svg {
  fill: #656565;
  width: 10px;
  height: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.addcart svg {
  fill: #656565;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  width: 23px;
  height: 23px;
}
.addcart svg:hover {
  fill: #a2b0e2;
  transform: scale(1.1);
}
.unwish svg {
  width: 21px;
  height: 21px;
  fill: #656565;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.unwish svg:hover {
  fill: #f14646;
  transform: scale(1.1);
}
.wishbtn {
  display: flex;
  gap: 10px;
}
</style>
