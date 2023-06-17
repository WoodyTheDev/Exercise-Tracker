<template>
  <v-combobox
    v-model="selectedExercise"
    label="Exercise"
    bg-color="deep-orange-lighten-1"
    color="deep-orange-lighten-2"
    :items="exercises"
    hide-details="auto"
  ></v-combobox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ExerciseComboBox",

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
