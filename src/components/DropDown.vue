<template>
  <div class="dropdown">
    <span class="toggle_img">
      <img src="../assets/icons8-user-48.png" @click="toggleDropdown"
    /></span>
    <ul v-if="showDropdown">
      <li ><a href="/Profile">Profile</a></li>
      <li ><a href="#">Settings</a></li>
      <li ><a href="#">Logout</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    
  },
};
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
  top: 41px;
  left: -17px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
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
