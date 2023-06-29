<template>
  <ToolBar />
  <VDataTableServer
    v-model:items-per-page="itemsPerPage"
    :items-length="allItemsLength"
    :items="exercises"
    :headers="headers"
    :item-key="itemKey"
    :search="search"
    item-value="exercise"
    :loading="loading"
    @update:options="loadItems"
  >
    <template v-slot:top>
      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ExerciseComponent
                    v-model:exerciseName="editedItem.name"
                    v-model:exerciseAmount="editedItem.amount"
                    v-model:isActive="isActive"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.date"
                    :value="formattedDate()"
                    label="Date"
                    bg-color="deep-orange-lighten-1"
                    color="deep-orange-lighten-2"
                    type="date"
                    hide-details="auto"
                    :rules="[(v) => !!v || 'Required']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange-darken-1" variant="text" @click="closeEdit">
              Cancel
            </v-btn>
            <v-btn color="orange-darken-1" variant="text" @click="saveEdit">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogImage" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Image</v-card-title>
          <v-btn color="deep-orange-lighten-1" @click="dialogImage = false"
            >Close</v-btn
          >
          <v-img cover :src="base64data" />
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange-darken-1" variant="text" @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              color="orange-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.date`]="{ item }">
      {{ new Date(item.columns.date).toLocaleDateString("de-DE") }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" class="me-2" @click="openImage(item.raw)">
        mdi-image
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
  </VDataTableServer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import ExerciseComponent from "@/components/ExerciseComponent.vue";
import { Exercise } from "@/components/ExerciseComponent.d";
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";

export default defineComponent({
  name: "ExerciseActivity",

  components: { ToolBar, VDataTableServer, ExerciseComponent },

  data() {
    return {
      dialogEdit: false,
      dialogImage: false,
      dialogDelete: false,
      itemsPerPage: 10,
      allItemsLength: 0,
      loading: true,
      headers: [
        { title: "Exercise", key: "name" },
        { title: "Repititions/Km", key: "amount" },
        { title: "Date", key: "date" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      exercises: [] as Array<Exercise>,
      search: "",
      editedIndex: -1,
      editedItem: {} as Exercise,
      defaultItem: {} as Exercise,
      isActive: true,
      base64data: "",
    };
  },
  watch: {
    dialogEdit(val) {
      val || this.closeEdit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  async mounted() {
    try {
      const response = await this.axios.get(
        "api/exerciseList/get/allItemsLength/"
      );

      try {
        const jsonObject = JSON.parse(response.data);
        this.allItemsLength = jsonObject[0].count;
      } catch (e) {
        this.allItemsLength = response.data.count;
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    itemKey() {
      return this.headers[0].key;
    },
  },
  methods: {
    closeEdit() {
      this.dialogEdit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    openImage(item: Exercise) {
      this.base64data = item.picture;
      this.dialogImage = true;
    },
    editItem(item: Exercise) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.exercises.indexOf(item);
      this.dialogEdit = true;
    },
    loadItems(options: any) {
      const page = options.page;
      const itemsPerPage = options.itemsPerPage;
      this.loading = true;
      this.axios
        .get("api/exerciseList/get/" + page + "/" + itemsPerPage)
        .then((response) => {
          try {
            // console.log("EXERCISE-JSON: " + response.data);
            const jsonObject = JSON.parse(response.data);
            // console.log("EXERCISE-JSON: " + jsonObject);
            let startIndex = (page - 1) * 10;
            let endIndex = startIndex + itemsPerPage;
            this.exercises = Object.values(jsonObject).slice(
              startIndex,
              endIndex
            ) as Exercise[];
          } catch (e) {
            // console.log("EXERCISE: " + response.data);
            this.exercises = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async saveEdit() {
      try {
        const response = await this.axios.put(
          "api/exerciseList/set/" + this.editedItem._id,
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            date: new Date(this.editedItem.date),
          }
        );
        console.log(response.data);
        console.log(this.editedIndex);
        Object.assign(this.exercises[this.editedIndex], response.data);
        console.log(this.exercises);
      } catch (error) {
        console.error(error);
      }
      this.closeEdit();
    },
    deleteItem(item: Exercise) {
      this.editedIndex = this.exercises.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        await this.axios.delete("api/exerciseList/set/" + this.editedItem._id, {
          data: {
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            date: new Date(this.editedItem.date),
          },
        });
        this.exercises.splice(this.editedIndex, 1);
        this.allItemsLength = this.allItemsLength - 1;
      } catch (error) {
        console.error(error);
      }
      this.closeDelete();
    },
    formattedDate() {
      return new Date(this.editedItem.date).toISOString().substring(0, 10);
    },
  },
});
</script>
