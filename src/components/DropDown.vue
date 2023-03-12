<template>
  <div class="dropdown">
    <span class="toggle_img">
      <img src="../assets/icons8-user-48.png" @click="toggleDropdown"
    /></span>
    <ul v-if="showDropdown">
      <li><RouterLink to="/Profile">Profile</RouterLink></li>
      <li v-if="authStore.isAdmin"><a href="/AdminPage">Admin Page</a></li>
      <li><RouterLink to="/ownPView">Project</RouterLink></li>
      <li><a href="#" @click="logout">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import { ref } from "vue";
export default {
  setup() {
    const showDropdown = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
 
    const logout = async () => {
      console.log("logout(called)");
      const confirmResult = await Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      if (confirmResult.isConfirmed) {
        authStore.logout();
        console.log("authStore.logout() called");
        
        await Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
        });
        router.push({ name: "home" });
        location.replace("/");
        console.log("Logged out successfully!");
        
      }
    };

    return {
      showDropdown,
      toggleDropdown,
      logout,
      authStore
      
    };
  },
  
};

//local storage-----------------------------//
// async logout() {
//   const confirmResult = await Swal.fire({
//     title: "Are you sure you want to log out?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     cancelButtonText: "Cancel",
//   });
//   if (confirmResult.isConfirmed) {
//     localStorage.clear();
//     this.$router.push({ name: "/" });
//   }
//   await Swal.fire({
//     title: "Logged out successfully!",
//     icon: "success",
//   });
// },
</script>

<style scoped>
.toggle_img {
  position: absolute;
}

.toggle_img img {
  background: rgb(174, 170, 170);
  border-radius: 30px;
  padding: 4px;
  width: 40px;
}

.dropdown {
  position: absolute;
  display: inline-block;
}
.dropdown-toggle {
  cursor: pointer;
}

.dropdown ul {
  display: block;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0;
  top: 37px;
  left: -34px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  width: max-content;
  text-align: center;
  font-size: 20px;
  font-family: math;
}

.dropdown ul li {
  list-style: none;
}

.dropdown ul li a {
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

.dropdown:hover ul {
  display: block;
}
.dropdown ul li:hover {
  background-color: rgb(225, 225, 230);
  color: white;
}
</style>
