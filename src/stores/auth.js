import { defineStore} from "pinia";

import axios from "axios"

const API_URL ="http://49.245.48.28:8080";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        // Make an API request to the server to authenticate the user
        const response = await axios.post(`${API_URL}/login`, {}, {
          headers: {
            Authorization: "Basic " + btoa(email + ":" + password)
          }
        });

        if (response.status === 202) {
          // Login successful
          console.log(response.data); // The user object returned by the server
          this.isAuthenticated = true;
        } else {
          // Login failed
          console.log("login failed!")
        }
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      // perform logout logic and set isAuthenticated to false
      this.isAuthenticated = false
    },
  },
})