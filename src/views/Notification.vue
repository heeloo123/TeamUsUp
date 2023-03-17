<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div style="font-size: 40px; padding: 20px">Notification page</div>
      <div class="container">
        <div
          class="messageTable"
        >
          <div class="cell"
               v-for="notification in notifications"
               :key="notification.notificationId"
               @click="handleClickEvent(notification.notificationId)"
               :class="{ select: selectedMessage === notification}">
            {{ notification.message }}
              <button v-if="notification.actionRequired && notification.timeActionPerf === null" class="actionBtn" @click="processMessageAction(notification.notificationId, true)">Yes</button>
              <button v-if="notification.actionRequired && notification.timeActionPerf === null" class="actionBtn" @click="processMessageAction(notification.notificationId, false)">No</button>
            <div class="emailTimeStamp">
              {{ formatDate(notification.timeCreated) }}
            </div>
            <div class="readflag" @click="markRead(notification.notificationId)">{{   notification.read ? "Read":"Unread" }}</div>

          </div>
        </div>
        <div class="notificationBox" v-if="showMessageBox" >
          <p>{{ selectedMessage.message}}</p>
          <div>
            <button @click="handleCloseEvent(message)">
              <img style="width: 3px; height: 3px;" src="../assets/delete.png" alt="delete icon">
            </button>
          </div>
        </div>
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
    //currentTimeStamp() {
    //  const current = new Date();
    //  new Date() ===
    //    `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}}`;
    //  console.log(current);
    //  return current;
    //},

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

    //getDate() {
    //  return new Date().toLocaleDateString();
    //},

    //getMonth() {
    //  return new Date().getMonth();
    //},

    //getTime() {
    //  return new Date().toLocaleTimeString();
    //},

    //getYear() {
    //  return new Date().getFullYear();
    //},

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

      /*
      axios
        .get(`${API_URL}/notification/retrieveNew?email=${auth.email}`, { headers:{
          "session-ID": auth.jsessionID
        }})
        .then((response) => {
          console.log(response.data);
          this.newNotifications = response.data.newNotification;
          this.messages = response.data.message;
          this.timeCreated = response.data.timeCreated;
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`${API_URL}/notification/retrieveAny?email=${auth.email}`, { headers:{
          "session-ID": auth.jsessionID
        } })
        .then((response) => {
          console.log(response.data);
          this.anyNotifications = response.data.anyNotification;
          this.messages = response.data.message;
          this.timeCreated = response.data.timeCreated;
        })
        .catch((error) => {
          console.error(error);
        })

        .finally(() => {
          Swal.hideLoading();
        });

       */
      Swal.hideLoading();
    }
    
  },
};
</script>

<style scoped>
.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: auto;
  margin: 50px;
  text-align: left;
  padding: 20px;
  margin-top: -10px;
}

.cell {
  flex: 1;
  border: 1px solid #000000;
  justify-content: space-between;
  margin: 1px;
  padding: 10px;
  flex-direction: row;
  height: 30px;
}

.emailTimeStamp {
  text-align: right;
}

.readflag {
  text-align: right;
  margin-right: 170px;
  margin-top: -18px;
}

.notificationBox {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}

.notificationBox {
  width: 300px;
  height: 180px;
  margin-top: 150px;
  margin-left: 340px;
}

.actionBtn {
  margin-left: 20px;
  margin-right: 20px;

}


</style>
