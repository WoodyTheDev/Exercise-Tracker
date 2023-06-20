import { createRouter, createWebHistory } from "vue-router";
import ExerciseTracker from "./views/ExerciseTracker.vue";
import ExerciseActivity from "./views/ExerciseActivity.vue";

const routes = [
  {
    path: "/",
    name: "ExerciseTracker",
    component: ExerciseTracker,
    meta: {
      title: "Tracker",
    },
  },
  {
    path: "/ExerciseActivity",
    name: "ExerciseActivity",
    component: ExerciseActivity,
    meta: {
      title: "Activity",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
