<template>
  <v-combobox
    v-model="selectedAmount"
    type="number"
    bg-color="deep-orange-lighten-1"
    color="deep-orange-lighten-2"
    label="Repititions/Km"
    :items="amount"
    hide-details="auto"
  ></v-combobox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AmountComboBox",

  data() {
    return {
      isClearable: true,
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
    };
  },
});
</script>
