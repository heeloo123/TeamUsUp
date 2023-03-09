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

import axios from "axios"

const API_URL = "http://49.245.48.28:8080/api";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({

    isAuthenticated: false,
    user: {},


  }),
  actions: {
    async login(user) {
      try {
        // Make an API request to the server to authenticate the user
        let result = await axios.post(
          API_URL + '/login', {}, {
          headers: {
            Authorization: 'Basic ' + btoa(user.email + ':' + user.password)
          }
          
        }
        )

        if (result.status === 202) {
          // Login successful
          console.log(result.data); // The user object returned by the server
          this.isAuthenticated = true;
          user = this.user;
          console.log(this.isAuthenticated)
          console.log("Login successful")
          this.user = result.data;
          // localStorage.setItem("user-info", JSON.stringify(result.data[0]));

        } else {
          // Login failed
          this.isAuthenticated = false;

          console.log("login failed!")
        }
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      // perform logout logic and set isAuthenticated to false
      
      localStorage.clear();
      console.log("succesful log out");
      this.isAuthenticated = false;
      this.user = '';


    },
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.$router.push({ name: 'home' });
      }
    },
  },
})