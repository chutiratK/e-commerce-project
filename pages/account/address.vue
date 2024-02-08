<template>
    <v-app style="background-color:rgb(236, 236, 236);">
    <NavBar />
    <Nuxt />
    <h1 class="m-3 pt-3" style="color: #5b5353;">Account User</h1>
    <hr><br>
    <div class="row">
        <AccSideBar />
        <div class="col-md-8 mt-1">
            <div v-if="currentUser" >
                <div class="card mb-3 content">
                    <h2 class="m-3 pt-3">Address</h2>
                    <hr>
                    <div class="card-body">
                        <div class="addressCard">
                            <v-btn @click="createAddressModall">+ address</v-btn>
                            <div v-for="(address, index) in addresses" :key="index">
                                <div class="item">
                                    <input
                                    type="radio"
                                    :id="'radioo' + index"
                                    :checked="address.selectedAddr"
                                    @change="updateSelectedAddr(address.addressID)"
                                    />
                                    <div class="address-info">
                                        <p>{{ address.name }}, {{ address.phone }}, {{ address.addr }}</p>
                                    </div>
                                    <div class="icons">
                                        <span class="pen" @click="editAddressIcon(address.addressID)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                        </span>
                                        <span class="bin" @click="deleteAddr(address.addressID)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#ff3838" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <v-dialog v-model="createAddressModal" max-width="550px">
                    <v-card style="background-color: white; color: #525252;" class="createAddressModal">
                        <v-card-title>Address</v-card-title>
                        <hr>
                        <div class="createAddress">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="displayName" class="input-label">ชื่อ-นามสกุล</label>
                                    <input
                                    id="displayName"
                                    v-model="name"
                                    placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="phonenumber" class="input-label">เบอร์โทรศัพท์</label>
                                    <input
                                    id="phonenumber"
                                    v-model="phone"
                                    placeholder="เบอร์โทรศัพท์"
                                    />
                                </div>
                                <div class="addrdiv">
                                    <label for="addr" class="input-label">รายละเอียดที่อยู่</label>
                                    <textarea
                                    id="addr"
                                    v-model="addr"
                                    placeholder="บ้านเลขที่ จังหวัด รหัสไปรษณีย์"
                                    ></textarea>
                                </div>
                            </div>
                            <center>
                                <v-btn @click="createAddress" class="addressBtn" color="blue">submit</v-btn>
                                <!-- <v-btn @click="cancelEditName" color="red">cancel</v-btn><br> -->
                            </center>
                        </div>
                </v-card>
            </v-dialog>
            <v-dialog v-model="editAddressModal" max-width="550px">
                    <v-card style="background-color: white; color: #525252;" class="createAddressModal">
                        <v-card-title>Address</v-card-title>
                        <hr>
                        <div class="createAddress">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="displayName" class="input-label">ชื่อ-นามสกุล</label>
                                    <input
                                    id="displayName"
                                    v-model="editAddrData.name"
                                    placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="phonenumber" class="input-label">เบอร์โทรศัพท์</label>
                                    <input
                                    id="phonenumber"
                                    v-model="editAddrData.phone"
                                    placeholder="เบอร์โทรศัพท์"
                                    />
                                </div>
                                <div class="addrdiv">
                                    <label for="addr" class="input-label">รายละเอียดที่อยู่</label>
                                    <textarea
                                    id="addr"
                                    v-model="editAddrData.addr"
                                    placeholder="บ้านเลขที่ จังหวัด รหัสไปรษณีย์"
                                    ></textarea>
                                </div>
                            </div>
                            <center>
                                <v-btn @click="editAddress" class="addressBtn" color="blue">Edit</v-btn>
                                <!-- <v-btn @click="cancelEditName" color="red">cancel</v-btn><br> -->
                            </center>
                        </div>
                </v-card>
            </v-dialog>
            </div>  
        </div>
    </div>
    </v-app>
    
</template>

<script lang="ts">
import Vue from 'vue';
import AccSideBar from '../../components/AccountSideBar.vue'
import { getFirestore, collection, onSnapshot, doc, addDoc, setDoc, updateDoc, getDoc, deleteDoc} from 'firebase/firestore';
interface Address {
    addressID: string;
    name: string;
    phone: string;
    addr: string;
    selectedAddr: boolean;
}

export default Vue.extend({
    name: 'order',
    components: {AccSideBar}, 
    data: () => ({
        loading: true,
        addresses: [] as Address[],
        createAddressModal:false,
        editAddressModal:false,
        name: '',
        phone: '',
        addr: '',
        selectedAddr: '',
        editAddrData: {
            name: '',
            phone: '',
            addr: '',
        },
    }),
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        async fetchUserData() {
            const db = getFirestore();
            const userAddrRef = collection(db, 'address', this.currentUser.uid, 'addressUser');

            try {
                onSnapshot(userAddrRef, (snapshot) => {
                    const updatedAddr: Address[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as Address;
                        updatedAddr.push(data);
                    });
                    this.addresses = updatedAddr;
                });
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
            
        },
        createAddressModall() {
            this.createAddressModal = true;
        },
        async createAddress() {
            const db = getFirestore();
                const addressData = {
                    addressID: '',
                    name: this.name,
                    phone: this.phone,
                    addr: this.addr,
                    selectedAddr: false,
                };
                try {
                    const docRef = await addDoc(collection(db, 'address', this.currentUser.uid, 'addressUser'), addressData);
                    addressData.addressID = docRef.id;
                    await setDoc(doc(db, 'address', this.currentUser.uid, 'addressUser', docRef.id), addressData);
                    this.createAddressModal = false;
                } catch (error) {
                    console.error('Error adding category: ', error);
                }
        },
        
        async editAddressIcon(addressID: string) {
            this.editAddressModal = true;
            const db = getFirestore();
            if (this.currentUser) {
                const userDocRef = doc(db, 'address', this.currentUser.uid, 'addressUser', addressID);

                try {
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        this.editAddrData = userDocSnapshot.data() as Address;
                    } else {
                        console.error('User document does not exist.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        },
        async deleteAddr(addressID: string) {
            try {
                const db = getFirestore();
                const addrDocRef = doc(db, 'address', this.currentUser.uid, 'addressUser', addressID);

                await deleteDoc(addrDocRef);
                await this.fetchUserData();
            } catch (error) {
                console.error('Error deleting product:', error.message);
            }
        },
        async editAddress() {
            const db = getFirestore();
            const userDocRef = doc(db, 'address', this.currentUser.uid, 'addressUser', this.editAddrData.addressID); 

            try {
                const updatedData = {
                    name: this.editAddrData.name,
                    phone: this.editAddrData.phone,
                    addr: this.editAddrData.addr,
                };

                await updateDoc(userDocRef, updatedData);
                alert('Edit Success!');
                this.editAddressModal = false;
                console.log('edit address success.');
            } catch (error) {
                console.error('Error editing address:', error.message);
            }
        },
        updateSelectedAddr(addressID: string) {
            const db = getFirestore();
            const userDocRef = doc(db, 'address', this.currentUser.uid, 'addressUser', addressID);

            try {
                this.addresses.forEach((address) => {
                if (address.addressID !== addressID) {
                    updateDoc(doc(db, 'address', this.currentUser.uid, 'addressUser', address.addressID), {
                        selectedAddr: false,
                    });
                }
                });
                const selectedAddress = this.addresses.find((address) => address.addressID === addressID);
                if (selectedAddress) {
                    updateDoc(userDocRef, { selectedAddr: true });
                    updateDoc(doc(db, 'users', this.currentUser.uid), {
                        address: selectedAddress.addr,
                    });
                }
            } catch (error) {
                console.error('Error updating selected address:', error.message);
            }
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

.addressCard p {
    font-weight: bold;
}
.addressCard .item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    gap: 15px;
    text-align: center;
    align-items: center;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.createAddress input{
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
    margin-right: 10px;
}
.createAddress {
    margin-left: 50px;
    margin-bottom: 65px;
    margin-right: 40px;
}
.createAddress textarea {
    width: 400px;
    height: 60px;
    border: 1px solid #ccc; 
    padding: 8px; 
    border-radius: 4px;
}
.createAddressModal {
    height: 500px;
}
.addressBtn {
    margin-top: 50px;
}
.input-label {
    font-size: 12px;
    margin-bottom: 4px; 
    display: block; 
}
.addrdiv {
    margin-left: 10px;
}
.address-info {
    flex: 1;
}

.icons {
    display: flex;
    gap: 10px;
}
.icons svg {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}
.icons svg:hover {
    transform: scale(1.1);
}
</style>