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
            <div></div>
          </div>

          <div
            v-for="(profile, index) in filteredProfiles"
            :key="index"
            @click="selectProfile(profile)"
            :class="{ selected: selectedProfile === profile }"
          >
            <div class="trow">
              <div class="cell">{{ profile.firstName }} {{ profile.lastName }}</div>
              <div class="cell">{{ profile.major }}</div>
              <div class="cell">{{ profile.accountStatus }}</div>
              <div>
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
        <div style="display: flex; margin: 20px;">
          <div style="margin-left:auto">Page {{ currentPage }} of {{ pageCount }}</div>
          <button class="B" v-if="currentPage > 1" @click="prevPage">Prev</button>
          <button class="B" v-if="currentPage < pageCount" @click="nextPage">Next</button>
          <!---->
        </div>
        <div class="sort">
          <div class="sortDropDown">
            <img class="sortBtn" alt="sortBtn" src="../assets/sortBtn.png" @click="toggleDropDownContent">
          </div>
          <div class="dropDownContent" v-show="showDropDownContent">
            <p class="dropDownItem">
              <a style="text-decoration: none; color: inherit; font-weight: bold;" href="#">Sort by name</a>
            </p>
            <p class="dropDownItem">
                <a style="text-decoration: none; color: inherit;"  @click="sortProfilesName(profiles);" href="#">Ascending</a>
            </p>
            <p class="dropDownItem">
              <a style="text-decoration: none; color: inherit;" href="#">Descending</a>
            </p>
            <p class="dropDownItem">
              <a style="text-decoration: none; color: inherit; font-weight: bold" href="#">Sort by major</a>
            </p>
            <p class="dropDownItem">
              <a style="text-decoration: none; color: inherit;" href="#">Ascending</a>
            </p>
            <p class="dropDownItem">
              <a style="text-decoration: none; color: inherit;" href="#">Descending</a>
            </p>
          </div>
        </div>
          

      
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  component: {},

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
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Boob13",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "Takashi14",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "yoshi15",
          lastName: "Doe",
          major: "Computer Science",
          accountStatus: "Active, Unlocked",
        },
        {
          firstName: "inoki14",
          lastName: "Doe",
          major: "Design",
          accountStatus: "Active, Unlocked",
        },
      ],
      selectedProfile: null,
      searchText: "",
      pageSize: 10,
      currentPage: 1,
      sortProfilesName: null,
      showDropDownContent: false,
    };
  },

  methods: {
    selectProfile(profile) {
      this.selectedProfile = profile;
      console.log(this.selectedProfile);
    },
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
    paginatedProfiles(profiles) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return profiles.slice(start, end);
    },

    toggleDropDownContent() {
      this.showDropDownContent = ! this.showDropDownContent
      
    },
    

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

  sortProfilesName() {
    function compare (a,b) {
      if (a.firstName < b.firstName)
        return -1;
      if (a.firstName > b.firstName)
        return 1;
      return 0;
    }

    return this.profilesName.sort(compare);

  },

};
</script>

<style scoped>
.selected {
  background-color: rgb(238, 232, 232);
}
.background {
  background: rgb(207, 205, 205);
  width: 100%;
  height: 100vh;
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

.B{
 margin-left: auto;
}

.sortBtn{
  width: 50px;
  height: 50px;
  margin-left: 1700px;
  position: relative;
  bottom: 575px;

}
.dropDownItem{
  border-style: solid;
  width: 115px;
  margin-top: -18px;
  font-size: 17px;
  position: relative;
  bottom: 560px;
  left: 1635px;
  text-align: center;
  background-color: white;
  border-width: 0.05cm;

}

</style>
