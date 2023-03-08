import { defineStore } from "pinia";


export const useProfileStore = defineStore({
    state: () => ({
        isAuthenticated: true,

    })
})
