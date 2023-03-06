<!--no need do this-->
<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div v-for="(profile, index) in displayedProfiles" :key="index">
      <div class="cell">{{ profile.firstName }}</div>
    </div>

    <div>Page {{ currentPage }} of {{ pageCount }}</div>

    <button v-if="currentPage > 1" @click="prevPage">Prev</button>
    <button v-if="currentPage < pageCount" @click="nextPage">Next</button>
  </div>
</template>
<script>
export default {
  name: "aboutPage",

  data() {
    return {
      profiles: [
        {
          firstName: "joe",
        },
        {
          firstName: "marry",
        },
        {
          firstName: "Tom",
        },
        {
          firstName: "Alex",
        },
        {
          firstName: "carlie",
        },
      ],
      pageSize: 2,
      currentPage: 1,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.profiles.length / this.pageSize);
    },
    displayedProfiles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.profiles.slice(start, end);
    },
  },
  watch: {
    currentPage() {
      this.displayedProfiles;
    },
  },
  methods: {
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
  },
};
</script>
<style scoped>
.about {
  text-align: center;
}
</style>
