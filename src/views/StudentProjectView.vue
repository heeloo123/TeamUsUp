<template>
    <div>
        <div class="project-pic">
            <img :src="profileImageSrc" alt="Project img" />
        </div>
        <h1>Project name: {{ project.projectName }}</h1>
        <p>description: {{ project.projectDescription }}</p>

        <div v-for="(role, name) in project.nameRoleMap" :key="name">
            <div style="
              border-radius: 20px;
              display: flex;
              background: rgb(234, 231, 231);
              border: transparent;
              margin: 20px;
            ">
                <div class="profileImg">
                    <img :src="role.profileImage" alt="profile picture" />
                </div>

                <div class="name-role">
                    <label>
                        Name: <span>{{ name }}</span></label>
                    <label>Role:<span>{{ role.projectRole }}</span></label>
                </div>

              
            </div>
        </div>
    </div>
</template>
<script>  
import { useProjectStore } from "../stores/projectStore";
export default {
  setup() {
    const projectStore = useProjectStore()

    // Call an action in the store
    projectStore.fetchProject('proj6')

    // Access the state in the store
    console.log(projectStore.project)
    console.log(projectStore.evaluations)
    console.log(projectStore.teamworkSums)
    console.log(projectStore.skillSums)
    console.log(projectStore.communicationSums)
    console.log(projectStore.evaluateeIDs)

    // Return any values or components needed
    return {}
  }
}

  </script>
