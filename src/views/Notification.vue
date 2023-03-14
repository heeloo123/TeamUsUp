<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div style="font-size: 40px; padding: 20px">Notification page</div>
      <div class="container">
        <div
          class="messageTable"
          v-for="(notification, index) in notifications"
          :key="index"
          @click="openNotification"
          :class="{ read: markAsRead }"
        >
          <div class="cell" :timeCreated="notification.timeCreated">
            {{ notification.message }}
            <div v-if="showFullMessage">
              {{ notification.fullMessage }}
            </div>
            <div class="emailTimeStamp">
              {{ formatDate(currentTimeStamp()) }}
            </div>
            <div class="readflag" v-if="markAsRead">Read</div>
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
  props: ["notificationID, email, action"],
  component: {},

  data() {
    return {
      notifications: [
        {
          message: "John doe has added you to project Y",
          fullMessage:
            "John doe has added you to project Y. Please verify your participation in project Y. Yes or No.",
          action: Boolean,
          timeCreated: "",
        },
      ],

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
      action: null,
      pageSize: 10,
      currentPage: 1,
      showFullMessage: false,
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

    openNotification() {
      this.markAsRead = true;
      this.showFullMessage = !this.showFullMessage;
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

      const headers = {
        "session-ID": auth.jsessionID,
      };

      axios
        .get(`${API_URL}/notification/retrieveNew`, { headers })
        .then((response) => {
          console.log(response.data);
          this.newNotification = response.data.newNotification;
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`${API_URL}/notification/retrieveAny`, { headers })
        .then((response) => {
          console.log(response.data);
          this.anyNotification = response.data.anyNotification;
        })
        .catch((error) => {
          console.error(error);
        });

      if (this.markAsRead === false && this.isClicked === true) {
        axios
          .post(`${API_URL}/notification/markAsRead/`, { headers }, { readflag: true })
          .then((response) => {
            console.log(response.data);
            this.notifications = response.data.notification.markAsRead;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      axios
        .post(`${API_URL}/notification/processAction`, { headers })
        .then((response) => {
          console.log(response.data);
          this.processAction = response.data.notiification.action;
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
