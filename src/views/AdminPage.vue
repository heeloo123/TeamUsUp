<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div style="font-size: 40px; padding: 20px">Admin page</div>
      <div class="container">
        <div v-for="profile in profiles" :key="profile.name" @click="selectProfile(profile)"
          :class="{ selected: selectedProfile === profile }">
          <div class="profile">
            <p>
              Student Name: {{ profile.firstName }} {{ profile.lastName }}<br />
              Major: {{ profile.major }}<br />
              Account Status: {{ profile.accountStatus }}<br />
            </p>
          
        
        <form style="display: inline-grid;
    margin-top: -70px;
    float: right;
    margin-right: 50px;" v-if="selectedProfile && selectedProfile === profile">
          <button class="showBtn">Unlock Account</button>
          <button class="showBtn">Archive</button>
        </form>
      </div></div></div>
      <studentListOfPage :currentPage="currentPage" :totalPages="10" @switchPage="PageSwitch" />
    </div>
  </div>
</template>

<script>
import studentListOfPage from "../views/AdminListOfPages.vue";

export default {
  name: "AdminPage",
  components: {
    studentListOfPage,
  },

  data() {
    return {
      profiles: [
        {
          firstName: "Joe",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Devin",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Sean",
          lastName: "Doe",
          major: "Business",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Calvin",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Harry",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Mary",
          lastName: "Doe",
          major: "Business",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Perry",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Zen",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Deactivated, Locked",
        },
        {
          firstName: "Harry",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Mary",
          lastName: "Doe",
          major: "Business",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Perry",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Zen",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Deactivated, Locked",
        },
      ],

      currentpage: 1,
      selectedProfile: null,
    };
  },

  methods: {
    PageSwitch(page) {
      console.log(page);
      this.currentPage = page;
    },
    selectProfile(profile) {
      this.selectedProfile = profile;
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #ede6e6;
}
.background {
  background: rgb(207, 205, 205);
  width: 100%;

  font-family: math;
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

.profile {
  border-style: solid;
  border-width: 0.06cm;
  width: -webkit-fill-available;
  height: 75px;
  margin: 1px;
  padding-left: 10px;
}
</style>
