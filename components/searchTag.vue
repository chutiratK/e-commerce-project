<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="Search tags" />
    <button @click="search" class="searchIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 512 512"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "search",
  components: {},
  data: () => ({
    searchQuery: "",
  }),
  methods: {
    async search() {
      this.$router.push({ path: "/search", query: { q: this.searchQuery } });
      this.searchTag();
    },
  },
});
</script>

<style>
.searchIcon svg {
  fill: #dddddd;
}
.search-bar {
  display: flex;
  align-items: center;
  margin-left: auto;
  flex: 1;
}

.search-bar input {
  padding: 8px;
  margin-right: 15px;
  background-color: #ffffff;
  opacity: 0.75;
  border: 1px solid #ccc;
  border-radius: 25px;
  height: 30px;
  font-size: 13px;
}
.searchIcon {
  margin-right: 15px;
}
@media (max-width: 600px) {
  .search-bar input {
    padding: 5px;
    margin-right: 2px;
  }
}
</style>
