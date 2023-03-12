
import { defineStore } from "pinia";

import axios from "axios";

const API_URL = "http://49.245.48.28:8080/api";

export const useAuthStore = defineStore({
  id: "auth",
  mutations: {
    setJSessionID(state, jsessionID) {
      state.jsessionID = jsessionID;
    },
  },
  state: () => ({
    isAuthenticated: false,
    user:  {},
    jsessionID: "",
  }),
  actions: {
    async login(user) {
      try {
        let result = await axios.post(
          API_URL + "/login",
          {},
          {
            headers: {
              Authorization: "Basic " + btoa(user.email + ":" + user.password),
            },
            withCredentials: true,
          }
        );

        if (result.status === 202 || result.status === 200) {
          // Login successful
          console.log(result.data); // The user object returned by the server
          this.isAuthenticated = true;
          this.user = result.data;
          console.log("isAuthenticated", this.isAuthenticated);

          console.log("Login successful");
          

          this.jsessionID = result.data.jsessionID;
        } else {
          // Login failed

          this.isAuthenticated = false;
          console.log("login failed!");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async logout() {
      try {
        await axios.post(API_URL + "/logout", {}, {
          headers: {
            "session-ID": this.jsessionID
          },
          withCredentials: true
        });
        console.log("Logout successful");
        this.isAuthenticated = false;
        this.user = {};
        this.jsessionID = "";
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    isAdmin() {
      console.log(this.user.authorities);
      if (this.user && this.user.authorities) {
        return this.user.authorities.some((auth) => auth.authority === "Admin");
      }
      return false;
    },
  },

  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.$router.push({ name: "home" });
      }
    },
  },
});
