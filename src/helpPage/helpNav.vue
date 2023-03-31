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
        <li>
          Click on the Profile icon button to show the dropdown menu containing Profile,
          Project, and Logout.
        </li>
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
      <p>
        The home page serves as the starting point for accessing of TeamUsUp system. The
        home page is designed to provide users with an overview of the system’s functions
        and purpose.
      </p>
      <img src="../helpPage/image/General/home.png" />
      <ol>
        <li>Click the dashboard button to access dashboard page.</li>
      </ol>
      <h2 id="dashboard">Dashboard</h2>
      <p>
        The dashboard page has two different views depending on you have created a profile
        or not.
      </p>
      <h3>First time login user or user without create a profile.</h3>
      <p>
        If you are logging in for the first time, you will see a dashboard view with a box
        with title “Get started by creating your profile today”.
      </p>
      <img src="../helpPage/image/General/dashb1.png" />
      <ol>
        <li>
          Click on the box with title “Get started by creating your profile today” for
          profile creation.
        </li>
      </ol>
      <h3>Profile created view.</h3>
      <p>
        Once you have created profile, you will be able to access the full dashboard page.
      </p>
      <img src="../helpPage/image/General/dashb2.png" />
      <ol>
        <li>
          To create a new project, click on the box with the title "Ready to collaborate?
          Create your project now."
        </li>
        <li>
          To view your own profile, click on the box with the title "View your profile
          here."
        </li>
        <li>
          To search for other students' profiles and projects, click on the box with the
          title "Search user & project."
        </li>
        <li>
          To view your own project, click on the box with the title "View your project
          here."
        </li>
      </ol>
      <h2 id="profile-creation">Profile creation</h2>
      <p>
        Creating a profile is a necessary step for accessing the full range of
        functionality within our system.
      </p>
      <img src="../helpPage/image/General/Cr4eateprofile.png" />
      <ol>
        <li>
          Click the Choose file button to upload a profile picture. This upload of profile
          picture is optional. Note that the uploaded photo must be square with a 1:1
          aspect ratio.
        </li>
        <li>Click the dropdown list beside the Major and choose up to two majors.</li>
        <li>Fill in the Biography field with a brief description of yourself.</li>
        <li>Click the Create button to save your profile information.</li>
        <li>Click the Cancel button to discard your profile.</li>
      </ol>

      <h2 id="profile-page">Profile page</h2>
      <p>
        Every user has its own profile page. This page contains the profile picture (if
        have), and basic information about the user. The profile page can access through
        dashboard or profile icon at the top right.
      </p>
      <img src="../helpPage/image/General/profile.png" />
      <ol>
        <li>Click the Recent project button to view your recent project list.</li>
        <li>
          The user’s basic information is displayed on the profile page, including their
          name, profile picture, major(s), and self-introduction.
        </li>
        <li>Click on the Pencil icon to edit your own profile.</li>
        <li>
          Click Deactivate button to deactivate your account. Note that once you
          deactivate your account, you will not be able to access the system until you
          reactivate it. To reactivate your account, wait for at least one hour, and then
          click the "Activate" button that will appear on your account page when your
          account is deactivated.
        </li>
      </ol>

      <h2 id="edit-profile">Edit profile</h2>
      <p>
        When user click the pencil icon from profile page will navigate to edit profile
        page. Every user is allowed to edit his/her own profile.
      </p>
      <img src="../helpPage/image/General/editprofile.png" />
      <p>How to edit your profile:</p>
      <ol>
        <li>
          Click the Choose file button to upload a new profile picture. If no new upload,
          the previous profile picture will in use. Note that the uploaded photo must be
          square with a 1:1 aspect ratio.
        </li>
        <li>
          Click the X button beside the Major name to deselect the major. You can only
          have a maximum of two majors selected, so you'll need to deselect one if you
          want to choose a new one.
        </li>
        <li>Click the dropdown list beside the Major and choose new majors.</li>
        <li>Type in the Biography field with a new description of yourself.</li>
        <li>Click the Save button to save your new profile information.</li>
        <li>Click the Cancel button to discard your change.</li>
      </ol>

      <h2 id="project-list">Project list</h2>
      <p>
        Every user has its own project page. This page contains the project that the user
        has been participated in. The project list page can access through dashboard or
        Recent project button in profile page.
      </p>
      <img src="../helpPage/image/General/recentproject.png" />
      <ol>
        <li>
          Display the recent projects name, projects description. Click from the project
          list to view project detail.
        </li>
        <li>Click on the Create project button to create a new project.</li>
      </ol>

      <h2 id="project-detail">Project detail</h2>
      <img src="../helpPage/image/General/project.png" />
      <ol>
        <li>
          Display detail about the project, including project picture, project name and
          project description.
        </li>
        <li>
          Display the project members detail, including name, role, and average rating
          from other members.
        </li>
        <li>
          Click on the View comment button to view feedback from other users on this
          project.
        </li>
        <li>Click on the Evaluation button to self and peer evaluation.</li>
        <li>
          Click on the Pencil icon to edit project. Note that this pencil icon will show
          only when the user is the project owner.
        </li>
      </ol>

      <h2 id="create-project">Create project</h2>
      <p>Every user can create he/his own project and invite members.</p>
      <img src="../helpPage/image/General/createproject.png" />
      <p>Hot to create a project:</p>
      <ol>
        <li>
          Click the Choose file button to upload a project picture. This upload of project
          picture is optional. Note that the uploaded photo must be square with a 1:1
          aspect ratio.
        </li>
        <li>Fill up all the fields with project detail.</li>
        <li>
          Type in the username of the user that you want to add to the project then click
          the submit button or press Enter to search for the user.
        </li>
        <li>Display the list of search result.</li>
        <li>Type in the role you want the user to have in the project.</li>
        <li>Click the Add button to add the user to the project.</li>
        <li>Display the added user and his/her role.</li>
        <li>Click the X button next to the username to remove the user.</li>
        <li>Click the Create button to save project information.</li>
        <li>Click the Cancel button to discard creating a project.</li>
      </ol>
      <h2 id="Editproject">Edit project</h2>
      <p>
        This feature is only applicable for project owner (the user who create the
        project). To edit the project, project owner can click the pencil icon in project
        detail page.
      </p>
      <img src="../helpPage/image/General/editproject.png" />
      <p>How to edit project:</p>
      <ol>
        <li>
          Click the Choose file button to upload a new project picture. This upload of
          project picture is optional. Note that the uploaded photo must be square with a
          1:1 aspect ratio.
        </li>
        <li>Fill up all the fields with new project detail.</li>
        <li>
          Type in the username of user that you want to add to the project then click the
          submit button or press Enter to search for the user.
        </li>
        <li>Display the list of search result.</li>
        <li>Type in the role you want the user to have in the project.</li>
        <li>Click the Add button to add the user to the project.</li>
        <li>Display the added user and his/her role.</li>
        <li>Click the X button next to username to remove the user.</li>
        <li>Click the Save button to save project information.</li>
        <li>Click the Cancel button to discard change.</li>
      </ol>

      <h2 id="evaluation">Evaluation</h2>
      <p>Every user can provide feedback for project members on a project.</p>
      <img src="../helpPage/image/General/eva.png" />
      <img src="../helpPage/image/General/eva2.png" />
      <p>How to do evaluation:</p>
      <ol>
        <li>Click the Evaluation button and select user from the list.</li>
        <li>Click the Select button to navigate to the evaluation page.</li>
        <li>Click the Cancel button to discard select user.</li>
        <li>Review the rating scales and criteria.</li>
        <li>Fill up the comment field with feedback for the selected member.</li>
        <li>
          Use the ratio input to rate the user's specific skills by clicking on the
          appropriate number.
        </li>
        <li>Click the Submit button to save evaluation information.</li>
        <li>Click the Cancel button to discard evaluation.</li>
      </ol>
      <h2 id="search">Search</h2>
      <p>
        This search page is allowing user to search for specific content, such as user
        profiles and project details.
      </p>
      <img src="../helpPage/image/General/search.png" />
      <ol>
        <li>Type in the search bar to search for specific profile or project.</li>
        <li>
          Select the type of content you want to search for by clicking the appropriate
          option: "All" to search for both profiles and projects, "Profile" to search only
          for user profiles, or "Project" to search only for project details.
        </li>
        <li>Click the Submit button or press enter to initiate the search.</li>
        <li>
          Display a list of search result based on search criteria. Each search result is
          clickable and will navigate to the corresponding content.
        </li>
      </ol>

      <h2 id="notification">Notification</h2>
      <p>
        The notification page will notify user when there is someone done evaluation for
        user and someone invite user to project participation.
      </p>
      <img src="../helpPage/image/General/noti.png" />
      <ol>
        <li>Click on the All, Read, Unread button to filter notification.</li>
        <li>
          Display a list of notification sent to user. Unread message will show a red text
          ‘Unread’.
        </li>
        <li>Display the notification view box when user click the notification.</li>
        <li>
          When the notification is project participant invitation, user is able to click
          Accept button or Reject button to confirm the invitation.
        </li>
      </ol>

      <h1 id="account">Account</h1>

 

      <h2 id="reactivate-account">Reactivate Your Account</h2>
      <h3 style="font-weight: normal;border-bottom: #e12744 solid 1px;">Unable to Click the Activate Button?</h3>
      <p style="font-size: 1.2rem; line-height: 1.5; margin-bottom: 2rem">
        Please note that it may take up to one hour for your account to reactivate after
        clicking the activation button. If you need immediate reactivation, please email
        us at
        <a
          href="mailto:sparklechus@gmail.com"
          style="color: #0077cc; text-decoration: none"
          >sparklechus@gmail.com</a
        >
        with your request and we'll do our best to assist you promptly.
      </p>
      <h1 id="contact" style="font-size: 2.5rem; margin-bottom: 1rem">Contact Us</h1>
      <p style="font-size: 1.2rem; line-height: 1.5; margin-bottom: 2rem">
        If you have any questions or concerns about the system, please feel free to reach
        out to our developer by email at
        <a href="mailto:sparkechu@gmail.com" style="color: #0077cc; text-decoration: none"
          >sparkechu@gmail.com</a
        >. We value your feedback and will do our best to respond promptly.
      </p>
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
ol{
    border-bottom: 1px grey solid;
    padding-top: 10px;
    padding-bottom: 20px;
}
</style>
