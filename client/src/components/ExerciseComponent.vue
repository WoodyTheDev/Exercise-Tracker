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
    :rules="[(v) => !!v || 'Required']"
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
    :rules="[
      (v) => !!v || 'Required',
      (v) => /^\d+$/.test(v) || 'Only positiv numbers',
      (v) => !/^0+$/.test(v) || 'No leading zeros',
    ]"
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
    const response = await this.axios.get("api/exerciseList/get/unique/");
    try {
      const jsonObject = JSON.parse(response.data);
      this.exerciseNameList = jsonObject[0].list;
    } catch (e) {
      this.exerciseNameList = response.data.list;
    }

    this.updateExerciseNameCombobox(this.exerciseName);
    this.updateExerciseAmountCombobox(this.exerciseAmount);
  },
  methods: {
    addExerciseToCombobox(e: Event, name: string) {
      e.preventDefault();
      if (!this.exerciseNameList.includes(name)) {
        this.exerciseNameList.push(name);
      }
      this.reset();
    },
    reset() {
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
