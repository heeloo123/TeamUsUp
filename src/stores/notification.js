import { defineStore } from 'pinia';
import {useAuthStore} from "@/stores/auth";
import axios from 'axios';
const API_URL ="http://49.245.48.28:8080/api/notification";

export const useNotificationStore = defineStore ({
    id: "notification",
    state: () => ({
        notifications: []
    }),

    actions: {
        async fetchNewNotification() {
            const auth = useAuthStore()
            try {
            const response = await axios.get(`${API_URL}/retrieveNew`, {
                headers: {
                    'session-ID':auth.jsessionID
                }
            });
            this.notifications = response.data;
        }
            catch(error) {
                console.error(error);
            }
        },
        async fetchAnyNotification() {
            const auth = useAuthStore()
            try {
                const response = await axios.get(`${API_URL}/retrieveAny`, {
                    headers: {
                        'session-ID':auth.jsessionID
                    }
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