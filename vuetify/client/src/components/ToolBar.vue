<template>
  <v-toolbar :elevation="8" color="deep-orange" app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <span class="font-weight-light">Exercise</span>
      <span>{{ $route.meta.title }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>
      <span class="mr-3 font-weight-light">Sign Out</span>
      <v-icon right>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>

  <v-navigation-drawer color="deep-orange" v-model="drawer" app temporary>
    <v-list>
      <v-list-subheader color="grey-lighten-2">NAVIGATION</v-list-subheader>
      <v-list-item
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
      >
        <template v-slot:prepend>
          <v-icon color="white">{{ link.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-clock-edit", text: "Tracker", route: "/ExerciseTracker" },
        { icon: "mdi-poll", text: "Activity", route: "/ExerciseActivity" },
      ],
    };
  },
};
</script>
