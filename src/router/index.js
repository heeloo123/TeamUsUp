import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUp.vue";
import LoginView from "../views/LoginView.vue";
import ForgetPasswordPage from "../views/ForgetPasswordView.vue";
import CreateProfileView from "../views/CreateProfileView.vue";
import CreateProjectView from "../views/CreateProjectView.vue";
import ProfileView from "../views/ProfileView.vue";
import ProjectView from "../views/ProjectView.vue";
import EditProjectView from "../views/EditProjectView.vue";
import SelfEvaView from "../views/SelfEvaluate.vue";
import PeerEvaView from "../views/PeerEvaluate.vue";
import AdminPage from "../views/AdminPage.vue";
import AdminHome from "../views/AdminHomePage.vue";
import StudentHomePage from "../views/StudentHomePage.vue";
import NavView from "../views/NavView.vue";
import NotificationVue from "@/views/Notification.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpView,
  },
  {
    path: "/Login",
    name: "LoginView",
    component: LoginView,
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
    path: "/Project",
    name: "Project",
    component: ProjectView,
  },
  {
    path: "/Editproject",
    name: "EditProjectView",
    component: EditProjectView,
  },
  {
    path: "/SelfEva",
    name: "SelfEva",
    component: SelfEvaView,
  },
  {
    path: "/PeerEva/:userName",
    name: "PeerEva",
    component: PeerEvaView,
  },
  {
    path: "/AdminPage",
    name: "AdminPage",
    component: AdminPage,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
