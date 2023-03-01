<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1>Peer</h1>
        <span v-for="(star, index) in stars" :key="index" @click="rate(index)">
      <span :class="starClass(star)">&starf;</span>
    </span>
      
      
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name:'PeerEva',
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

<style>
.star-filled {
  color: orange;
}

.star-empty {
  color: gray;
}

.background {
  background: rgb(207, 205, 205);
  height: 100vh;
  width: 100vw;
  margin-top: -10px;
  font-family: math;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  margin: 20px;
  margin: 50px;
}
</style>