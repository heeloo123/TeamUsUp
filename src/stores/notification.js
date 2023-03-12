import { defineStore } from 'pinia';
import axios from 'axios';
const API_URL ="http://49.245.48.28:8080/api";

export const useNotificationStore = defineStore ({
    id: "notification",
    state: () => ({
        notification: {}
    }),

    actions: {
        async fetchNewNotification(email) {
            try {
            const response = await axios.get(`${API_URL}/retrieveNew`, {
                params: {
                    email,
                }
            });
            this.notifications= response.data.map(notification => notification.message);
        }
            catch(error) {
                console.error(error);
            }
        }
    },

    async fetchAnyNotification(email) {
        try {
            const response = await axios.get(`${API_URL}/retrieveAny`, {
                params: {
                    email,
                }
            });
            this.notifications = response.data.map(notification => notification.message);
        }
          catch(error) {
            console.error(error);
          }
        },

        async markAsRead(notification, notificationID) {
            if (!notification.read) {
            try {
                await axios.post(`${API_URL}/markAsRead/${notificationID}`, {readFlag: true});
                notification.read = true;
                this.$emit('read');
            }
              catch(error) {
                console.error(error);
              }    
            }
            
        },

        async processAction(notificationID, action) {
            try {
                await axios.post(`${API_URL}/processAction`, {
                    params: {
                        notificationID,
                        action
                    }
                })
            }
              catch(error) {
                console.error(error);
              }
        }
    }
)