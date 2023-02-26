<template>
    <div class="container">
        <h1 class style="font-size:50px;">FORGET YOUR PASSWORD</h1>
            <p>
                To recover your account, please enter your email<br>address.
            </p>
                <p>
                    The system will send a recovery link to your email<br>shortly. You can click on the link to recover your<br>account.
                </p>
                    <p>
                        For locked account, contact admin at<br>admin1234@gmail.com.
                    </p>
    </div>

    <div>
      <form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email.." v-model="email" required />
        </div>
      </form>
    </div>

</template>

<script>
export default {
  name: 'ForgetPaswordView',

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
    width: 70%;
    margin: auto;
}


</style>