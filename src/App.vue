<template>
  <div class="header">
  <nav>
    <router-link to="/">
      <img
        class="TeamUsUp_logo"
        alt="TeamUsUp logo"
        src="./assets/TeamUsUp_logo.png"
      />
    </router-link>

    <!--need to import db for search-->
    <form class="SearchBtn" role="search">
      <input
        class="SearchInput"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      
    
    </form>

   <button v-if="" class="loginBtn"> <router-link to="/Login">Login/Register</router-link> </button>
  </nav>

  <router-view />
  </div>
</template>

<style scoped>
#app{
  
}
.header{
    background-color:black;
    width: -webkit-fill-available;
    height: 100px;
    margin:-8px; 
    z-index: -1;
  }

.TeamUsUp_logo {
  width: 400px;
  float:left;
  margin:-15px
}

.SearchBtn{


}
.loginBtn{
    float:right;
    height: 40px;
    background: #e12744;
    border-radius: 20px;
    margin:-15px
}

nav {
  padding: 30px;
}

nav a {
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #feffff;
}
</style>
