<!--no need do this-->
<template>
  <div>
    <h1>API Response</h1>
    <div v-if="response">{{ response }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "ExamplePage",
  data() {
    return {
      response: null,
    };
  },
  async created() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.token}`,
          Cookie: `JSESSIONID=${auth.jsessionID}`,
        };
        const { data } = await axios.get(`${API_URL}/profile/userProfile`, { headers });
        this.response = data;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
