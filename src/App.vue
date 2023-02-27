<template>
 
  <div class="header" >
 
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

   <button v-if="showButton" @click="hideButton" class="loginBtn"> <router-link to="/Login">Login/Register</router-link> </button>
  
  </nav>

  <router-view />

  </div>

</template>


<!--hide the button when nav to login page-->
<script>
export default {
  
  data() {
    return {
      showButton: true
    }
  },methods:{
    hideButton() {
      this.showButton = false
    }
  },
  watch: {
    '$route'() {
      if (this.$route.path === '/') {
        this.showButton = true
      }
    }
  }
  
}

</script>


<style>

.header{
    display: block; 
    background-color:black;
    width: -webkit-fill-available;
    height: 100px;
    margin:-8px; 
    
    
  }

.TeamUsUp_logo {
  width: 400px;
  float:left;
  margin:-15px;
  
}

.SearchInput{
  width: 300px;
  height: 50px;
  border-radius: 60px;
  font-size: larger;
  text-align:inherit;
  
}
.SearchBtn{
text-align: center;
margin-right: 300px;


}
.loginBtn{
    float:right;
    height: 50px;
    width: 150px;
    background: #e12744;
    border-radius: 40px;
    margin: -55px;
    margin-right:auto;
    font-size:larger
    
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
