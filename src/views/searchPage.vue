<template>
  <div class="background">
    <div class="container">
      <div @submit.prevent="search" class="search">
        <label for="query">Search: </label>
        <input id="query" v-model="query" type="text" required />

        <input id="all" type="radio" v-model="searchType" value="" checked />
        <label for="all">All</label>
        <dlabel>
          <input type="radio" id="profile" value="profile" v-model="searchType" />
          <label for="profile">Profile</label>
        </dlabel>

        <label>
          <input type="radio" id="project" value="project" v-model="searchType" />
          <label for="project">Project</label>
        </label>

        <button type="submit">Submit</button>
       </div>
      <div> 
        <ul v-if="results.length">
          <li v-for="(result, index) in results" :key="index">
            <router-link
              :to="{ name: 'StudentProfile', params: { reference: result.reference } }"
            >
              {{ result.header }}
            </router-link>
            <p>Reference: {{ result.reference }}</p>
            <p>Descriptor: {{ result.descriptor }}</p>
            <p>Result Type: {{ result.resultType }}</p>
            <a
              v-if="result.resultType === 'StudentProfile'"
              href="#"
              @click="viewProfile(result.reference)"
              >View profile</a
            >
          </li>
        </ul>

        <p v-else class="result">No results found.</p>
      </div>  
     
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
  font-family: sans-serif;
  display: flex;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 1700px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 50px;
}

.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search label {
  margin-right: 10px;
}

.search input[type="text"] {
  width: 60%;
  padding: 5px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.search input[type="radio"] {
  margin-right: 5px;
}

.result {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 20px;
}

li p {
  margin: 5px 0;
}

li a {
  display: inline-block;
  margin-top: 5px;
  font-size: 14px;
  color: blue;
  text-decoration: underline;
}

li a:hover {
  color: darkblue;
}
</style>