<template>
 
    <div class="container">
      <form @submit.prevent="search" class="search">
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
      </form>
      <div style="margin: 20px">
        <ul v-if="results.length">
          <li v-for="(result, index) in results" :key="index">
            <div v-if="result.resultType === 'Project'">
              <router-link
                :to="{ name: 'StudentProject', params: { reference: result.reference } }"
              >
                {{ result.header }}
              </router-link>
              <p>Project ID: {{ result.reference }}</p>
              <p>Discription: {{ result.descriptor }}</p>
              <p>Result Type: {{ result.resultType }}</p>


            </div>
            <div v-else>
              <router-link
                :to="{ name: 'StudentProfile', params: { reference: result.reference } }"
              >
                {{ result.header }}
              </router-link>
            
            <p>Profile ID: {{ result.reference }}</p>
            <p>Major: {{ result.descriptor }}</p>
            <p>Result Type: {{ result.resultType }}</p>
          </div>
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
  },
};
</script>

<style scoped>
.background {
  height: 100%;
  width: 100vw;
  font-family: sans-serif;
  display: flex;
}

.container {
  background: rgb(225, 224, 224);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 1700px;
  width: 100%;
  display: block;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px;
}

.search {
  display: contents;
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
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
  list-style: auto;
}

li {
  margin-bottom: 1px;
  background: whitesmoke;
}


li p {
  margin: 10px 0;
  padding-left: 20px;
}

li a {
  display: inline-block;
  margin-top: 5px;
  font-size: 20px;
  color: rgb(25, 0, 255);
  padding-left: 20px;
}

li a:hover {
  color: darkblue;
}
</style>
