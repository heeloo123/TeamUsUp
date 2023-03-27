import { defineStore } from 'pinia';
import axios from 'axios';
const API_URL =process.env.VUE_APP_API_URL+ "/notification";

export const useNotificationStore = defineStore ({
    id: "notification",
    state: () => ({
        notifications: []
    }),

    actions: {
        async fetchNewNotification() {
            try {
            const response = await axios.get(`${API_URL}/retrieveNew`, {
               withCredentials:true
            });
            this.notifications = response.data;
        }
            catch(error) {
                console.error(error);
            }
        },
        async fetchAnyNotification() {
            try {
                const response = await axios.get(`${API_URL}/retrieveAny`, {
                    withCredentials:true
                });
                this.notifications = response.data;
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
    },




    }
)