<script setup>

import NavView from "./views/NavView.vue";


</script>

<template>
   <main>
   <NavView />
   
   </main>


</template>


<style>
.background {
  background: rgb(207, 205, 205);
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
  height: 60px;
  min-width: 120px;
  width: auto;
  background: black;
  border-radius: 20px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin: 50px;
  position: relative;
  bottom: 50px;
}

.link {
  text-decoration: none;
  color: white;
}
.profile-pic {
  width: 250px;
  height: 250px;
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

</style>
