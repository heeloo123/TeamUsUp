<template>

  <div>
    {{message}} {{date}}
  </div>
</template>

<script>
export default {
  name: "notificationCard",
  props:{
    message:String,
    date: Date,
  }
}
</script>

<style scoped>

</style>