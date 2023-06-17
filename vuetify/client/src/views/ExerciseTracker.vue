<template>
  <ToolBar />
  <v-container class="mt-4">
    <h1 class="text-h3 mb-4 text-deep-orange-lighten-1 font-weight-bold">
      Track your exercise
    </h1>

    <v-combobox
      ref="exerciseCombobox"
      v-model="selectedExercise"
      :clearable="isClearable"
      :persistent-clear="isClearable"
      bg-color="deep-orange-lighten-1"
      color="deep-orange-lighten-2"
      label="Select an exercise"
      :items="exercises"
      hide-details="auto"
    ></v-combobox>

    <v-combobox
      v-model="selectedAmount"
      :clearable="isClearable"
      :persistent-clear="isClearable"
      bg-color="deep-orange-lighten-1"
      color="deep-orange-lighten-2"
      label="Repititions/Km"
      :items="amount"
      hide-details="auto"
      class="mt-4"
    ></v-combobox>

    <v-row justify="end" class="mt-4 mr-0">
      <v-btn
        size="large"
        variant="flat"
        color="deep-orange-lighten-1"
        :disabled="!selectedExercise || !selectedAmount"
      >
        Add
      </v-btn>
    </v-row>
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
      selectedAmount: null,
      amount: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
      ],
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
