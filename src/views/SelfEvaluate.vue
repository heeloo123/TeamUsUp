<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1 style="margin-left: -900px; padding-top: 30px; font-size: 50px">
          Self Evaluation
        </h1>
        <div>
          <div class="profile-pic">
            <img src="" alt="profile" />
          </div>

          <div
            style="
              display: inline-block;
              font-size: 40px;
              float: left;
              margin-top: 90px;
              text-align: left;
            "
          >
            <label>Jackson </label><label>Wang</label>

            <div style="padding: 10px; margin-left: -10px">
              Project name : {{ project.name }}
            </div>
            <label style="font-size: 35px">Project role : {{ project.role }}</label>
          </div>
          <!--input area------------------------------->
          <div style="display: inline-flex; width: inherit">
            <textarea placeholder="comment.." />
            <form class="rating_form">
              <div style="display: table-row; font-size: 30px">
                <label style="margin-right: 75px">Teamwork</label>
                <span class="starRate">
                  <span
                    v-for="(star, index) in teamworkStars"
                    :key="index"
                    @click="rate(index, 'teamwork')"
                  >
                    <span :class="['starRate', starClass(star)]">&starf;</span>
                  </span>
                </span>
              </div>
              <div style="display: table-row; font-size: 30px">
                <label style="margin-right: 145px">Skills</label>
                <span class="starRate">
                  <span
                    v-for="(star, index) in skillsStars"
                    :key="index"
                    @click="rate(index, 'skills')"
                  >
                    <span :class="['starRate', starClass(star)]">&starf;</span>
                  </span>
                </span>
              </div>
              <div style="display: table-row; font-size: 30px">
                <label style="margin-right: 10px">Communication</label>
                <span class="starRate">
                  <span
                    v-for="(star, index) in communicationStars"
                    :key="index"
                    @click="rate(index, 'communication')"
                  >
                    <span :class="['starRate', starClass(star)]">&starf;</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
          <!---End of input area----------------->
        </div>

        <form style="display: flex; justify-content: space-between; padding: 20px">
          <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
          <button class="defaultBtn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfEva",
  data() {
    return {
      rating: 0,
      maxRating: 5,
      teamworkStars: [],
      skillsStars: [],
      communicationStars: [],
      project: {
        name: " Personal Expense Tracker",
        role: "Project manager",
      },
    };
  },
  mounted() {
    this.teamworkStars = Array(this.maxRating).fill(false);
    this.skillsStars = Array(this.maxRating).fill(false);
    this.communicationStars = Array(this.maxRating).fill(false);
  },
  methods: {
    rate(index, category) {
      console.log("click" + (index + 1) + "star");
      if (category === "teamwork") {
        this.teamworkStars = this.teamworkStars.map((star, i) => {
          if (i <= index) {
            return true;
          } else {
            return false;
          }
        });
      } else if (category === "skills") {
        this.skillsStars = this.skillsStars.map((star, i) => {
          if (i <= index) {
            return true;
          } else {
            return false;
          }
        });
      } else if (category === "communication") {
        this.communicationStars = this.communicationStars.map((star, i) => {
          if (i <= index) {
            return true;
          } else {
            return false;
          }
        });
      }
    },
    starClass(star) {
      if (star) {
        return "star-filled";
      } else {
        return "star-empty";
      }
    },
  },
};
</script>

<style scoped>
.profile-pic {
  width: 300px;
  height: 300px;
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  border-radius: 20px;
  float: left;
  margin-left: 50px;
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.star-filled {
  color: orange;
}

.star-empty {
  color: gray;
}

.starRate {
  font-size: 40px;
}
.rating_form {
  margin-left: 30px;
  text-align: left;
}

.background {
  background: rgb(224, 216, 216);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: block;
  height: -webkit-fill-available;
  width: 1300px;
  margin-top: 50px;
}
.container textarea {
  width: 700px;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  height: auto;
  border: transparent;
  background: rgb(234, 231, 231);
  margin-left: -100px;
}
</style>
