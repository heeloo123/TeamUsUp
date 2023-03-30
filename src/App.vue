<script setup>

import NavView from "./views/NavView.vue";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";
onMounted(()=>{
  const auth = useAuthStore();
  auth.retrieveLogin();
  console.log("api url is " +  process.env.VUE_APP_API_URL)
})
</script>

<template>
   <main>
   <NavView />
   
   </main>


</template>


<style>
.background {
  background: rgb(244, 243, 243);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}
nav {
 padding:10px

}

nav a {
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #feffff;
}


.defaultBtn {
  min-width: 120px;
  width: auto;
  background: rgb(75, 74, 74);
  border-radius: 10px;
  
  color: white;
  font-size: 15px;
  font: bolder;
  margin: 30px;
  position: relative;
  
  padding:10px;
  border:transparent
}

.link {
  text-decoration: none;
  color: white;
}
.profile-pic {
  width: 200px;
  height: 200px;
  margin: 10px;
  background: rgb(234, 229, 229);
  overflow: hidden;
  border-radius: 20px;
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header {
  border-bottom: ridge;
  border-top: hidden;
  display: flex;
  padding-top: 10px;
}
.header img {
  margin-top: 8px;
  margin-left: 25px;
}
.header p {
  margin-top: 20px;
  margin-left: 10px;
  text-align: left;
}

</style>
