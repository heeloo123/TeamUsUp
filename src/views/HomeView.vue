<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <!---->
      <div>
        ||||
        <router-link to="/CreateProfile">Create Profile</router-link> |
        <router-link to="/CreateProject">Create Project</router-link> |
        <router-link to="/Profile">Profile</router-link> |
        <router-link to="/Project">Project</router-link> |
        <router-link to="/EditProject"> Edit Project</router-link>|
        <router-link to="/SelfEva"> Self evaluation</router-link>|
        <router-link to="/PeerEva"> Peer evaluation</router-link>|
        <router-link to="/AdminPage"> admin page</router-link>
        <router-link to="/About"> About</router-link>
      </div>

      <form style="display: inline-flex; text-align: -webkit-center; margin: 50px">
        <div style="width: 700px; height: 700px">
          <img class="T_logo" alt="TeamUsUp logo" src="../assets/Portal_logo.jpg" />
          <div>
            <img class="H_logo" alt="portal logo" src="../assets/Home_logo.png" />
          </div>
        </div>

        <form style=" display:inline-grid">
          <div>
            <section class="text">
              

              <h1 style="font-size: 45px">Description</h1>

              <p>
                They are designed to help students evaluate their potential teammates'
                teamwork history and make informed decisions about future collaborations.
              </p>

              <p>
                It allow students to create a profile and list their past projects,
                including ratings and evaluations from other team memmbers.
              </p>
            </section>
          </div>
          <nav>
            <button class="SignUpButton">
              <router-link class="link" to="/SignUp">Sign-Up Now</router-link>
            </button>
          </nav>
        </form>
      </form>
    </div>
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
  margin-left: 70px;
  width: 600px;
  text-align: justify;
}

.T_logo {
  width: -webkit-fill-available;
}

.H_logo {
  width: -webkit-fill-available;
}

.text p {
  font-size: 20px;
  text-align: justify;
}

.SignUpButton {
  height: 70px;
  width: 170px;
  background: #e12744;
  border-radius: 40px;
  color: white;
  font-size: 25px;
  border: transparent;
  margin-left: 100px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
</style>
