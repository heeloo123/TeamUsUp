import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUp.vue";
import LoginView from "../views/LoginView.vue";
import ForgetPasswordPage from "../views/ForgetPasswordView.vue";
import CreateProfileView from "../views/CreateProfileView.vue";
import CreateProjectView from "../views/CreateProjectView.vue";
import ProfileView from "../views/OwnProfileView.vue";
import ProjectView from "../views/OwnProjectView.vue";
import EditProjectView from "../views/EditProjectView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import SelfEvaView from "../views/SelfEvaluate.vue";
import PeerEvaView from "../views/PeerEvaluate.vue";
import AdminPage from "../views/AdminPage.vue";
import AdminHome from "../views/AdminHomePage.vue";
import StudentHomePage from "../views/StudentHomePage.vue";
import NavView from "../views/NavView.vue";
import NotificationVue from "@/views/Notification.vue";
import StudentProfileView from "../views/StudentProfileView.vue";
import StudentProjectView from "@/views/StudentProjectView.vue";
import searchPage from "@/views/searchPage.vue";
import { useAuthStore } from "@/stores/auth";
import ownPView from "@/views/OwnProjectList.vue";
import testUse from "@/views/testUse.vue";
import CommentPage from "@/views/CommentView.vue";

const authGuard = (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && (to.name === 'LoginView' || to.name === 'SignUpPage')) {
    // If the user is authenticated and they're trying to access the login page,
    // redirect them to the home page
    next({ name: 'home' })
  } else {
    // Otherwise, allow them to access the page
    next()
  }
}

// const adminGuard = (to, from, next) => {
//   const authStore = useAuthStore()
//   const Swal = require("sweetalert2");

//   if (authStore.isAuthenticated && authStore.isAdmin) {
//     // If the user is authenticated and has the Admin role, allow them to access the page
//     next()
//   } else {
//     // Otherwise, redirect them to the home page
//     Swal.fire({
//       icon: 'warning',

//       text: 'You are not authorized to access this page!',
//     })

//     next({ name: 'home' })
//   }
// }



const routes = [

  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpView,
    beforeEnter: authGuard
  },

  {
    path: "/Login",
    name: "LoginView",
    component: LoginView,
    beforeEnter: authGuard
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPasswordPage",
    component: ForgetPasswordPage,
  },
  {
    path: "/CreateProfile",
    name: "CreateProfile",
    component: CreateProfileView,
  },
  {
    path: "/CreateProject",
    name: "CreateProject",
    component: CreateProjectView,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/Project/:reference",
    name: "Project",
    component: ProjectView,
  },
  {
    path: "/Editproject/:reference",
    name: "EditProjectView",
    component: EditProjectView,
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    component: EditProfileView,
  },
  {
    path: "/SelfEva/:reference",
    name: "SelfEva",
    component: SelfEvaView,
    
  },
  {
    path: "/PeerEva/:reference/:profileID",
    name: "PeerEva",
    component: PeerEvaView,
  },
  {
    path: "/AdminPage",
    name: "AdminPage",
    component: AdminPage,
    //beforeEnter: adminGuard
  },
  {
    path: "/AdminHome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/home",
    name: "StudentHome",
    component: StudentHomePage,
  },
  {
    path: "/navView",
    name: "navView",
    component: NavView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/notification",
    name: "notificationView",
    component: NotificationVue,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/StudentProfile/:reference",
    name: "StudentProfile",
    component: StudentProfileView,
  },
  {
    path: "/StudentProject/:reference",
    name: "StudentProject",
    component: StudentProjectView,
  },
  {
    path: "/searchPage",
    name: "searchPage",
    component: searchPage,
  },
  {
    path: "/ownPView",
    name: "ownPView",
    component: ownPView,
  },
  {
    path: "/test",
    name: "test",
    component: testUse,
  },
  {
    path: "/CommentPage/:reference",
    name: "CommentPage",
    component: CommentPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
