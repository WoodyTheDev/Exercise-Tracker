<template>
  <ToolBar />
  Hello Activity
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";
export default defineComponent({
  name: "ExerciseActivity",

  components: { ToolBar },

  data() {
    return {
      //
    };
  },
});
</script>
