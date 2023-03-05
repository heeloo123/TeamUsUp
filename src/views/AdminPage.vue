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
            v-for="profile in filteredProfiles"
            :key="profile.name"
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
        </div>
      </div>
    </div>
</template>

<script>
import paginate from 'vuejs-paginate';

export default {
  name: "AdminPage",

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
      ],
      paginate: "paginate",
      selectedProfile: null,
      searchText: "",
    };
  },

  methods: {
  
    selectProfile(profile) {
      this.selectedProfile = profile;
      console.log(this.selectedProfile);
    },
  },
  computed: {
    filteredProfiles() {
  const query = this.searchText.toLowerCase().trim();
  if (!query) return this.profiles;
  return this.profiles.filter((profile) => {
    const name = `${profile.firstName} ${profile.lastName}`.toLowerCase().trim();
    return name.includes(query);
  });
},
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
</style>
