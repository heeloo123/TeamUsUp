<template>
  <div style="margin: inherit; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>Student Info | Notification</p>
      </div>
 

      <div class="container">
        <div style="border-bottom: solid 1px; padding-bottom: 10px;">
  <h2 style="font-size: 24px; font-weight: bold;">Notifications</h2>
  <div style="display: flex; gap: 10px; " class="Button">
    <button style="background-color: {{ currentFilter === 'all' ? 'lightgray' : 'white' }}; border: none; text-decoration: {{ currentFilter === 'all' ? 'underline' : 'none' }};" type="radio" @click="currentFilter = 'all'">All</button>
    <button style="background-color: {{ currentFilter === 'read' ? 'lightgray' : 'white' }}; border: none; text-decoration: {{ currentFilter === 'read' ? 'underline' : 'none' }};" @click="currentFilter = 'read'">Read</button>
    <button style="background-color: {{ currentFilter === 'unread' ? 'lightgray' : 'white' }}; border: none; text-decoration: {{ currentFilter === 'unread' ? 'underline' : 'none' }};" type="radio"  @click="currentFilter = 'unread'">Unread</button>
  </div>
</div>
        <div style="display: inline-flex;margin-top:30px">
          <div class="messageTable">
            <div
              class="cell"
              v-for="notification in filteredNotifications"
              :key="notification.notificationId"
              @click="handleClickEvent(notification.notificationId)"
              :class="{ select: selectedMessage === notification }"
            >
              <span class="readflag" @click="markRead(notification.notificationId)">
                {{ notification.message }}
                
                <!-- <button
                  v-if="
                    notification.actionRequired &&
                    notification.timeActionPerf === null &&
                    notification.read === false
                  "
                  class="actionBtn"
                  @click="processMessageAction(notification.notificationId, true)"
                >
                  Yes
                </button> -->
                <!-- <button
                  v-if="
                    notification.actionRequired &&
                    notification.timeActionPerf === null &&
                    notification.read === false
                  "
                  class="actionBtn"
                  @click="processMessageAction(notification.notificationId, false)"
                >
                  No
                </button> -->

                <div class="emailTimeStamp">
                  {{ formatDate(notification.timeCreated) }}
                </div>
                {{ notification.read ? "" : "Unread" }}
              </span>
            </div>
          </div>
          <div class="notificationBox" v-if="showMessageBox">
           
            <div
              v-if="
                projects.some(
                  (project) => project.reference === selectedMessage.projectID
                )
              "
            >
            <button style="margin-top:-20px; border:transparent; background:transparent;float:right" @click="handleCloseEvent(message)">
              <img style="width: 15px" src="../assets/delete.png" alt="delete icon" />
            </button>
              <p>Dear student {{ profile.firstName }} {{ profile.lastName }} ,</p>
              <p>
                You have been added as a participant to <span style="text-decoration: underline 1px;">
                {{
                  projects.find(
                    (project) => project.reference === selectedMessage.projectID
                  ).header
                }}</span>
                by the project owner.
              </p>
              <p>Please click on the button below to either accept or reject the invitation.</p>
           <span class="acBtn">
              <button
              v-if="
                selectedMessage.actionRequired && selectedMessage.timeActionPerf === null
              "
              class="actionBtn"
              @click="processMessageAction(selectedMessage.notificationId, true)"
            >
            Accept
            </button>
            <button
              v-if="
                selectedMessage.actionRequired && selectedMessage.timeActionPerf === null
              "
              class="actionBtn"
              @click="processMessageAction(selectedMessage.notificationId, false)"
            >
            Reject
            </button>
          </span>
            </div>

           
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
import { useNotificationStore } from "@/stores/notification";
import Swal from "sweetalert2";

const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "notificationView",
  props: [],
  component: {},

  data() {
    return {
      notifications: [
        {
          notificationID: [],
          message: [],
          actions: [],
          actionRequired: [],
          timeCreated: [],
          timeActionPerf: [],
          projectID: [],
          profileID: [],
          read: [],
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

      showMessageBox: false,
      selectedMessage: null,
      pageSize: 10,
      currentPage: 1,
      currentFilter: "all",
      profile: {},
      projects: [],
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
      console.log("click even received with id ", notificationID);
      this.selectedMessage = this.notifications.find(
        (notification) => notification.notificationId === notificationID
      );
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
      const auth = useAuthStore;
      axios
        .post(
          `${API_URL}/notification/processAction/`,
          {},
          {
            headers: {
              "session-ID": auth.jsessionID,
            },
            params: {
              notificationID: notificationID,
              action: action,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            Swal.fire({
              text: action
                ? "Successfully verified project participation"
                : "Successfully declined project participation",
              icon: "success",
            }).then(() => this.$forceUpdate);
          } else {
            Swal.fire({
              text: "Something went wrong, please try again later",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async markRead(notificationID) {
      const auth = useAuthStore;
      axios
        .post(
          `${API_URL}/notification/markAsRead/?notificationID=` + notificationID,
          {},
          {
            headers: {
              "session-ID": auth.jsessionID,
            },
          }
        )
        .then((response) => {
          console.log(response.readStatus);
          const notification = this.notifications.find(
            (notification) => notification.notificationId == notificationID
          );
          notification.read = true;
          console.log(notification.readStatus);
          var index = this.notifications.indexOf(notification);
          this.notifications[index] = notification;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    setProjectParticipation(action) {
      var actionState = action ? "Accept" : "Reject";
      return actionState;
    },

    isActionRequired(actionRequired) {
      var actionStatus = actionRequired ? "Yes" : "No";
      return actionStatus;
    },

    messageRead(read) {
      var readStatus = read ? "Read" : "Unread";
      return readStatus;
    },
  },

  computed: {
    filteredNotifications() {
      let filtered = this.notifications;
      if (this.currentFilter === "read") {
        filtered = filtered.filter((notification) => notification.read);
      } else if (this.currentFilter === "unread") {
        filtered = filtered.filter((notification) => !notification.read);
      }
      return this.paginatedNotifications(filtered);
    },
    pageCount() {
      return Math.ceil(this.filteredNotifications.length / this.pageSize);
    },
  },

  mounted() {
    const notificationStore = useNotificationStore();
    const auth = useAuthStore();

    if (auth.isAuthenticated) {
      const headers = {
        "session-ID": auth.jsessionID,
      };
      Swal.showLoading();
      notificationStore
        .fetchAnyNotification()
        .then(() => (this.notifications = useNotificationStore().notifications));
      Swal.hideLoading();
      console.log(this.notifications);

      axios.get(`${API_URL}/profile/userProfile`, { headers }).then((response) => {
        console.log(response.data);
        console.log("project", response.data.projects);
        this.profile = response.data;

        this.projects = response.data.projects.map((project) => {
          console.log(project.reference);
          axios
            .get(`${API_URL}/project/` + project.reference, { headers })

            .catch((error) => {
              console.error(error);
            });
          return project;
        });
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
  padding: 20px;
  margin-top: 20px;
  display:inline-block;
}

.cell {
  width: auto;
  background: rgb(252, 248, 248);
  justify-content: space-between;
  margin: 2px;
  padding: 10px;
  flex-direction: row;
  border-bottom: solid 1px grey;
  
}
.cell:hover{
  background:rgb(181, 178, 178);
}

.emailTimeStamp {
 float: right;
}

.readflag {
}

.notificationBox {
  width: auto;
  text-align: left;
  flex:3;
  padding:30px;
  background: rgb(252, 248, 248);
}


.acBtn {
 display: flex;
 justify-content: space-evenly;
 margin-top:70px;
}
.messageTable {
  width: -webkit-fill-available;
  text-align: left;
  flex: 4;
  
}
.Button :hover{
 background: rgb(189, 184, 184);
}
</style>
