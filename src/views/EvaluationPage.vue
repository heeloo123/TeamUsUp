<template>
  <div>
    <h1>evaluation</h1>

    <div>
      <label for="project">Select a project:</label>
      <select v-model="selectedProjectId" id="project">
        <option
          v-for="project in projects"
          :key="project.projectID"
          :value="project.projectID"
        >
          {{ project.projectID }} {{ project.projectName }}
        </option>
      </select>
    </div>


    <!-- <div v-for="(role,name) in project.nameRoleMap" :key="name">
    {{ name }} {{ role.projectRole }} {{ role.id.profileID }}
    
    </div> -->

    <div>
      <label for="evaluatee">Select an evaluatee :</label>
      
      <select v-model="selectedEvaluateeId" id="evaluatee">
        <option
          v-for="(role, name) in selectedProjectRoles"
          :key="role.id.profileID"
          :value="role.id.profileID"
        >
          {{ name }}
        </option>
      </select>
    </div>

    <button @click="openForm">Finish</button>

    <div v-if="showForm">
      <h2>Project : {{ selectedProjectId }}</h2>
      <h2>Evaluatee : {{ selectedEvaluateeId }}</h2>
      <h2>Evaluator : {{ profile.profileID}}</h2>

      <label for="comment">Comment :</label>
      <textarea v-model="comment" id="comment"></textarea>

      <label for="teamwork">Teamwork (1-5) :</label>
      <input v-model.number="teamwork" id="teamwork" type="number" min="1" max="5" />

      <label for="skill">Skill (1-5) :</label>
      <input v-model.number="skill" id="skill" type="number" min="1" max="5" />

      <label for="communication">Communication (1-5) :</label>
      <input
        v-model.number="communication"
        id="communication"
        type="number"
        min="1"
        max="5"
      />

      <button @click="evaluation">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
//import Swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;

export default {
  name: "EvaluationPage",
  props: ["profileID"],
  data() {
    return {
      profile: {},
      projects: [],
      selectedProjectId: null,
      selectedEvaluateeId: null,
      selectedEvaluatorId: '',
      profiles: [],
      showForm: false,
      comment: "",
      teamwork: null,
      skill: null,
      communication: null,
      selectedProject: null,
    };
  },
  computed: {
    selectedProjectRoles() {

      const selectedProject = this.projects.find(
        (project) => project.projectID === this.selectedProjectId
      );
      console.log(this.selectedProject)
      return selectedProject.nameRoleMap;
      
    },
  },

  async mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {


      axios
        .get(`${API_URL}/profile/userProfile`, {withCredentials:true })
        .then((response) => {
          console.log(response.data);
          console.log("project", response.data.projects);
          this.profile = response.data;
          this.selectedEvaluatorId = response.data.profileID
          this.projectsParticipated = response.data.projectsParticipated;
          this.projectsParticipated.forEach((project) => {
            axios
              .get(`${process.env.VUE_APP_API_URL}/project/${project.id.projectID}`)
              .then((response) => {
                this.projects.push(response.data);
                console.log(response.data);
              })
              .catch((error) => {
                console.log("Error response 3:", error.response);
                console.error(error);
              });
          });
        })

        .catch((error) => {
          console.error(error);
        });
      axios.get();
    }
  },
  methods: {
    evaluation() {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        axios.post(
          `${process.env.VUE_APP_API_URL}/evaluation/postEvaluation?projectID=${this.selectedProjectId}&&evaluatorID=${this.selectedEvaluatorId}&&evaluateeID=${this.selectedEvaluateeId}`,
          {},
          {
            withCredentials:true
          }
        );
      }
    },
  },
};
</script>
