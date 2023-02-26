<template>
  <div class="container">
    <h1 class style="font-size:50px;">TEAMUSUP MEMBER</h1>

    <div>
      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email.." v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" v-model="password" required />
        </div>
      </form>
    </div>

    <p class style="font-size: 23px; position: relative; left: 190px;">   
      <router-link to="/ForgetPassword">Forget Password</router-link>
    </p>

    <form class style="padding: 30px">
      <button class="defaultBtn">
        <router-link to="/SignUp" class style="color: white"
          >Register</router-link
        >
      </button>
      <button class="defaultBtn" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  component: {
    name: "LoginView",
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },

};
</script>

<style scoped>

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgb(224, 216, 216);
    border-radius: 10px;
    width: 70%;
    margin: auto;
}

.form-group{
    display: block;
    margin: 30px;
    font-size: 40px;

}

input[type="email"],
input[type="password"] {
  width:100%;
  height: 60px;
  margin: auto;
  font-size: 30px;
  border-radius: 10px;
}


.defaultBtn {
  height: 60px;
  width: 150px;
  background: black;
  border-radius: 40px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin: 50px;
}
</style>