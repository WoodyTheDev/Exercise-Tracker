<template>
  <ToolBar />
  <v-container class="mt-4">
    <h1 class="text-h3 mb-4 text-deep-orange-lighten-1 font-weight-bold">
      Track your exercise
    </h1>

    <ExerciseComboBox v-model="selectedExercise" />
    <AmountComboBox v-model="selectedAmount" class="mt-4" />

    <v-row justify="end" class="mt-4 mr-0">
      <v-btn size="large" variant="flat" color="deep-orange-lighten-1">
        Add
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import ExerciseComboBox from "@/components/ExerciseComboBox.vue";
import AmountComboBox from "@/components/AmountComboBox.vue";

export default defineComponent({
  name: "ExerciseTracker",

  components: { ToolBar, ExerciseComboBox, AmountComboBox },

  data() {
    return {
      selectedExercise: null,
      selectedAmount: null,
    };
  },
});
</script>
