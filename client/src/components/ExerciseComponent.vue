<template>
  <v-combobox
    ref="exerciseNameCombobox"
    :value="exerciseName"
    @update:modelValue="updateExerciseNameCombobox"
    :clearable="isClearable"
    :active="isActive"
    label="Exercise"
    bg-color="deep-orange-lighten-1"
    color="deep-orange-lighten-2"
    :items="exerciseNameList"
    hide-details="auto"
  ></v-combobox>
  <v-combobox
    ref="exerciseAmountCombobox"
    :value="exerciseAmount"
    @update:modelValue="updateExerciseAmountCombobox"
    :clearable="isClearable"
    :active="isActive"
    type="number"
    bg-color="deep-orange-lighten-1"
    color="deep-orange-lighten-2"
    label="Repititions/Km"
    :items="amountList"
    hide-details="auto"
    class="mt-4"
  ></v-combobox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VCombobox } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "ExerciseComponent",
  props: {
    exerciseName: {
      type: String,
      default: () => null,
    },
    exerciseAmount: {
      type: Number,
      default: () => null,
    },
    isActive: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isClearable: true,
      exerciseNameList: [] as string[],
      amountList: Array.from({ length: 40 }, (_, i) => i + 1),
    };
  },
  async mounted() {
    const response = await this.axios.get("api/exerciseList/unique/");
    this.exerciseNameList = response.data;
    this.updateExerciseNameCombobox(this.exerciseName);
    this.updateExerciseAmountCombobox(this.exerciseAmount);
  },
  methods: {
    async addExercise(e: Event) {
      e.preventDefault();
      const response = await this.axios.post("api/exerciseList/", {
        name: this.exerciseName,
        amount: this.exerciseAmount,
        date: new Date(),
      });
      if (!this.exerciseNameList.includes(response.data.name)) {
        this.exerciseNameList.push(response.data.name);
      }
      (this.$refs.exerciseNameCombobox as VCombobox).reset();
      (this.$refs.exerciseAmountCombobox as VCombobox).reset();
    },
    updateExerciseNameCombobox(value: any) {
      this.$emit("update:exerciseName", value);
    },
    updateExerciseAmountCombobox(value: any) {
      this.$emit("update:exerciseAmount", value);
    },
  },
});
</script>
