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
      this.rating = index + 1;
      this.rateScoreText=this.rateScoreDesc[index]
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
  computed: {
    rateScoreText() {
      switch (this.rating) {
        case 1:
          return 'Need more work';
        case 2:
          return 'Good';
        case 3:
          return 'Very good';
        case 4:
          return 'Excellent';
        case 5:
          return 'Outstanding';
        default:
          return 'Please rate this product';
      }
    },
  },
  };

</script>

<style>
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
