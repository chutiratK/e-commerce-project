<template>
    <v-app style="background-color:rgb(236, 236, 236);">
    <NavBar />
    <Nuxt />
    <h1 class="m-3 pt-3" style="color: #5b5353;">Account User</h1>
    <hr><br>
    <div class="row">
        <div class="col-md-4 mt-1">
            <div class="card text-center sidebar">
                <div class="sub-sidebar">
                    <a href="/profile" class="sub-sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        <p>PROFILE</p>
                        <span>></span>
                    </a>
                    <a href="#" class="sub-sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                        <p>CART</p>
                        <span>></span>
                    </a>
                    <a href="#" class="sub-sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                        <p>SETTING</p>
                        <span>></span>
                    </a>
                    <a href="#" class="sub-sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                        <p>SIGN OUT</p>
                        <span>></span>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-8 mt-1">
            <div v-if="currentUser" >
                <div class="card mb-3 content">
                    <h2 class="m-3 pt-3">Profile</h2>
                    <hr>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <span class="title-1">Name </span>
                        </div>
                        <div v-if="userData" class="col-md-9 text-seconday">
                            <span v-if="this.userData.email != null" class="displayName" >
                                {{ this.userData.displayName }} 
                                <span class="pen" @click="editNameIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            <span v-else class="displayName" style="color:rgb(184, 184, 184);">
                                กรุณากรอกข้อมูล
                                <span class="pen" @click="editNameIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            
                        </div>

                        <div class="col-md-3">
                            <span class="title-1">Email</span>
                        </div>
                        <div v-if="userData" class="col-md-9 text-seconday" >
                            <span v-if="this.userData.email != null" class="editEmail" > 
                                {{ this.userData.email }}
                                <span class="pen" @click="editEmailIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            <span v-else class="editEmail" style="color:rgb(184, 184, 184);">
                                กรุณากรอกอีเมล
                                <span class="pen" @click="editEmailIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            
                        </div>

                        <div class="col-md-3">
                            <span class="title-1">Phone </span>
                        </div>
                        <div v-if="userData" class="col-md-9 text-seconday" >
                            <span v-if="this.userData.phone != null" class="editPhone" > 
                                {{ this.userData.phone }}
                                <span class="pen" @click="editPhoneIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            <span v-else class="editPhone" style="color:rgb(184, 184, 184);">
                                กรุณากรอกเบอร์โทรศัพท์
                                <span class="pen" @click="editPhoneIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span> 
                        </div>

                        <div class="col-md-3">
                            <span class="title-1">Address </span>
                        </div>
                        <div v-if="userData" class="col-md-9 text-seconday" >
                            <span v-if="this.userData.address != null" class="editAddress" > 
                                {{ this.userData.address }}
                                <span class="pen" @click="editAddressIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span>
                            <span v-else class="editAddress" style="color:rgb(184, 184, 184);">
                                กรุณากรอกที่อยู่
                                <span class="pen" @click="editAddressIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </span>
                            </span> 
                        </div>
                    </div>
                </div>
                </div>
                <v-dialog v-model="editNameModal" max-width="400px">
                    <v-card style="background-color: white; color: #525252;" class="editNameModal">
                        <v-card-title>Username</v-card-title>
                        <hr>
                        <div class="username">
                            <label>username</label><br>
                            <input 
                            v-model="userData.displayName"
                            placeholder="Enter username"/>
                        </div>
                        <center>
                            <v-btn @click="editUserName" color="blue">edit</v-btn>
                            <v-btn @click="cancelEditName" color="red">cancel</v-btn><br>
                        </center>
                </v-card>
            </v-dialog>
            <v-dialog v-model="editEmailModal" max-width="400px">
                    <v-card style="background-color: white; color: #525252;" class="editEmailModal">
                        <v-card-title>Email</v-card-title>
                        <hr>
                        <div class="editemail">
                            <label>email</label><br>
                            <input placeholder="Enter email (Example: xx@gmail.com)"/>
                        </div>
                        <center>
                            <v-btn @click="editEmail" color="blue">edit</v-btn>
                            <v-btn @click="cancelEditName" color="red">cancel</v-btn><br>
                        </center>
                </v-card>
            </v-dialog>
            <v-dialog v-model="editPhoneModal" max-width="400px">
                    <v-card style="background-color: white; color: #525252;" class="editPhoneModal">
                        <v-card-title>Phone</v-card-title>
                        <hr>
                        <div class="editphone">
                            <label>phone number</label><br>
                            <input placeholder="+66xx-xxx-xxxx"/>
                        </div>
                        <center>
                            <v-btn @click="editPhone" color="blue">edit</v-btn>
                            <v-btn @click="cancelEditName" color="red">cancel</v-btn><br>
                        </center>
                </v-card>
            </v-dialog>
            <v-dialog v-model="editAddressModal" max-width="400px">
                    <v-card style="background-color: white; color: #525252;" class="editAddressModal">
                        <v-card-title>Address</v-card-title>
                        <hr>
                        <div class="editaddress">
                            <label>address</label><br>
                            <input placeholder="Enter address"/>
                        </div>
                        <center>
                            <v-btn @click="editAddress" color="blue">edit</v-btn>
                            <v-btn @click="cancelEditName" color="red">cancel</v-btn><br>
                        </center>
                </v-card>
            </v-dialog>
            </div>
        </div>  
    </div>
    </v-app>
    
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from "../components/NavBar.vue"
import SignIn from "../components/SignIn.vue"
import { getFirestore, doc, getDoc,updateDoc } from 'firebase/firestore';

export default Vue.extend({
    name: 'profile',
    components: { NavBar, SignIn },
    data() {
        return {
            userData: {
                displayName: '',
                email: '',
                phone: '',   
                address: '',
            },
            editNameModal:false,
            username:'',
            editEmailModal:false,
            editPhoneModal:false,
            editAddressModal:false,
        };
    },
    // middleware: 'auth',
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        async fetchUserData() {
            const db = getFirestore();
            console.log("IDDDDD", this.currentUser.uid)
            if (this.currentUser) {
                const userDocRef = doc(db, 'users', this.currentUser.uid);
                
                try {
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        this.userData = userDocSnapshot.data() as { displayName: string; email: string; phone: string; address: string; };
                        
                    } else {
                        console.error('User document does not exist.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        },
        async editUserName() {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', this.currentUser.uid);

            try {
                const updatedData = { displayName: this.userData.displayName };
                const result = await updateDoc(userDocRef, updatedData);
                alert('Edit Success!')
                this.editNameModal = false;
                console.log('update name success.', result);
            } catch (error) {
                console.error('Error updating username:', error.message);
            }
        },
        async editEmail() {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', this.currentUser.uid);

            try {
                const updatedData = { email: this.userData.email };
                const result = await updateDoc(userDocRef, updatedData);
                alert('Edit Success!')
                this.editEmailModal = false;
                console.log('edit email success.', result);
            } catch (error) {
                console.error('Error editing email:', error.message);
            }
        },
        async editPhone() {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', this.currentUser.uid);

            try {
                const updatedData = { phone: this.userData.phone };
                const result = await updateDoc(userDocRef, updatedData);
                alert('Edit Success!')
                this.editPhoneModal = false;
                console.log('edit phone success.', result);
            } catch (error) {
                console.error('Error editing phone:', error.message);
            }
        },
        async editAddress() {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', this.currentUser.uid);

            try {
                const updatedData = { address: this.userData.address };
                const result = await updateDoc(userDocRef, updatedData);
                alert('Edit Success!')
                this.editAddressModal = false;
                console.log('edit address success.', result);
            } catch (error) {
                console.error('Error editing address:', error.message);
            }
        },
        editNameIcon() {
            this.editNameModal = true;
        },
        editEmailIcon() {
            this.editEmailModal = true;
        },
        editPhoneIcon() {
            this.editPhoneModal = true;
        },
        editAddressIcon() {
            this.editAddressModal = true;
        },
        cancelEditName() {
            this.editNameModal = false;
            this.editEmailModal = false;
            this.editPhoneModal = false;
            this.editAddressModal = false;
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
.content{
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    color:#5b5353 ;
    width: 700px;
    height:500px;
}
.content h2, hr{
    margin: 20px 40px;
}
.card-body {
    margin: 20px 40px;
}
.sub-sidebar{
    padding: 20px;
    margin: 10px;
}
.sidebar {
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    color:#5b5353 ;
    width: 300px;
    height:500px;
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

.editNameModal {
    color: #525252;
    height: 300px;
    /* padding: 35px; */
}
.editEmailModal {
    color: #525252;
    height: 300px;
}
.editPhoneModal {
    color: #525252;
    height: 300px;
}
.editAddressModal {
    color: #525252;
    height: 300px;
}
.username {
    margin-left: 40px;
    margin-bottom: 65px;
}
.editemail {
    margin-left: 40px;
    margin-bottom: 65px;
}
.editphone {
    margin-left: 40px;
    margin-bottom: 65px;
}
.editaddress {
    margin-left: 40px;
    margin-bottom: 65px;
}
.editNameModal input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.editEmailModal input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.editPhoneModal input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.editAddressModal input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    width: 300px;
}
.editEmail {
    display: flex;
    align-items: center;
}
.editPhone {
    display: flex;
    align-items: center;
}
.displayName{
    display: flex;
    align-items: center;
}
.editAddress {
    display: flex;
    align-items: center;
}
.pen {
    margin-left: auto;
}
</style>