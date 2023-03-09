<template>
    <div style="margin: inherit; text-align: -webkit-center">
        <div class="background">
            <div style="font-size: 40px; padding: 20px">Notification page</div>
                <div class="container">
                    <div class="messageTable" v-for="(notification, index) in notifications" :key="index" @click="markAsRead(notifications)">
                        <div class="cell" :timeCreated="notification.timeCreated">{{ notificationsMessage }}
                            <div class="emailTimeStamp">
                                {{ formatDate(currentTimeStamp()) }}
                            </div>
                                <div class="readflag" v-show="notification.isClicked"> 
                                    Read
                                </div>
                        </div>
                            
                    </div>          
                </div>
        </div>
    </div>
    
    
</template>


<script>
import axios from 'axios';
export default {
  name: "notificationView",
  component: {},

    data() {
        return {
            notifications: [
                {
                    message: "",
                    notificationID: "",
                    timeCreated: this.formatDate(),
                    markAsRead: false, 
                    isClicked: false
                },

                {
                    message: "",
                    notificationID: "",
                    timeCreated: this.formatDate(),
                    markAsRead: false, 
                    isClicked: false,
                },

                {
                    message: "",
                    notificationID: "",
                    timeCreated: this.formatDate(),
                    markAsRead: false,
                    isClicked: false
                },
            ],

            emailTimeCreated: [
                {
                    date: "",
                    time: "",
                    month: "",
                    year: "",
                }
            ],

            isClicked: false,
            action: null,
            
        };
    },

        methods: {
            currentTimeStamp() {
                const current = new Date();
                new Date() === `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}}`;
                console.log (current);
                return current;
            },

            formatDate(date) {
               const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
               return new Date(date).toLocaleDateString('en-gb', options);
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

            async fetchNewNotifications() {
                try {
                    const response = await axios.get("http://49.245.48.28:8080/api/retrieveNew");
                    this.notifications = response.data;
                }
                 catch(error) {
                    console.error(error);
                    }
            },

            async fetchAnyNotifications() {
                try {
                    const response = await axios.get("http://49.245.48.28:8080/api/retrieveAny");
                    this.notifications = response.data;
                }
                  catch(error) {
                    console.error(error);
                  }
            },

            async markAsRead(notification) {
                if (!notification.read) {
                try {
                    await axios.post("http://49.245.48.28:8080/api/markAsRead/${notificationID}", {readFlag: true});
                    notification.read = true;
                    this.$emit('read');
                }
                  catch(error) {
                    console.error(error);
                  }    
                }
                
            },

            handleClickEvent() {
                this.isClicked = true;
            },

            handleMarkAsRead(index) {
                if (this.notifications[index].isClicked) {
                    this.notification[index].markAsRead = true;
                }
            },
        },

    mounted() {
       this.date === this.getDate();
       this.time() === this.getTime();
       this.year() === this.getYear();
       this.month() === this.getMonth();
       this.fetchNewNotifications();
       this.fecthAnyNotifications();
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

</style>