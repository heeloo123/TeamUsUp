<template>
  <img class="F_logo" alt="F_logo" src="../assets/Forgot_Password_logo.png" />
  <div class="container">
    <div class="item">
      <h1 style="font-size: xxx-large">FORGET YOUR PASSWORD</h1>
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
      <button class="confirmBtn" type="submit">Confirm</button>
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
  height: 450px;
  background: rgb(219, 217, 217);
}

.item {
  margin-left: 70px;
}

.text{
    display: block;
    justify-content: center;
    font-size: 20px;
    
}
.confirmBtn {
  height: 60px;
  width: 150px;
  background: black;
  border-radius: 40px;
  color: white;
  font-size: 20px;
  font: bolder;
}

.F_logo {
  display: block;
  float: right;
  width: 400px;
  margin: 50px;
}
</style>