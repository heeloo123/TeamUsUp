import { defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth",{
    state:()=> ({
        authUser: null
    }),
    getters:{
        user:(state)=>state.authUser

    },
    actions:{
        async getUser(){
            const data = await axios.get("http://49.245.48.28:8080/profile/userProfile")
            this.authUser = data.data;
        }
    }
})