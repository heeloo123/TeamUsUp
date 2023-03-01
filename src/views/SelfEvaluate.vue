<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1>Self Evaluation</h1>
        <ul class="starRate">
          <span v-for="(star, index) in stars" :key="index" @click="rate(index)">
      <span :class="starClass(star)">&starf;</span>
          </span>
        </ul>
        <p>{{ rateScoreText }}</p>
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
      stars: [],
    };
  },
  mounted() {
    this.stars = Array(this.maxRating).fill(false);
  },
  methods: {
    rate(index) {
      console.log("click"+(index +1) +"star")
      this.rating = index + 1;
      this.stars = this.stars.map((star, i) => {
        if (i <= index) {
          return true;
        } else {
          return false;
        }
      });
    },
    starClass(star) {
      if (star) {
        return 'star-filled';
      } else {
        return 'star-empty';
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
  width: 800px;
  margin-top: 100px;
}
</style>
