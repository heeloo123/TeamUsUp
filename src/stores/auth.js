
import { defineStore } from "pinia";
const Swal = require("sweetalert2");
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
    hasProfile:false,
  }),
  actions: {
    login(user) {
      axios.post(
          API_URL + "/checkAuth",
          {'email':user.email,
          'password': user.password}
      ).then((result) => {
        if (result.status === 202 || result.status === 200) {
          // Login successful
          console.log(result.data); // The user object returned by the server
          this.isAuthenticated = true;
          this.user = result.data;
          axios.post(API_URL+"/login",{},{
            headers: {
              Authorization: "Basic " + btoa(user.email + ":" + user.password),
            },
            withCredentials: true,
          }).then((res) =>{
            console.log("isAuthenticated", this.isAuthenticated);
            this.user = res.data;
            console.log("Login successful");

          })

        }
      }).catch((error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        })
      })
    }, retrieveLogin(){
      if(document.cookie != null){
        console.log('attempting login')
        axios.post(API_URL+"/login",{}, {
          withCredentials: true
        }).then((res) =>{
          this.isAuthenticated = true;
          this.user = res.data;
        })
      }else{
        console.log('cookie not logged')
      }
    }


    , async fetchUserProfile() {
      try {
        const result = await axios.get(`${API_URL}/profile/userProfile`, {
          withCredentials: true,
        });

        if (result.status === 200) {
          // User has a profile, navigate to home page
          this.hasProfile = true
          this.result = result.data
          
        } else {
          // User does not have a profile, show error message
          this.hasProfile = false
          this.profileError = true;
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
        this.$router.push({ name: "home" });
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
