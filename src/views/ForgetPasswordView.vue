<template>
    <div class="container">
        <h1 class style="font-size:50px; position: fixed; top: 150px;">FORGET YOUR PASSWORD</h1>
        <section class="text">
            <p>
                To recover your account, please enter your email<br>address.
            </p>
                <p>
                    The system will send a recovery link to your email<br>shortly. You can click on the link to recover your<br>account.
                </p>
                    <p>
                        For locked account, contact admin at<br>admin1234@gmail.com.
                    </p>
        </section>
    </div>

    <div>
      <form>
        <div class="email">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email.." v-model="email" required />
        </div>
      </form>
    </div>

    <button class="confirmBtn" type="submit">Confirm</button>

</template>

<script>
export default {
  name: 'ForgetPaswordView',

  data() {
    return {
        email:''
    }
  }
}

</script>

<style>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgb(224, 216, 216);
    border-radius: 10px;
    width: 60%;
    margin: auto;
    height: 550px;
    position: relative;
    top: 50px;
}

.email{
    display: block;
    margin: 30px;
    font-size: 40px;
    position: fixed;
    left: 800px;
    top: 470px;
}

.email input{
    width: 300px;
    height: 35px;
    display: block;
    position: fixed;
}

.text{
    position: fixed;
    bottom: 465px;
    text-align: center;
    font-size: 23px;
}

.confirmBtn{
  height: 60px;
  width: 150px;
  background: black;
  border-radius: 40px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin: 50px;
  position: fixed;
  bottom: 250px;
  left: 860px;
}






</style>