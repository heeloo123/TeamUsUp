<template>
  <div class="background">
    <!---->
    <label>
      ||||
      <router-link to="/CreateProfile">*Test*C_Profile</router-link> |
      <router-link to="/CreateProject">*Test*C_Project</router-link> |
      <router-link to="/Profile">*Test*Profile</router-link> |
      <router-link to="/Project">*Test*Project</router-link> |
    </label>
    <form>
        <img
          class="T_logo"
          alt="TeamUsUp logo"
          src="../assets/Portal_logo.jpg"
        />
        <form>
          <div style="display: flex; flex-direction: row; align-items: center;">
          

          <section class="text">
            <p style="font-size: 35px; color: red">Student Web Portal</p>

            <h1 style="font-size: 35px">Description</h1>

            <p style="font-size: 25px">
              They are designed to help students evaluate their potential <br />
              teammates' teamwork history and make informed decisions <br />
              about future collaborations.
            </p>

            <p style="font-size: 25px; text-align: left">
              It allow students to create a profile and list their past <br />
              projects, including ratings and evaluations from other team <br />
              memmbers.
            </p>

            <nav>
              
              <button class="SignUpButton">
                <router-link class="link" to="/SignUp">Sign-Up Now</router-link>
              </button>
            </nav>
          </section>
          <img class="H_logo" alt="portal logo" src="../assets/Home_logo.png" />
          </div>
       </form> 
      
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "HomeView",
};
</script>
  

<style scoped>
.background {
  background: rgb(224, 216, 216);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}
.text {
  text-align: left;
  float: left;
  margin-left:100px;
 
}

.T_logo {
  width: 1000px;
  height: 100px;
  margin: 40px;

}

.H_logo {
  float:right;
  width: 600px;
  height: 500px;
  margin-left:400px;
  border-radius:10px;
  
  

}

.SignUpButton {
  height: 70px;
  width: 170px;
  background: #e12744;
  border-radius: 40px;
  color: white;
  font-size: 25px;
  border:transparent;
  margin-left:100px ;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}
</style>