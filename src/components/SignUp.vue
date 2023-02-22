<template>
  

  <h1>REGISTERATION</h1>
  <div class="registeration">
    <form @submit.prevent="signUp">
      <label>
        Email address <input type="email" v-model="email"/>
      </label>
      <label>
        First Name <input type="text" v-model="FirstName"/>
      </label>
      <label>
        Last Name <input type="text" v-model="LastName"/>
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <label>
        Verify password
        <input type="password" v-model="passwordVerify" />
      </label>

      <button type="submit">Sign up</button>

    </form>

  </div>
</template>

<script>
export default {
name : 'SignUp'
}
</script>

<style>

</style>