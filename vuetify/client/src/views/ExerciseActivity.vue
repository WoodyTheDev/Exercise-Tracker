<template>
  <ToolBar />
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :items="exercises"
    :headers="headers"
    item-value="exercise"
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
                  <ExerciseComboBox v-model="editedItem.name" />
                </v-col>
                <v-col cols="12">
                  <AmountComboBox v-model="editedItem.amount" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.date"
                    label="Date"
                    bg-color="deep-orange-lighten-1"
                    color="deep-orange-lighten-2"
                    type="date"
                    hide-details="auto"
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </VDataTable>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import ExerciseComboBox from "@/components/ExerciseComboBox.vue";
import AmountComboBox from "@/components/AmountComboBox.vue";

type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>>
  ? UnwrapReadonlyArrayType<I>
  : A;
type DT = InstanceType<typeof VDataTable>;
type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT["headers"]>;
type Exercise = {
  name: string;
  amount: number;
  date: string;
};
export default defineComponent({
  name: "ExerciseActivity",

  components: { ToolBar, VDataTable, ExerciseComboBox, AmountComboBox },

  data() {
    return {
      dialogEdit: false,
      dialogDelete: false,
      itemsPerPage: 10,
      headers: [
        { title: "Exercise", key: "name" },
        { title: "Repititions/Km", key: "amount" },
        { title: "Date", key: "date" },
        { title: "Actions", key: "actions", sortable: false },
      ] as Array<ReadonlyDataTableHeader>,
      exercises: [] as Array<Exercise>,
      editedIndex: -1,
      editedItem: {
        name: "",
        amount: 0,
        date: "",
      },
      defaultItem: {
        name: "",
        amount: 0,
        date: "",
      },
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

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.exercises = [
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
        { name: "Pushups", amount: 10, date: "2021-01-01" },
      ];
    },
    editItem(item: Exercise) {
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
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
    saveEdit() {
      Object.assign(this.exercises[this.editedIndex], this.editedItem);
      this.closeEdit();
    },
    deleteItem(item: Exercise) {
      this.editedIndex = this.exercises.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.exercises.splice(this.editedIndex, 1);
      this.closeDelete();
    },
  },
});
</script>
