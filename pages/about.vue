<template>
    <v-app style="background-color:rgb(236, 236, 236);">
        <NavBar />
        <h1>About</h1>
        
    </v-app>
    
</template>

<script lang="ts">
import NavBar from "../components/NavBar.vue"
import SignIn from "../components/SignIn.vue"

export default {
    name: "about",
    components: { NavBar, SignIn},
}
</script>

<style>

</style>