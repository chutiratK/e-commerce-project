<template>
  <div class="col-md-4 mt-1">
    <div class="card text-center sidebar">
      <div class="sub-sidebar">
        <NuxtLink to="/category/homeAdmin" class="sub-sidebar-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
          <p>categories</p>
          <span>></span>
        </NuxtLink>
        <NuxtLink to="/category/homeAdmin" class="sub-sidebar-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="12"
            viewBox="0 0 384 512"
          >
            <path
              fill="#000000"
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg>
          <p>products</p>
          <span>></span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "AccountSideBar",
  methods: {
    async signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "index" });
        })
        .catch((error) => {
          console.error("error: ", error.message);
        });
    },
  },
};
</script>

<style>
.sub-sidebar {
  padding: 20px;
  margin: 10px;
}
.sidebar {
  border-radius: 10px;
  background-color: rgb(253, 253, 253);
  color: #5b5353;
  width: 300px;
  height: 500px;
}
.sub-sidebar-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #525252;
  margin: 12px 0;
}
.sub-sidebar-link:hover {
  background-color: rgba(84, 82, 82, 0.3);
  border-radius: 5px;
}
.sub-sidebar-link p {
  width: 100%;
  color: #525252;
  margin-top: 15px;
}
.sub-sidebar-link span {
  color: #525252;
  margin-left: 35px;
  margin-right: 15px;
}
.sub-sidebar-link svg {
  width: 40px;
  margin-left: 15px;
}
</style>
