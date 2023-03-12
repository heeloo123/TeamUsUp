
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectStore = defineStore({
  id:'projectnEva', 
  state: () => ({
    evaluations: [],
    teamworkSums: {},
    skillSums: {},
    communicationSums: {},
    evaluateeIDs: {},
  }),

  actions: {
    async fetchProject(projectID) {
      try {
        const response = await axios.get(`http://49.245.48.28:8080/api/project/${projectID}`)
        const data = response.data

        const evaluateeIDs = {}
        const teamworkSums = {}
        const skillSums = {}
        const communicationSums = {}

        data.evaluations.forEach((evaluation) => {
          const evaluateeID = evaluation.id.evaluateeID
          const teamwork = evaluation.teamwork
          const skill = evaluation.skill
          const communication = evaluation.communication

          if (!evaluateeIDs[evaluateeID]) {
            evaluateeIDs[evaluateeID] = 1
            teamworkSums[evaluateeID] = teamwork
            skillSums[evaluateeID] = skill
            communicationSums[evaluateeID] = communication
          } else {
            evaluateeIDs[evaluateeID]++
            teamworkSums[evaluateeID] += teamwork
            skillSums[evaluateeID] += skill
            communicationSums[evaluateeID] += communication
          }
        })

        this.project = data
        this.evaluations = data.evaluations
        this.teamworkSums = teamworkSums
        this.skillSums = skillSums
        this.communicationSums = communicationSums
        this.evaluateeIDs = evaluateeIDs
      } catch (error) {
        console.error(error)
      }
    },
  },
})