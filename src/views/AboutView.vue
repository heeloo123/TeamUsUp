<!--no need do this-->

<template>
  {{ majors }}


<select
class="majorSelect"

>
<option value="" disabled>Select your major</option>
<option
  v-for="major in majors"
  :key="major.majorCode"
  :value="major.majorName"
  :disabled="
    selectedMajors.includes(major.majorName) && selectedMajors.length >= 2
  "
>
  {{ major.majorName }}
</option>
</select>
</template>
<script>

import axios from "axios";
//import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
export default {
  name: "CreateProfileView",
  data() {
    return {
      file: null,
      imagePreview: null,
      majors: [],
      bio: "",
      selectedMajors: [],
      selectedMajor: null,
      profilePic: "",
    };
  },


async mounted() {
    // make an axios GET request to retrieve the list of majors
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      const headers = {
        "session-ID": auth.jsessionID,
      };

      axios
        .get("http://49.245.48.28:8080/api/profile/majors", { headers })

        .then((response) => {
          // store the list of majors in the data object
          this.majors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}



</script>