<!--no need do this-->

<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div style="font-size: 40px; padding: 20px">Admin page</div>
      <div class="container">
        <div style="padding: 10px">
          <div class="search-bar">
            <input type="text" v-model="searchText" placeholder="Search profiles..." />
          </div>
        </div>
        <div class="table">
          <div class="theader">
            <div class="cell">Student Name</div>
            <div class="cell">Email</div>
            <div class="cell">Account Status</div>
            <div class="cell">
              <!----drop down list ------------------------------------------------------------->
              <label style="float: right; margin-top: -18px; margin-right: 80px">
                <label class="dropdown">
                  <span class="toggle_img">
                    <img src="../assets/sorting.png" @click="toggleDropdown"
                  /></span>
                  <ul v-if="showDropdown">
                    <li><a>Sort by Name</a></li>
                  </ul>
                </label>
              </label>
              <!-------end here-------------------------------------------------------------------->
            </div>
          </div>

          <div v-for="(user, index) in userlist" :key="index">
            <div class="trow">
              <div class="cell">{{ user.firstName }} {{ user.lastName }}</div>

              <div class="cell">{{ user.email }}</div>

              <div class="cell">{{ user.account_lock }}</div>

              <div class="cell">
                <!-- <form
                  style="display: inline-grid"
                  v-if="selectedUser && selectedUser === user"
                >
                  <button class="showBtn">Unlock Account</button>
                  <button class="showBtn">Archive</button>
                </form> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
export default {
  name: "adminView",
  data() {
    return {
      userlist: [],

      showDropdown: false,
    };
  },
  async mounted() {
    // make an axios GET request to retrieve the list of majors
    const auth = useAuthStore();
    if (auth.isAuthenticated) {


      axios
        .get(process.env.VUE_APP_API_URL+"/admin/userList?pageNo=1", { withCredentials:true})

        .then((response) => {
          // store the list of majors in the data object
          this.userlist = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      console.log("dropdown", this.showDropdown);
    },
  },
  computed: {},
};
</script>

<style scoped>
.background{
  background: white;
}
.selected {
  background-color: rgb(238, 232, 232);
}

.container {
  background: rgb(239, 235, 235);
  border-radius: 20px;
  width: auto;
  margin: 50px;
  text-align: left;
  padding: 20px;
  margin-top: -10px;
}

.trow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 1px;
  border: 1px solid #000000;
}

.trow:nth-child(even) {
  background-color: #e0dada;
}

.theader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 10px;

  border: 1px solid #000000;
}

.cell {
  flex: 1;
}

.B {
  margin-left: auto;
}

/* this is for drop down */

.dropdown {
  position: absolute;
  display: inline-block;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown ul {
  display: block;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0;
  top: 41px;
  left: -17px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  width: max-content;
}

.dropdown ul li {
  list-style: none;
}

.dropdown ul li a {
  display: inline-block;

  padding: 10px;
  text-decoration: none;
  color: #333;
}

.dropdown:hover ul {
  display: inline-block;
}

.dropdown ul li:hover {
  background-color: rgb(225, 225, 230);
  color: white;
}

.toggle_img img {
  width: 35px;
}
</style>
