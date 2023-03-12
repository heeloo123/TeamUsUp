<template>
  <div class="background">
    <div class="container"> 
    <form @submit.prevent="search" class="search">
      <label for="query">Search: </label>
      <input id="query" v-model="query" type="text" required />

      <input id="all" type="radio" v-model="searchType" value="" checked />
      <label for="all">All</label>
      <div>
        <input type="radio" id="profile" value="profile" v-model="searchType" />
        <label for="profile">Profile</label>
      </div>

      <div>
        <input type="radio" id="project" value="project" v-model="searchType" />
        <label for="project">Project</label>
      </div>

      <button type="submit">Submit</button>
    </form>

    <ul v-if="results.length">
      <li v-for="(result, index) in results" :key="index">
        <router-link :to="{ name: 'StudentProfile', params: { reference: result.reference } }">
  {{ result.header }}
</router-link>
        <p>Reference: {{ result.reference }}</p>
        <p>Descriptor: {{ result.descriptor }}</p>
        <p>Result Type: {{ result.resultType }}</p>
        <a v-if="result.resultType === 'StudentProfile'" href="#" @click="viewProfile(result.reference)">View profile</a>
      </li>
    </ul>

      <p v-else class="result">No results found.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  name: "searchPage",
  data() {
    return {
      query: "",
      results: [],
      searchType: "",
    };
  },
  methods: {
    search() {
      const url = `http://49.245.48.28:8080/api/search?query=${this.query}`;
      axios
        .get(url)
        .then((response) => {
          if (this.searchType === "") {
            this.results = response.data;
          } else {
            this.results = response.data.filter(
              (result) => result.resultType === this.searchType.capitalize()
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    viewProfile(reference) {
      if (this.searchType === "profile") {
        this.$router.push(`/profile?reference=${reference}`);
      } else {
        window.location.href = `http://49.245.48.28:8080/api/profile/viewProfile/${reference}`;
      }
    },
  },
};
</script>

<style scoped>
.background {
  background: rgb(224, 216, 216);
  height: 100vh;
  width: 100vw;
  font-family: math;
  text-align: -webkit-center;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: block;
  width: 800px;
  position: relative;
  top: 200px;
  height: 235px;
  
}

.search {
  display: block;
  position: relative;
  top: 25px;
  font-size: 25px;
  text-align: center;
}

.result {
  position: relative;
  top: 25px;
  font-size: 20px;
}

input[id="query"] {
  border-radius: 10px;
  padding-left: 20px;
  height: 20px;
  margin: auto;
  width: 200px;
}

button[type="submit"] {
  background: black;
  border-radius: 20px;
  color: white;
  height: 35px;
  font-size: 20px;
  font: bolder;
  margin: 10px;
  width: auto;
  margin-left: 20px;

}


</style>
