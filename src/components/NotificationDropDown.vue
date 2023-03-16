<template>

  <div v-for="notification in notifications" :key="notification.notificationID">
    <NotificationCard :message="notification.message" :date="notification.timeCreated">

    </NotificationCard>
  </div>


</template>

<script>
import NotificationCard from "@/components/NotificationComponents/notificationCard";
import {useNotificationStore} from "@/stores/notification";
export default {
  name: "NotificationDropDown",
  components: {NotificationCard},
  data(){
    return{
      notifications:[]
    }

  },
  mounted() {
    const notificationStore = useNotificationStore()
    notificationStore.fetchNewNotification()
    this.notifications = notificationStore.notifications
  }
}
</script>

<style scoped>

</style>