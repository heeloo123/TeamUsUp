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
            <div class="cell">Major</div>
            <div class="cell">Account Status</div>
            <div class="cell">
              <!----drop down list ------------------------------------------------------------->
              <label style="float: right; margin-top: -18px; margin-right: 80px">
                <label class="dropdown">
                  <span class="toggle_img">
                    <img src="../assets/sorting.png" @click="toggleDropdown"
                  /></span>
                  <ul v-if="showDropdown">
                    <li><a @click="sort('name')">Sort by Name</a></li>
                    <li><a @click="sort('major')">Sort by Major</a></li>
                  </ul>
                </label>
              </label>
              <!-------end here-------------------------------------------------------------------->
            </div>
          </div>

          <div
            v-for="(profile, index) in filteredProfiles"
            :key="index"
            @click="selectProfile(profile)"
            :class="{ selected: selectedProfile === profile }"
          >
            <div class="trow">
              <div class="cell" v-for="name in profiles" :key="name.userID">{{ profile.firstName }} {{ profile.lastName }}</div>
              <div class="cell" v-for="major in profiles" :key="major.majorCode">{{ profile.majorName }}</div>
              <div class="cell" v-for="status in profiles" :key="status.userID">{{ profile.status }}</div>

              <div class="cell">
                <form
                  style="display: inline-grid"
                  v-if="selectedProfile && selectedProfile === profile"
                >
                  <button class="showBtn">Unlock Account</button>
                  <button class="showBtn">Archive</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--change part--->
        <div style="display: flex; margin: 20px">
          <div style="margin-left: auto">Page {{ currentPage }} of {{ pageCount }}</div>
          <button class="B" v-if="currentPage > 1" @click="prevPage">Prev</button>
          <button class="B" v-if="currentPage < pageCount" @click="nextPage">Next</button>
          <!---->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2';

const API_URL ="http://49.245.48.28:8080/api"

export default {
  name: "AdminHome",
  props: ["userID"],
  component: {},

  data() {
    return {
      showDropdown: false, //dropdown
      profiles: [],
      profilesStatus: [],
      profilesMajors: [],

      selectedProfile: null,
      searchText: "",
      pageSize: 10,
      currentPage: 1,
      sortProfiles: null,
      showDropDownContent: false,
    };
  },

  methods: {
    selectProfile(profile) {
      this.selectedProfile = profile;
      console.log(this.selectedProfile);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },

    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1;
      }
    },

    paginatedProfiles(profiles) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return profiles.slice(start, end);
    }, 

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    sort(field) {
      if (field === "name") {
        this.profiles.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
      } else if (field === "major") {
        this.profiles.sort((a, b) => a.major.localeCompare(b.major));
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.profiles.length / this.pageSize);
    },
    filteredProfiles() {
      const query = this.searchText.toLowerCase().trim();
      const filtered = query
        ? this.profiles.filter((profile) => {
            const name = `${profile.firstName} ${profile.lastName}`.toLowerCase().trim();
            return name.includes(query);
          })
        : this.profiles;

      return this.paginatedProfiles(filtered);
    },
  },
  watch: {
    currentPage() {
      this.filteredProfiles;
    },
  },

  mounted() {

  const auth = useAuthStore();
  if (auth.isAdmin) {
    Swal.showLoading();

    const headers= {
      "session-ID": auth.jsessionID,
    }

    axios
      .get(`${API_URL}/admin/userList?pageNo=1`, {headers})
      .then((response) => {
        console.log(response.data);
        this.profile = response.data;
      })
        .catch((error) => {
          console.error(error);
        });


    axios
      .put(`${API_URL}/admin/archiveUserProfile`, {headers})
      .then((response) => {
        console.log("archiveUserProfile", response.data.archiveUserProfile);
        this.archiveUserProfile = response.data.archiveUserProfile.map((user) => {
          const userID = user.reference;
          console.log(user.reference);
          axios
            .put(`${API_URL}/archiveUserProfile/${userID}`, { headers })

            .catch((error) => {
              console.error(error);
            });
          return user;
        });
      })
      .finally(() => {
        Swal.hideLoading();
      });

    }
  }

};
</script>

<style scoped>
.selected {
  background-color: rgb(238, 232, 232);
}

.container {
  background: rgb(255, 255, 255);
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
