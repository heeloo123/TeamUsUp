<template>
   <div class="header">
    <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
   <p>/</p>
        <p>
          <router-link to="/searchPage" style="color:black">Search User Profile & Project </router-link>
          
        </p>
      </div>
  <div class="container">
    <form @submit.prevent="search" class="search">
      <label for="query">Search : </label>
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
  </div>

  <div style="margin: 20px; padding: 10px">
    <ul v-if="results.length">
      <li v-for="(result, index) in results" :key="index">
        <div v-if="result.resultType === 'Project'" >
          <router-link style="text-decoration: none;"
            :to="{ name: 'StudentProject', params: { reference: result.reference } }"
            class="nameP" >
          <div style="margin-top:10px">
          <span style="margin-left:15px;"> {{ result.header }}</span>

          <span style="float:right;margin-right:20px">{{ result.resultType }}</span>
           <p> Description : {{ result.descriptor }}</p>
          </div>
          </router-link>
        </div>
        <div v-else >
          <router-link style="text-decoration: none;"
            :to="{ name: 'StudentProfile', params: { reference: result.reference } }"
            class="nameP" >
          <div style="margin-top:10px" >
          <span style="margin-left:15px;"> {{ result.header }}</span>
          <span style="float:right;margin-right:20px">{{ result.resultType }}</span>
         <p>Major : {{ result.descriptor }}</p> 
         </div>
          </router-link>
        </div>
      </li>
    </ul>

    <p v-else class="result" style="text-align: center;">No results found.</p>
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
      const url = `${process.env.VUE_APP_API_URL}/search?query=${this.query}`;
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
  
  border-radius: 0px;
  padding: 10px;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: flex-start;
  align-items: flex-start; */
  margin: 10px;
}

.search {
  display: contents;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search label {
  margin-right: 10px;
}

.search input[type="text"] {
  width: 30%;
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
  width: -webkit-fill-available;
  font-family: math;
}

ul {
  width: -webkit-fill-available;
  list-style-type: none;
   
}
s

li {
margin-bottom: 5px;

  
  
}

li p {
  
  padding-left: 20px;
   
}

li a {
  display: inline-block;
  margin-top: 10px;
  font-size: 20px;
  color: rgb(0, 0, 0);
  padding-left: 20px;
  font-family: math;
  
}
.nameP{
  width: -webkit-fill-available;
  background: rgb(248, 245, 245);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  
}
.nameP:hover{
  background:rgb(178, 173, 173)
}
</style>
