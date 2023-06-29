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
        variant="flat"
        color="deep-orange-lighten-1 mr-2"
        icon="mdi-camera"
        @click="dialogCamera = true"
      >
      </v-btn>
      <v-btn
        size="large"
        variant="flat"
        color="deep-orange-lighten-1"
        @click="addExercise"
      >
        Add
      </v-btn>
    </v-row>
    <v-img :width="width" :height="height" cover :src="base64data" />
    <v-dialog v-model="dialogCamera" fullscreen hide-overlay>
      <v-card>
        <camera ref="camera" autoplay>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-orange-lighten-1" @click="dialogCamera = false"
              >Close</v-btn
            >
          </v-card-actions>
        </camera>
        <v-footer fixed-bottom class="text-center">
          <v-col cols="12">
            <v-btn
              variant="flat"
              color="deep-orange-lighten-1 mr-2"
              icon="mdi-camera"
              @click="snapshotAndCloseDialog"
            ></v-btn>
          </v-col>
        </v-footer>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import ExerciseComponent from "@/components/ExerciseComponent.vue";
import { Exercise } from "@/components/ExerciseComponent.d";
import Camera from "simple-vue-camera";

export default defineComponent({
  name: "ExerciseTracker",

  components: { ToolBar, ExerciseComponent, Camera },

  data() {
    return {
      exercise: {} as Exercise,
      dialogCamera: false,
    };
  },
  setup() {
    const camera = ref<InstanceType<typeof Camera>>();
    const base64data = ref<string>("");
    const width = ref(window.innerWidth).value / 4;
    const height = ref(window.innerHeight).value / 4;
    const snapshot = async () => {
      const blob = await camera.value?.snapshot({
        width: width,
        height: height,
      });
      if (blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let base64Value = reader.result?.toString();
          base64data.value = base64Value ? base64Value : "";
        };
      }
      // return base64data;
    };

    return {
      camera,
      base64data,
      snapshot,
      width,
      height,
    };
  },
  methods: {
    async addExercise(e: Event) {
      if (
        this.exercise.name &&
        this.exercise.name != "" &&
        this.exercise.amount &&
        this.exercise.amount > 0
      ) {
        this.exercise.picture = this.base64data;
        this.exercise.date = new Date();
        let exerciseName = "";
        try {
          const response = await this.axios.post(
            "api/exerciseList/set/",
            this.exercise
          );
          exerciseName = response.data.name;
        } catch (error) {
          console.error(error);
          exerciseName = this.exercise.name;
        }

        (
          this.$refs.exerciseComponent as typeof ExerciseComponent
        ).addExerciseToCombobox(e, exerciseName);

        this.base64data = "";
      }
    },
    snapshotAndCloseDialog() {
      console.log(this.width);
      console.log(this.height);
      this.snapshot();
      this.dialogCamera = false;
    },
  },
});
</script>
