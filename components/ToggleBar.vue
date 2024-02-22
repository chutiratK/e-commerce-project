<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="transparent" dark v-bind="attrs" v-on="on" class="barIcon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </v-btn>
    </template>
    <v-list style="background-color: rgba(255, 254, 254, 0.9)">
      <v-list-item
        v-for="(category, index) in categoryProductIds"
        :key="index"
        @click="setCategoryQuery(category)"
        class="sub-menu-link"
      >
        <v-list-item-title style="color: #525252">
          {{ category }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: "toggleBar",
  components: {},
  data: () => ({
    categoryProductIds: [],
  }),
  async mounted() {
    await this.fetchCategory();
  },
  methods: {
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
    setCategoryQuery(category) {
      this.$router.push({ path: "/product", query: { q: category } });
      this.fetchData();
    },
  },
};
</script>

<style>
.sub-menu-link svg {
  margin-right: 20px;
  width: 50px;
  height: 30px;
  background: rgba(235, 235, 235, 0.858);
  border-radius: 50%;
  padding: 8px;
}
.sub-menu-link span {
  color: #525252;
}
.sub-menu-link:hover {
  background-color: rgba(84, 82, 82, 0.3);
  border-radius: 5px;
}
.barIcon svg {
  width: 15px;
  height: 15px;
  fill: #e5e2e2;
}
</style>
