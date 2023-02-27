<template>
  <div class="project-container">
    <div>
      <h1 style="margin: 40px; font-size: 50px">{{ project.name }}</h1>
      <div class="contain">
        <div class="project-pic">
          <img class="img" :src="project.pic" alt="Project Picture" />
        </div>

        <div class="dis_container">
          <label style="font-size: 40px">Project Discription</label>
          <p
            style="
              background: white;
              width: 1200px;
              height: fit-content;
              border-radius: 20px;
              padding: 20px;
              font-family: math;
              font-family: math;
              word-spacing: 5px;
              font-size:21px
            "
          >
            {{ project.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="memberlist-con"></div>
    <h2 style="margin-left: 70px">Project members</h2>

    <ul class="memberlist">
      <div v-for="member in project.members" :key="member.name">
        <div
          style="
            border-radius: 20px;
            display: flex;
            background: white;
            border:solid;
            margin: 20px;
          "
        >
          <div>
            <div class="profileImg">
              <img :src="member.pic" alt="profile picture" />
            </div>
            <div
              style="
                display: block;
                margin-left: 350px;
                margin-top: -210px;
                font-size: larger;
                font-family: sans-serif;
              "
            >
              <h3>{{ member.name }}</h3>
              <p>{{ member.major }}</p>
              <p>{{ member.bio }}</p>
              <div
                style="display: felx; margin-top: -200px; margin-bottom: 20px"
              >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </ul>
    <div style="margin-left: 1500px; display: flex">
      <nav>
        <button class="defaultBtn">
          <router-link to="/EditProject"> Edit Project</router-link>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjecView",
  data() {
    return {
      project: {
        name: "Personal Expense Tracker",
        description:
          "The Personal Expense Tracker is a simple project designed to help individuals keep track of their daily expenses. The project will consist of a web or mobile application that allows users to input and categorize their expenses, such as groceries, transportation, entertainment, and others. The application will automatically calculate and display the total expenses for each category, as well as the overall expenses for the day, week, or month. It will also provide visual graphs and charts to help users visualize their spending habits and identify areas where they can save money. The project will be designed to be user-friendly, with a clean and intuitive interface that requires minimal setup and configuration. Ultimately, the Personal Expense Tracker will help individuals become more aware of their spending habits, manage their finances more effectively, and save money for the things that matter most to them.",
        pic: require("../assets/test_projectpic.png"),
        members: [
          {
            name: "John Doe",
            major: "Computer Science",
            bio: "John is a computer science student.",
            pic: require("../assets/male image test.png"),
            rate: 4,
          },
          {
            name: "Jane Doe",
            major: "Design",
            bio: "Jane is a design student.",
            pic: require("../assets/female image(test).png"),
            rate: 5,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.project-container {
  display: flex;
  margin: 50px;
  background: rgb(211, 208, 208);
  border-radius: 10px;
  flex-direction: column;
}

.project-pic {
  width: 300px;
  height: 300px;
  margin: 40px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  border-radius: 20px;
}
.project-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contain {
  font-size: large;
  display: flex;
}
.dis_container {
  display: block;
  margin: 50px;
}
.memberlist-con {
  display: flex;
}
.memberlist {
  display: block;
}
.profileImg {
  width: 200px;
  height: 200px;
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  border-radius: 100px;
}
.profileImg img {
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
  margin-left: 800px;
}

.rating p {
  margin: 20px;
  padding: 10px;
  font-size: 25px;
}
</style>