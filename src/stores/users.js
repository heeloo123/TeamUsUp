import { defineStore } from "pinia";

import { axios } from "axios";

const API_URL ="http://49.245.48.28:8080/api";

export const useProfileStore = defineStore({
    id: 'users',
    state: () => ({
        user: {},
        users: {}
    }),


actions: {
    async register(user) {
        await axios.post(`${API_URL}/register`, user)
    },

    // get user profile from server
    async getProfiles() {
        this.users = { loading: true };
        try {
            this.users = await axios.get(`${API_URL}/userProfile`, {withCredentials:true});
        }
            catch(error) {
                this.users = { error }
            }
    },

    // get user profile ID from server
    async getProfileID() {
        this.user = { loading: true };
        try {
            this.users = await axios.get(`${API_URL}/viewProfile/{profileID}`);
        }
            catch(error) {
                this.user = { error }
            }
    },

    // syn the profile update to server
    async updateProfile(profileID, updateParams) {
        await axios.patch(`${API_URL}/${profileID}`, updateParams);
    }



}

})