<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">

          <h1 style="font-size: 40px;margin-left: -1300px;">
            Create your profile
          </h1>
          <form class="detail">
            <div class="profile-pic">
              <input type="file" id="profilePic" />
            </div>

            <div style="padding: 15px;margin: 15px;">
              <div style="font-size:40px;margin-top:-10px">
                <span>Lname </span>
                <span>Fname </span>


              </div>
              <p></p>
              <span style="font-size:30px;">Major:</span>
              <input placeholder="Enter your major here" type="text" id="major" v-model="major" required />
              <p></p>
              <div style="font-size:30px;">
                Biography:</div>

              <textarea placeholder="Enter your biography here" v-model="bio" required></textarea>


            </div>
          </form>

          <form style="display: flex; justify-content: space-between">
            <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
            <button class="defaultBtn" type="submit">Create</button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "CreateProfileView",
  methods: {
    CancelAlert() {
      Swal.fire({
        title: 'Are you sure?',
        text: "It is good to create a profile to let people find you!",
        icon: 'warning',
        showCancelButton:true,
        confirmButtonText: 'yes',
        cancelButtonText: 'No,stay on this page'


      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "home" });
        } else {
          this.$router.push({ name: "CreateProfile" });

        }
      });


    }
  }
};
</script>

<style scoped>
.background {
  background: rgb(207, 205, 205);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  margin: 20px;
  width: auto;
  margin: 50px;

}

.item {
  display: inline-table;

}

.detail {


  display: flex;
  padding: 20px;
  text-align: left;
  margin: 20px;
  margin-left: 60px
}



input[type="text"] {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  background: rgb(234, 229, 229);
  width: 500px;

}

textarea {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  width: 1200px;
  min-height: 100px;
  height: auto;
  background: rgb(234, 229, 229);
}

.profile-pic {
  background: rgb(234, 231, 231);
  width: 300px;
  height: 300px;
  border-radius: 20px;




}
</style>
