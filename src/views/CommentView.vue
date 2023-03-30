<template>
    <div style="display: flex; text-align: -webkit-center">
      <div class="background">
        <div class="header">
          <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
          <p>
             /
            <router-link to="/ownPView">Recent Project</router-link> /
           <button style="border: transparent;" class="buttn" @click="$router.go(-1)"> {{ project.projectID }}
          {{ project.projectName }} </button>/ View Comment
         
          </p>
         
        </div>
        <h1 style="color:grey">{{ project.projectName }}'s members feedback on your work</h1>
        
        <div class="container">
          <div class="item">
            <div
                style="
                  display: flex;
                  margin-bottom: 10px;
                  margin: 10px;
                  padding:15px;
                  background:lightgrey
                "
              >
            <div style="width: 190px">Author</div>
            <div style="flex: 2">Comment</div> </div>
       <div v-for="(evaluation,index) in evaluations" :key="index">
        <div v-if="profile.profileID === evaluation.id.evaluateeID ">
        <div v-for="(role,name) in project.nameRoleMap" :key="name">
        <div v-if="role.id.profileID === evaluation.id.evaluatorID" >
        
        <span  
                  style="
                    margin: 15px;
                    display: flex;
                    width: auto;
                    padding: 5px;
                    color: black;
                    border-bottom: solid 1px grey
                    
                  ">
            <span style="width: 190px"> {{ name }} </span>
            <span style="flex: 2"> {{ evaluation.comments }} </span>
       </span> </div>
        
        
        </div>
        </div>
    
    
    </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //const Swal = require("sweetalert2");
  import axios from "axios";
  import { useAuthStore } from "@/stores/auth";
 
  
  export default {
    name: "editProjectView",
    data() {
      return {
        profile:{},
        project:{},
        evaluations:[]
      };
    },
    async mounted() {
      console.log("mounted function");
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        const headers = {
          "session-ID": auth.jsessionID,
        };
        axios
        .get(`${process.env.VUE_APP_API_URL}/profile/userProfile`, { withCredentials:true })
        .then((response) => {
          console.log(response.data);
          this.profile = response.data;
         
        })
        axios
          .get(`${process.env.VUE_APP_API_URL}/project/` + this.$route.params.reference, {
            headers,
          })
          .then((response) => {
            this.project = response.data
            this.evaluations = response.data.evaluations
            console.log(response.data)
            console.log(response.data.evaluations)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  
  };
  </script>
  
  <style scoped>
  .container {
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    margin: 20px;
    width: auto;
  }
  
  .item {
    display: inline;
    width: -webkit-fill-available;
  }
  
  .detail {
    display: flex;
    padding: 20px;
    text-align: left;
    width: -webkit-fill-available;
  }
  
  input[type="text"] {
    border-radius: 20px;
    font-size: 20px;
    padding: 10px;
    border: transparent;
    background: rgb(234, 229, 229);
    width: 500px;
  }
  
  textarea {
    border-radius: 20px;
    font-size: 20px;
    padding: 10px;
    border: transparent;
    width: -webkit-fill-available;
    min-height: 70px;
    height: auto;
    background: rgb(234, 229, 229);
  }
  
  .profile-pic {
    background: rgb(234, 231, 231);
    width: 250px;
    height: 200px;
    border-radius: 20px;
  }
  
  .searchU input {
    padding: 15px;
    min-width: 300px;
    width: auto;
    border-radius: 20px;
    font-size: 10px;
  }
  
  .searchU ul {
    padding: 20px;
  }
  
  .searchU li {
    font-size: 15px;
    margin-left: 0px;
  }
  
  .searchU option {
    font-size: 20px;
  }
  
  .result {
    font-size: 16px;
  }
  
  .result span:hover {
    background: rgb(255, 255, 255);
  }
  
  .userlist {
    font-size: 20px;
  }
  
  .userlist input {
    width: auto;
    background-color: rgb(255, 255, 255);
    margin-left: -20px;
    padding-left: 10px;
    font-size: 15px;
  }
 .buttn:hover{
  background: rgb(203, 201, 201);
 }
 
  </style>
  