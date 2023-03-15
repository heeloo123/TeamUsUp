<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div style="font-size: 40px; padding: 20px">Notification page</div>
      <div class="container">
        <div
          class="messageTable"
          v-for="notification in notifications"
          :key="notification.notificationID"
          @click="openNotification"
          :class="{ read: markAsRead }"
        >
          <div class="cell">
            {{ notification.message }}
            <div class="emailTimeStamp">
              {{ formatDate(currentTimeStamp()) }}
            </div>
            <div class="readflag" v-bind="markRead(notification.notificationID)">Read</div>
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
import Swal from "sweetalert2";

const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "notificationView",
  props: [],
  component: {},

  data() {
    return {
      notificationID: [],
      notifications: [],
      message: [],
      actions: [],
      actionRequired: [],
      timeCreated: [],
      timeActionPerf: [],
      projectID: [],
      profileID: [],
      read: [],

      emailTimeCreated: [
        {
          date: "",
          time: "",
          month: "",
          year: "",
        },
      ],

      isClicked: false,
      markAsRead: false,
      pageSize: 10,
      currentPage: 1,
    };
  },

  methods: {
    currentTimeStamp() {
      const current = new Date();
      new Date() ===
        `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}}`;
      console.log(current);
      return current;
    },

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

    getDate() {
      return new Date().toLocaleDateString();
    },

    getMonth() {
      return new Date().getMonth();
    },

    getTime() {
      return new Date().toLocaleTimeString();
    },

    getYear() {
      return new Date().getFullYear();
    },

    handleClickEvent() {
      this.isClicked = true;
    },

    handleMarkAsRead(index) {
      if (this.notifications[index].isClicked) {
        this.notification[index].markAsRead = true;
      }
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

    async processMessageAction(notificationID, action, actionRequired, projectID, profileID) {
      const auth = useAuthStore
      axios.post(`${API_URL}/notification/processAction/` +notificationID,{},+action,{},+actionRequired,{},+projectID,{},+profileID,{},{headers:{
        "session-ID": auth.jsessionID
      }})
        .then((response) => {
          console.log(response.state)
          console.log(response.status)
        })
        .catch((error) => {
          console.error(error);
        })
    },

    async markRead(notificationID) {
      const auth= useAuthStore
      axios.post(`${API_URL}/notification/markAsRead/` +notificationID, {}, {headers:{
        "session-ID": auth.jsessionID
    }})
      .then((response) => {
        console.log(response.readStatus)
      })
      .catch((error) => {
        console.error(error)
      })

    },

  setProjectParticipation(action) {
    var state = action? "Accept" : "Reject"
    return state
  },

  isActionRequired(actionRequired) {
    var status = actionRequired? "Yes" : "No"
    return status
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
    this.date === this.getDate();
    this.time() === this.getTime();
    this.year() === this.getYear();
    this.month() === this.getMonth();

    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      Swal.showLoading();

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
  margin-right: 165px;
  margin-top: -18px;
}

.fullMessage {
  background: rgb(255, 255, 255);
  width: auto;
  height: auto;
  text-align: center;
}
</style>
