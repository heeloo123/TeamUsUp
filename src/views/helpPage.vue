<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p>
          <router-link to="/home" style="color: #e12744; text-decoration: none">
            Dashboard
          </router-link>
        </p>
        <p>/</p>

        <p>
          <router-link to="/help" style="text-decoration: none">
            TeamUsUp Help Center</router-link
          >
        </p>
      </div>
      <div style="background: #e12744; color: white; padding: 20px">
        <h1>Help center</h1>
        <h2>Hi, how can we help?</h2>
      </div>
      <div class="cat">
        <h2>Categories</h2>

        <button>
          <router-link
            to="/helpNav#getting-started"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              padding: 10px;
            "
          >
            <img src="../assets/iconHelp/icons8-applications-91.png" />
            <span>Getting started</span>
          </router-link>
        </button>
        <button>
          <router-link
            to="/helpNav#general"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              padding: 10px;
            "
          >
            <img src="../assets/iconHelp/icons8-general-91.png" />
            General</router-link
          >
        </button>
        <button>
          <router-link
            to="/helpNav#account"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              padding: 10px;
            "
          >
            <img src="../assets/iconHelp/icons8-align-91.png" />
            Account</router-link
          >
        </button>
        <button>
          <router-link
            to="/helpNav#contact"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              padding: 10px;
            "
          >
            <img src="../assets/iconHelp/icons8-secured-letter-64.png" />
            Contact</router-link
          >
        </button>
      </div>

      <div class="cat">
        <h2>FAQ</h2>
        <ul>
          <li @click="toggleAnswer(1)">Q: How do I create an account on TeamUsUp?</li>
          <transition name="fade">
            <li v-show="showAnswer[1]">
              <p>
                A: To create an account, simply navigate to the TeamUsUp website and click
                the “Sign-Up Now” button. Follow the prompts to provide your personal
                information and create an account to log in.
                <router-link
            to="/helpNav#registration"
           
          >
            More details</router-link
          >
              </p>
            </li>
          </transition>
          <li @click="toggleAnswer(2)">
            Q: I can’t log in to my TeamUsUp account. What should I do?
          </li>
          <transition name="fade">
            <li v-show="showAnswer[2]">
              <p>
                A: Make sure you’re entering your login credentials correctly. If you’re
                still having trouble, try resetting your password using the “Forget my
                password” link on the login page.     
              </p>
            </li>
          </transition>
          <li @click="toggleAnswer(3)">
            Q: How do I add team members to my project history on TeamUsUp?
          </li>
          <transition name="fade">
            <li v-show="showAnswer[3]">
              <p>
                To add team members, navigate to the “Project” under the Drop-down button
                on your profile icon on the top right or “View your project here” on the
                home page and select the relevant project. From there, you can add team
                members and provide an evaluation of their skills and comment. But you
                should create a Project, and only the project owner can add team members
                to their project.
              </p>
            </li>
          </transition>
          <li @click="toggleAnswer(4)">
            Q:What should I do if a team member isn’t participating in a project?
          </li>
          <transition name="fade">
            <li v-show="showAnswer[4]">
              <p>
                A: First, try communicating with the team member to see if there’s a
                reason for their lack of participation. If the issue persists, you can use
                TeamUsUp to document their lack of contribution via the evaluation button
                and potential future collaborators.
              </p>
            </li>
          </transition>
          <li @click="toggleAnswer(5)">
            Q: How does TeamUsUp verify my teamwork history?
          </li>
          <transition name="fade">
            <li v-show="showAnswer[5]">
              <p>
                A: TeamUsUp relies on evaluation provided by project collaborators to
                verify your teamwork history. This allows future teammates or potential
                employers to understand your team's skills and contributions accurately.
              </p>
            </li>
          </transition>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "helpPage",
  data() {
    return {
      showAnswer: {},
    };
  },
  methods: {
    toggleAnswer(index) {
      this.showAnswer[index] = !this.showAnswer[index];
    },
  },
};
</script>

<style scoped>
.background {
  background: white;
  font-size: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.cat {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
  margin-left: 200px;
  margin-right: 200px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  text-align: left;
}
button {
  width: 180px;
  height: 60px;
  margin: 10px;
}
img {
  width: 30px;
  padding-right: 10px;
  margin-right: 10px;
}
.cat h2 {
  margin-right: 1000px;
}
.cat ul{
list-style-type: none;
margin:20px;

}

.cat ul li{
  padding:20px;
  border-bottom: solid 1px grey;
  
}

.cat ul :hover{
  background: rgb(244, 242, 242);
}
</style>
