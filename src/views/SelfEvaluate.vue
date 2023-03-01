<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1>Self Evaluation</h1>
<div style="display:inline-flex;padding:20;width: inherit;padding:20px">
<textarea placeholder="comment.."/>
        <form class="rating_form">
          <div style="display: table-row; font-size: 30px">
            <label style="margin-right:75px">Teamwork</label>
            <span class="starRate">
              <span v-for="(star, index) in teamworkStars" :key="index" @click="rate(index,'teamwork')">
                <span :class="['starRate', starClass(star)]">&starf;</span>
              </span>
            </span>
          </div>
          <div style="display: table-row; font-size: 30px">
            <label style="margin-right:145px">Skills</label>
            <span class="starRate">
              <span v-for="(star, index) in skillsStars" :key="index" @click="rate(index,'skills')">
                <span :class="['starRate', starClass(star)]">&starf;</span>
              </span>
            </span>
          </div>
          <div style="display: table-row; font-size: 30px">
            <label style="margin-right:10px">Communication</label>
            <span class="starRate">
              <span v-for="(star, index) in communicationStars" :key="index" @click="rate(index,'communication')">
                <span :class="['starRate', starClass(star)]">&starf;</span>
              </span>
            </span>
          </div>

        </form>
</div>
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
      skillsStars:[],
      communicationStars:[],
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
  if (category === 'teamwork') {
    this.teamworkStars = this.teamworkStars.map((star, i) => {
      if (i <= index) {
        return true;
      } else {
        return false;
      }
    });
  } else if (category === 'skills') {
    this.skillsStars = this.skillsStars.map((star, i) => {
      if (i <= index) {
        return true;
      } else {
        return false;
      }
    });
  } else if (category === 'communication') {
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
.star-filled {
  color: orange;
}

.star-empty {
  color: gray;
}

.starRate {
  font-size: 30px;
}
.rating_form {
  margin-left: 100px;
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
  margin: 20px;
  width: 1300px;
  margin-top: 100px;
}
.container textarea{
  width: 700px;
    padding: 10px;
    font-size: 20px;
    border-radius: 10px;
    height: auto;
}
</style>
