// import { defineStore} from "pinia";

// import axios from "axios"

// const API_URL ="http://49.245.48.28:8080/api";

// export const useAuthStore = defineStore({
//   id: 'auth',
//   state: () => ({
//     isAuthenticated: false,
//   }),
//   actions: {
//     async login(email, password) {
//       try {
//         // Make an API request to the server to authenticate the user
//         const response = await axios.post(`${API_URL}/login`, {}, {
//           headers: {
//             Authorization: "Basic " + btoa(email + ":" + password)
//           }
//         });

//         if (response.status === 202) {
//           // Login successful
//           console.log(response.data); // The user object returned by the server
//           this.isAuthenticated = true;
//           console.log("Login successful")
//         } else {
//           // Login failed
//           console.log("login failed!")
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     logout() {
//       // perform logout logic and set isAuthenticated to false
//       this.isAuthenticated = false
//     },
//   },
// })

//mock test**********************
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
    user: JSON.parse(localStorage.getItem('userCredentials')) || {}, jsessionID: null,
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
          localStorage.setItem('userCredentials', JSON.stringify(user));
          console.log("isAuthenticated", this.isAuthenticated);

          console.log("Login successful");
          this.user = result.data;
        
          const jsessionID = result.data.authorities.jsessionID;
          this.$store.commit('setJSessionID', jsessionID);
          
       
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
      // perform logout logic and set isAuthenticated to false

      console.log("succesful log out");
      this.isAuthenticated = false;
      
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
