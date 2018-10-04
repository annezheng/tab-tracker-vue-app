import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
// import Songs from "./views/Songs.vue";
import CreateSong from "./views/CreateSong.vue";
import ViewSong from "./views/ViewSong.vue";
import EditSong from "./views/EditSong.vue";
import SongsPanel from "./views/SongsPanel.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/songs",
      name: "songs-panel",
      component: SongsPanel
    },
    {
      path: "/songs/create",
      name: "create-song",
      component: CreateSong
    },
    {
      path: "/songs/:songId",
      name: "song",
      component: ViewSong
    },
    {
      path: "/songs/:songId/edit",
      name: "edit-song",
      component: EditSong
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
