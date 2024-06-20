<template>
  <v-app style="background-color: rgb(236, 236, 236); overflow: hidden">
    <NavBar />
    <Nuxt />
    <h1 class="m-3 pt-3" style="color: #5b5353">Account User</h1>
    <hr />
    <br />
    <div class="row">
      <AccSideBar />
      <div class="col-md-8 mt-1">
        <div>
          <div class="card mb-3 content">
            <h2 class="m-3 pt-3">Profile</h2>
            <hr />
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <span class="title-1">Name </span>
                </div>
                <div v-if="userData" class="col-md-9 text-seconday">
                  <span v-if="this.userData.email != null" class="displayName">
                    {{ this.userData.displayName }}
                    <span class="pen" @click="editNameIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span
                    v-else
                    class="displayName"
                    style="color: rgb(184, 184, 184)"
                  >
                    กรุณากรอกข้อมูล
                    <span class="pen" @click="editNameIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                </div>

                <div class="col-md-3">
                  <span class="title-1">Email</span>
                </div>
                <div v-if="userData" class="col-md-9 text-seconday">
                  <span v-if="this.userData.email != null" class="editEmail">
                    {{ this.userData.email }}
                    <span class="pen" @click="editEmailIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span
                    v-else
                    class="editEmail"
                    style="color: rgb(184, 184, 184)"
                  >
                    กรุณากรอกอีเมล
                    <span class="pen" @click="editEmailIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                </div>

                <div class="col-md-3">
                  <span class="title-1">Phone </span>
                </div>
                <div v-if="userData" class="col-md-9 text-seconday">
                  <span v-if="this.userData.phone != null" class="editPhone">
                    {{ this.userData.phone }}
                    <span class="pen" @click="editPhoneIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span
                    v-else
                    class="editPhone"
                    style="color: rgb(184, 184, 184)"
                  >
                    กรุณากรอกเบอร์โทรศัพท์
                    <span class="pen" @click="editPhoneIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                      </svg>
                    </span>
                  </span>
                </div>

                <div class="col-md-3">
                  <span class="title-1">Address </span>
                </div>
                <div v-if="userData" class="col-md-9 text-seconday">
                  <span v-if="this.userData.address != null">
                    {{ this.userData.address }}
                  </span>
                  <span
                    v-else
                    class="editAddress"
                    style="color: rgb(184, 184, 184)"
                  >
                    กรุณากรอกที่อยู่
                  </span>
                </div>

                <div v-if="userData.role == 'admin'" class="col-md-3">
                  <span class="title-1">Role </span>
                </div>
                <div
                  v-if="userData.role == 'admin'"
                  class="col-md-9 text-seconday"
                >
                  <span v-if="this.userData.role != null">
                    {{ this.userData.role }}
                  </span>
                </div>

                <div class="col-md-3">
                  <span class="title-1">เข้าสู่ระบบด้วย </span>
                </div>
                <div v-if="userData" class="col-md-9 text-seconday">
                  <span v-if="this.userData.provider == 'google'">
                    <img
                      src="../../assets/images/googleIcon.webp"
                      width="20px"
                      height="20px"
                    />
                  </span>
                  <span v-if="this.userData.provider == 'facebook'">
                    <img
                      src="../../assets/images/facebook.webp"
                      width="20px"
                      height="20px"
                    />
                  </span>
                  <span v-if="this.userData.provider == 'phone'">
                    <img
                      src="../../assets/images/phone.webp"
                      width="20px"
                      height="20px"
                    />
                  </span>
                  <span v-if="this.userData.provider == 'email'">
                    <img
                      src="../../assets/images/emailIcon.png"
                      width="20px"
                      height="20px"
                    />
                  </span>
                  <span v-if="this.userData.provider == 'line'">
                    <img
                      src="../../assets/images/lineIcon.png"
                      width="20px"
                      height="20px"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <v-dialog v-model="editNameModal" max-width="400px">
            <v-card
              style="background-color: white; color: #525252"
              class="editNameModal"
            >
              <v-card-title>Username</v-card-title>
              <hr />
              <div class="username">
                <label>username</label><br />
                <input
                  v-model="userData.displayName"
                  placeholder="Enter username"
                />
              </div>
              <center>
                <v-btn @click="editUserName" color="blue">edit</v-btn>
                <v-btn @click="cancelEditName" color="red">cancel</v-btn><br />
              </center>
            </v-card>
          </v-dialog>
          <v-dialog v-model="editEmailModal" max-width="400px">
            <v-card
              style="background-color: white; color: #525252"
              class="editEmailModal"
            >
              <v-card-title>Email</v-card-title>
              <hr />
              <div class="editemail">
                <label>email</label><br />
                <input
                  v-model="userData.email"
                  placeholder="Enter email (Example: xx@gmail.com)"
                />
              </div>
              <center>
                <v-btn @click="editEmail" color="blue">edit</v-btn>
                <v-btn @click="cancelEditName" color="red">cancel</v-btn><br />
              </center>
            </v-card>
          </v-dialog>
          <v-dialog v-model="editPhoneModal" max-width="400px">
            <v-card
              style="background-color: white; color: #525252"
              class="editPhoneModal"
            >
              <v-card-title>Phone</v-card-title>
              <hr />
              <div class="editphone">
                <label>phone number</label><br />
                <input v-model="userData.phone" placeholder="+66xx-xxx-xxxx" />
              </div>
              <center>
                <v-btn @click="editPhone" color="blue">edit</v-btn>
                <v-btn @click="cancelEditName" color="red">cancel</v-btn><br />
              </center>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AccSideBar from "../../components/AccountSideBar.vue";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default Vue.extend({
  name: "profile",
  components: { AccSideBar },
  data() {
    return {
      userData: {
        displayName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        provider: "",
      },
      editNameModal: false,
      username: "",
      editEmailModal: false,
      editPhoneModal: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async fetchUserData() {
      const db = getFirestore();
      if (this.currentUser) {
        const userDocRef = doc(db, "users", this.currentUser.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            this.userData = userDocSnapshot.data() as {
              displayName: string;
              email: string;
              phone: string;
              address: string;
              role: string;
              provider: string;
            };

            if (this.userData.role) {
              this.userData.role = await this.fetchUserRole(
                this.currentUser.uid
              );
            }
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    },
    async fetchUserRole(uid: string): Promise<string> {
      const db = getFirestore();
      const userDocRef = doc(db, "users", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as { role: string };
          return userData.role;
        } else {
          console.error("User document does not exist.");
          return "";
        }
      } catch (error) {
        console.error("Error fetching user role:", error.message);
        return "";
      }
    },
    async editUserName() {
      const db = getFirestore();
      const userDocRef = doc(db, "users", this.currentUser.uid);

      try {
        const updatedData = { displayName: this.userData.displayName };
        const result = await updateDoc(userDocRef, updatedData);
        alert("Edit Success!");
        this.editNameModal = false;
        console.log("update name success.", result);
      } catch (error) {
        console.error("Error updating username:", error.message);
      }
    },
    async editEmail() {
      const db = getFirestore();
      const userDocRef = doc(db, "users", this.currentUser.uid);

      try {
        const updatedData = { email: this.userData.email };
        const result = await updateDoc(userDocRef, updatedData);
        alert("Edit Success!");
        this.editEmailModal = false;
        console.log("edit email success.", result);
      } catch (error) {
        console.error("Error editing email:", error.message);
      }
    },
    async editPhone() {
      const db = getFirestore();
      const userDocRef = doc(db, "users", this.currentUser.uid);

      try {
        const updatedData = { phone: this.userData.phone };
        console.log("edit phone:", this.userData.phone);
        const result = await updateDoc(userDocRef, updatedData);
        alert("Edit Success!");
        this.editPhoneModal = false;
        console.log("edit phone success.", result);
      } catch (error) {
        console.error("Error editing phone:", error.message);
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
    cancelEditName() {
      this.editNameModal = false;
      this.editEmailModal = false;
      this.editPhoneModal = false;
    },
  },
  mounted() {
    (this as any).fetchUserData();
    this.$store.dispatch("fetchUser");
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
  height: 500px !important;
}
.content h2,
hr {
  margin: 20px 40px;
}
.card-body {
  margin: 20px 40px;
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
.editNameModal input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 300px;
}
.editEmailModal input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 300px;
}
.editPhoneModal input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 300px;
}
.editAddressModal input {
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
.displayName {
  display: flex;
  align-items: center;
}
.pen {
  margin-left: auto;
}
</style>
