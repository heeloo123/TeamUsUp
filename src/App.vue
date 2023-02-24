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

    <form class="SearchBtn" role="search">
      <input
        class="SearchInput"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      
    
    </form>

   <button class="loginBtn"> <router-link to="/Login">Login/Register</router-link> </button>
  </nav>

  <router-view />
  </div>
</template>

<style>

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
