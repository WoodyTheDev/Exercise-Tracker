<template>
  <ToolBar />
  <v-container class="mt-4">
    <h1 class="text-h3 mb-4 text-deep-orange-lighten-1 font-weight-bold">
      Track your exercise
    </h1>

    <ExerciseComponent
      ref="exerciseComponent"
      v-model:exerciseName="exercise.name"
      v-model:exerciseAmount="exercise.amount"
    />

    <v-row justify="end" class="mt-4 mr-0">
      <v-btn
        size="large"
        variant="flat"
        color="deep-orange-lighten-1"
        @click="addExercise"
      >
        Add
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import ExerciseComponent from "@/components/ExerciseComponent.vue";
import { Exercise } from "@/components/ExerciseComponent.d";

export default defineComponent({
  name: "ExerciseTracker",

  components: { ToolBar, ExerciseComponent },

  data() {
    return {
      exercise: {} as Exercise,
    };
  },
  methods: {
    addExercise(e: Event) {
      (this.$refs.exerciseComponent as typeof ExerciseComponent).addExercise(e);
    },
  },
});
</script>
