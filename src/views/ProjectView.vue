<template>
  <h1>Project</h1>
  <div class="project-pic">
    <img class="img" alt="Project Picture" />
  </div>

  <div>
    <label>Project Title</label>
    <p>{{ project.name }}</p>
  </div>
  <div>
    <label>Project Discription</label>
    <p>{{ project.description }}</p>
  </div>
  <nav>
    <button class="defaultBtn">
      <router-link to="/EditProject"> Edit Project</router-link>
    </button>
  </nav>
  <h3>Members</h3>
  <ul>
    <li v-for="member in project.members" :key="member.name">
      <h3>{{ member.name }}</h3>
      <p>{{ member.major }}</p>
      <p>{{ member.bio }}</p>

      <div class="rating">
        <p>Teamwork :</p>
        <div class="star-rating">
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
        </div>
      </div>
      <div class="rating">
        <p>Skills :</p>
        <div class="star-rating">
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
        </div>
      </div>
      <div class="rating">
        <p>Communication :</p>
        <div class="star-rating">
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
        </div>
      </div>

    </li>
  </ul>
</template>

<script>
export default {
  name: "ProjecView",
  data() {
    return {
      project: {
        name: "TeamUsUp Project",
        description: "This is a TeamUsUp project.",
        pic: null,
        members: [
          {
            name: "John Doe",
            major: "Computer Science",
            bio: "John is a computer science student.",
            rate: 4,
          },
          {
            name: "Jane Doe",
            major: "Design",
            bio: "Jane is a design student.",
            rate: 5,
          },
        ],
      },
    };
  },
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

.star-rating {
  display: inline-block;
  color: gold;
  font-size: 50px;
  position: relative;
}

.rating {
  display: flex;
}

.rating p {
  margin: 20px;
  padding: 10px;
  font-size: large;
}
</style>