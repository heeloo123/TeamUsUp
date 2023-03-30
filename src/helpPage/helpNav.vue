<template>
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
  <div
    style="
      background: #e12744;
      color: white;
      padding: 20px;
      text-align: -webkit-center;
      font-family: math;
    "
  >
    <h1>Help center</h1>
    <h2>Hi, how can we help?</h2>
  </div>
  <div style="display: flex; text-align: -webkit-center">
    <div class="navBar">
      <nav>
        <ul>
          <li>
            <a
              style="font-size: 18px"
              @click.prevent="showGettingStarted = !showGettingStarted"
            >
              Getting started &ensp;
              <span style="float: right">{{ gettingStartedIcon }}</span>
            </a>
            <ul v-show="showGettingStarted">
              <li><a href="#landing-page">Landing page</a></li>
              <li><a href="#registration">Registration</a></li>
              <li><a href="#logging-on">Logging on</a></li>
              <li><a href="#system-menu">System menu</a></li>
              <li><a href="#exit-system">Exit system</a></li>
            </ul>
          </li>
          <li>
            <a style="font-size: 18px" @click.prevent="showGeneral = !showGeneral">
              General &ensp; <span style="float: right">{{ generalIcon }}</span>
            </a>
            <ul v-show="showGeneral" style="top: 100%">
              <li><a href="#home-page">Home page</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#profile-creation">Profile creation</a></li>
              <li><a href="#profile-page">Profile page</a></li>
              <li><a href="#edit-profile">Edit profile</a></li>
              <li><a href="#project-list">Project list</a></li>
              <li><a href="#project-detail">Project detail</a></li>
              <li><a href="#create-project">Create project</a></li>
              <li><a href="#evaluation">Evaluation</a></li>
              <li><a href="#edit-profile-2">Edit profile</a></li>
              <li><a href="#search">Search</a></li>
              <li><a href="#notification">Notification</a></li>
            </ul>
          </li>
          <li>
            <a style="font-size: 18px" @click.prevent="showAccount = !showAccount">
              Account &ensp; <span style="float: right">{{ AccountIcon }}</span>
            </a>
            <ul v-show="showAccount" style="top: 100%">
              <li><a href="#account-lock">Account lock</a></li>
              <li><a href="#deactivate-account">Deactivate account</a></li>
              <li><a href="#reactivate-account">Reactivate account</a></li>
            </ul>
          </li>
          <li>
            <router-link to="/help" style="text-decoration: none">
              TeamUsUp Help Center</router-link
            >
          </li>
          <li>
            <router-link to="/home" style="text-decoration: none"> Dashboard</router-link>
          </li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
    <div class="content">
      <h1 id="getting-started">Getting started</h1>

      <p>
        Foremost, you will need an internet-connected device with a compatible web
        browser.
      </p>
      <p>To access our web page:</p>
      <ol>
        <li>Open your preferred web browser.</li>
        <li>
          Type in the address bar the complete URL: <code>http://49.245.48.28:8086/</code>
        </li>
        <li>The landing page will then appear.</li>
      </ol>

      <h2 id="landing-page">Landing page</h2>
      <p>
        The landing page is the page that first appears when the system is run or
        executed. The landing page of this TeamUsUp is shown as below:
      </p>
      <img src="../helpPage/image/landing.png" />
      <ol>
        <li>
          Click the Home icon button to navigate to our dashboard if you have already
          logged in.
        </li>
        <li>Click the Search icon button to navigate to our search page.</li>
        <li>Click the Login button to log in the system.</li>
        <li>Click the Sign-up Now button for the register of new accounts.</li>
      </ol>
      <h2 id="registration">Registration</h2>
      <img src="../helpPage/image/SignUp.png" />
      <p>How to registration:</p>
      <ol>
        <li>Fill up all the fields with your personal data.</li>
        <li>
          Click the SIGN-UP button to save all your inputted information. You will receive
          an email for confirming your account.
        </li>
        <li>Click the Login here! link if you already have an account.</li>
      </ol>
      <h2 id="logging-on">Logging on</h2>
      <img src="../helpPage/image/Login.png" />
      <p>How to log in:</p>
      <ol>
        <li>Type your email address on the Email address field.</li>
        <li>Type your password on the Password field.</li>
        <li>
          After filling up the fields for your email address and password, click on the
          login button or simply press enter to log in.
        </li>
        <li>
          For instances of forgotten password, click on the Forgot my password link and
          fill in your email address, then go to your email account for the confirmation
          sent to you.
        </li>
        <li>Click the Register an Account! button to register a new account.</li>
      </ol>
      <h2 id="system-menu">System menu</h2>
      <p>
        Once you’ve logged in the system, the system menu will now be working. The system
        menu is navigation of all functions related to the TeamUsUp system. It can be
        found on the top portion of the system
      </p>
      <img src="../helpPage/image/SystemMenu.png" />
      <ol>
  <li>Click on the Home icon button to navigate to the dashboard page.</li>
  <li>Click on the Search icon button to navigate to the search page.</li>
  <li>Click on the Bell icon button to navigate to the notification page.</li>
  <li>Click on the Profile icon button to show the dropdown menu containing Profile, Project, and Logout.</li>
  <ol type="a">
    <li>Click on the Profile option to view your own profile.</li>
    <li>Click on the Project option to view your own project.</li>
    <li>Click on the Logout option to log out of your account.</li>
  </ol>
</ol>

      <h2 id="exit-system">Exit system</h2>
      <img src="../helpPage/image/logout.png" />
      <p>How to exit the system</p>
      <ol>
      <li>Click the profile icon on the top right of the page.</li>
      <li>Click Logout to formally logout from the system.</li>
      </ol>

      <h1 id="general">General</h1>
      <h2 id="home-page">Home page</h2>
      <img src="../helpPage/image/General/home.png" />
      <h2 id="dashboard">Dashboard</h2>
      <img src="../helpPage/image/General/dashb1.png" />
      <img src="../helpPage/image/General/dashb2.png" />
      <h2 id="profile-creation">Profile creation</h2>
      <img src="../helpPage/image/General/Cr4eateprofile.png" />
      <h2 id="profile-page">Profile page</h2>
      <img src="../helpPage/image/General/profile.png" />
      <h2 id="edit-profile">Edit profile</h2>
      <img src="../helpPage/image/General/editprofile.png" />
      <h2 id="project-list">Project list</h2>
      <img src="../helpPage/image/General/recentproject.png" />
      <h2 id="project-detail">Project detail</h2>
      <img src="../helpPage/image/General/project.png" />
      <h2 id="create-project">Create project</h2>
      <img src="../helpPage/image/General/createproject.png" />
      <h2 id="evaluation">Evaluation</h2>
      <img src="../helpPage/image/General/eva.png" />
      <img src="../helpPage/image/General/eva2.png" />
      <h2 id="search">Search</h2>
      <img src="../helpPage/image/General/search.png" />
      <h2 id="notification">Notification</h2>
      <img src="../helpPage/image/General/noti.png" />


      <h1 id="account">Account</h1>
      <h2 id="account-lock">Account lock</h2>
      <h2 id="deactivate-account">Deactivate account</h2>
      <h2 id="reactivate-account">Reactivate account</h2>

      <h1 id="contact">Contact</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "helpNav",
  data() {
    return {
      showGettingStarted: false,
      showGeneral: false,
      showAccount: false,
    };
  },
  computed: {
    gettingStartedIcon() {
      return this.showGettingStarted ? "\u2227" : "\u2228";
    },
    generalIcon() {
      return this.showGeneral ? "\u2227" : "\u2228";
    },
    AccountIcon() {
      return this.showAccount ? "\u2227" : "\u2228";
    },
  },
  mounted() {
    // Select all anchor tags with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');

    // Loop through all the links
    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the linked section ID
        const target = document.querySelector(link.getAttribute("href"));

        // Scroll smoothly to the linked section
        target.scrollIntoView({
          behavior: "smooth",
        });
      });
    });
    {
      if (this.$route.hash) {
        const element = document.getElementById(this.$route.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  },
};
</script>

<style scoped>
.navBar {
  float: left;
  min-height: 100vh;
  height: auto;
  text-align: left;
}

nav {
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: math;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  position: relative;
}

nav li a {
  display: block;
  padding: 10px;
  color: black;
  text-decoration: none;
}

nav li ul li a {
  padding: 10px;
}

nav li:hover > ul {
  display: block;
}
nav li:hover > a {
  background-color: #f0f0f0;
  border-bottom: solid 2px #e12744;
  color: #e12744;
}
img {
  width: 900px;
  display: block;
}
.content {
  font-family: math;
  border: #e12744 solid 2px;
  text-align: justify;
  padding-left: 90px;
  padding-right: 90px;
}
.content h1 {
  border-bottom: #e12744 solid 2px;
}
</style>
