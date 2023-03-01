
<template>
  <div>
    <span v-for="(star, index) in stars" :key="index" @click="rate(index)">
      <span :class="starClass(star)" >&starf;</span>
    </span>
  </div>
</template>

<script>
export default {
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
</style>