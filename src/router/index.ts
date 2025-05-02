import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../components/About.vue";
import Projects from "../components/Projects.vue";
import Skills from "../components/Skills.vue";
import Contact from "../components/Contact.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "fade-up" },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { transition: "fade-up" },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: { transition: "fade-up" },
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
    meta: { transition: "fade-up" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { transition: "fade-up" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Navigation guards for page transitions
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `${String(to.name)} | Creative Developer Portfolio`;
  next();
});

export default router;
