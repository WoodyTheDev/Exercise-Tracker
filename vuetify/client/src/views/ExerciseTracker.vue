<template>
  <ToolBar />
  <v-container class="mt-4">
    <h1 class="text-h3 mb-4 text-deep-orange-lighten-1 font-weight-bold">
      Track your exercice
    </h1>
    <v-layout row>
      <v-flex>
        <v-combobox
          v-model="selectedExercise"
          :clearable="isClearable"
          bg-color="deep-orange-lighten-1"
          color="deep-orange-lighten-2"
          label="Select an exercise"
          :items="exercises"
        ></v-combobox>
      </v-flex>
      <v-flex>
        <v-btn v-if="!selectedExercise" class="mr-2" variant="outlined">
          Add
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";

export default defineComponent({
  name: "ExerciseTracker",

  components: { ToolBar },

  data() {
    return {
      isClearable: true,
      selectedExercise: null,
      exercises: [
        "California",
        "Colorado",
        "Florida",
        "Georgia",
        "Texas",
        "Wyoming",
      ],
    };
  },
});
</script>
