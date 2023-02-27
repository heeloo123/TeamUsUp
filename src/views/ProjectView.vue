<template>
  <h1>Project</h1>
  <div class="project-pic">
    <img class="img" alt="Project Picture" />
  </div>

  <div>
    <label>Project Title</label>
    <p>#Test TeamUsUp</p>
  </div>
  <div>
    <label>Project Discription</label>
    <p>bla bla bla</p>
  </div>
  <nav>
    <button class="defaultBtn">
      <router-link to="/EditProject"> Edit Project</router-link>
    </button>
  </nav>
<h3>Members</h3>
<ul>
  <li></li>
</ul>

</template>

<script>
export default {
  name: "ProjecView",
};
</script>

<style scoped>
.project-pic {
  width: 300px;
  height: 300px;
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
}
.project-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>