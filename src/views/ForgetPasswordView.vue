<template>
  <img class="F_logo" alt="F_logo" src="../assets/Forgot_Password_logo.png" />
  <div class="container">
    <div class="item">
      <h1 style="font-size: 40px;">FORGET YOUR PASSWORD</h1>
      <section class="text">
        <p>To recover your account, please enter your email<br />address.</p>
        <p>
          The system will send a recovery link to your email<br />shortly. You
          can click on the link to recover your<br />account.
        </p>
        <p>For locked account, contact admin at<br />admin1234@gmail.com.</p>
      </section>

      <form class="email">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email.."
          v-model="email"
          required
        />
      </form>
      </div>
      <div class="btn"><button class="confirmBtn" type="submit">Confirm</button>
      </div>
  </div>
  
</template>

<script>
export default {
  name: "ForgetPaswordView",

  data() {
    return {
      email: "",
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  margin: 50px;
  height: 600px;
  background: rgb(219, 217, 217);
  border-radius: 6px;
}

.item {
  margin-left: 70px;
}

.text{
    
    text-align: center;
    font-size: 30px;
    font-family: math
}

.btn{
    margin-left: 600px;
}
.confirmBtn {
  height: 50px;
  width: 200px;
  background: black;
  border-radius: 40px;
  color: white;
  font-size: x-large;
  font: bolder;
}

form.email {
  display: flex;
  margin: 30px;
  border-radius: 10px;
  
}
form.email label {
  font-size: x-large;
  color: white;
  padding: 6px;
  background: black;
  width: 100px;

}

form.email input[type="email"] {
  height: 50px;
  width: 70%;
  font-size: x-large;
  margin-left: 0px;
  padding-left: 60px;
  float:right;
}
.F_logo {
  display: block;
  float: right;
  width: 400px;
  margin-top: 150px;
  margin-right:100px ;
}
</style>