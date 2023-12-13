<template>
    <div>
      
    <div class="sidebarCart">
        <img src="../assets/images/cart.webp" width="200px" height="200px">
        <h2>let's shopping!</h2>
    </div>
 
    </div>
</template>

<script lang="ts">

export default {
    name: 'Cart',
    data: () => ({
        
    }),
    methods: {
    
    },
};
</script>

<style>
.sidebarCart {
    position: fixed;
    top: 0;
    right: 0px;
    width: 300px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: right 0.8s ease;
    color: #666666;
}
.sidebarCart img {
    margin-top: 150px;
    margin-left: 50px;
}
.sidebarCart h2 {
    text-align: center;
}

</style>
  