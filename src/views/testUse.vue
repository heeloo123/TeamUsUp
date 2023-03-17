<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>Student Info | Notification</p>
        
      </div>
      {{ notifications }}
      <div class="container">
      <div style="border-bottom: solid 1px;"> Notifications <button> All </button> <button>Unread</button>
      
      </div>
      <div style="display: flex;">
        <div
          class="messageTable"
        >
          <div class="cell"
               v-for="notification in notifications"
               :key="notification.notificationId"
               @click="handleClickEvent(notification.notificationId)"
               :class="{ select: selectedMessage === notification}">
            {{ notification.message }}
              <button v-if="notification.actionRequired && notification.timeActionPerf === null && notification.read ===false " class="actionBtn" @click="processMessageAction(notification.notificationId, true)">Yes</button>
              <button v-if="notification.actionRequired && notification.timeActionPerf === null && notification.read ===false" class="actionBtn" @click="processMessageAction(notification.notificationId, false)">No</button>
            <div class="emailTimeStamp">
              {{ formatDate(notification.timeCreated) }}
            </div>
            <div class="readflag" @click="markRead(notification.notificationId)">{{   notification.read ? "Read":"Unread" }}</div>

          </div>
       </div>
        <div class="notificationBox" v-if="showMessageBox">
          <p style="">{{ selectedMessage.message }}</p>
            <button style="" @click="handleCloseEvent(message)">
              <img style="width:10px" src="../assets/delete.png" alt="delete icon">
            </button>
        </div></div>
         
        <div style="display: flex; margin: 20px">
          <div style="margin-left: auto">Page {{ currentPage }} of {{ pageCount }}</div>
          <button class="B" v-if="currentPage > 1" @click="prevPage">Prev</button>
          <button class="B" v-if="currentPage < pageCount" @click="nextPage">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import {useNotificationStore} from "@/stores/notification";
import Swal from "sweetalert2";

const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "notificationView",
  props: [],
  component: {},

  data() {
    return {
      notifications:[ {
      notificationID: [],
      message: [],
      actions: [],
      actionRequired: [],
      timeCreated: [],
      timeActionPerf: [],
      projectID: [],
      profileID: [],
      read: [],
      }],

      emailTimeCreated: [
        {
          date: "",
          time: "",
          month: "",
          year: "",
        },
      ],

      showMessageBox: false,
      selectedMessage: null,
      pageSize: 10,
      currentPage: 1,
    };
  },

  methods: {
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleDateString("en-gb", options);
    },
    handleClickEvent(notificationID) {
      console.log("click even received with id ", notificationID)
      this.selectedMessage = this.notifications.find(notification => notification.notificationId === notificationID);
      this.showMessageBox = true;
    },

    handleCloseEvent() {
      this.showMessageBox = false;
      this.selectedMessage = null;
    },


    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },

    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1;
      }
    },

    paginatedNotifications(notifications) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return notifications.slice(start, end);
    },

    async processMessageAction(notificationID, action) {
      const auth = useAuthStore
      axios.post(`${API_URL}/notification/processAction/`,{},{headers:{
        "session-ID": auth.jsessionID
      }, params:{
          'notificationID': notificationID,
          'action':action
        }})
        .then((response) => {
          if (response.status ==200){
            Swal.fire({
              text: action ? 'Successfully verified project participation':'Successfully declined project participation',
              icon: "success",
            }).then(() => this.$forceUpdate)
          } else{
            Swal.fire({
              text:'Something went wrong, please try again later',
              icon:'error'
            })
          }
        })
        .catch((error) => {
          console.error(error);
        })
    },

    async markRead(notificationID) {
      const auth= useAuthStore
      axios.post(`${API_URL}/notification/markAsRead/?notificationID=` +notificationID, {}, {headers:{
        "session-ID": auth.jsessionID
    },})
      .then((response) => {
        console.log(response.readStatus)
        const notification = this.notifications.find((notification) => notification.notificationId == notificationID)
        notification.read = true;
        var index = this.notifications.indexOf(notification)
        this.notifications[index] = notification
      })
      .catch((error) => {
        console.error(error)
      })

    },

  setProjectParticipation(action) {
    var actionState = action? "Accept" : "Reject"
    return actionState
  },

  isActionRequired(actionRequired) {
    var actionStatus = actionRequired? "Yes" : "No"
    return actionStatus
  },

  messageRead(read) {
    var readStatus = read? "Read" : "Unread"
    return readStatus
  },

},

  computed: {
    pageCount() {
      return Math.ceil(this.notifications.length / this.pageSize);
    },
  },

  mounted() {

    const notificationStore = useNotificationStore();
    const auth = useAuthStore();
    
    if (auth.isAuthenticated) {
      Swal.showLoading();
      notificationStore.fetchAnyNotification().then(() => this.notifications = useNotificationStore().notifications);
      Swal.hideLoading();
    }console.log(this.notifications)
    
  },
};
</script>

<style scoped>
.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: auto;
  margin: 50px;
  padding: 20px;
  margin-top: 20px;
}

.cell {

}

.emailTimeStamp {
  
}

.readflag {

}

.notificationBox {

 
}

.notificationBox {

}

.actionBtn {

}
 .messageTable{

 }



</style>
