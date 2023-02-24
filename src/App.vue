<template>
  <nav>
    <router-link to="/">
      <img class="TeamUsUp_logo" alt="TeamUsUp logo" src="./assets/TeamUsUp_logo.png"/>
    </router-link> 
    
     <router-link to="/Login">Login/Register</router-link>
  </nav>
  <router-view/>
</template>

<style>
.TeamUsUp_logo{
  width: 200px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
