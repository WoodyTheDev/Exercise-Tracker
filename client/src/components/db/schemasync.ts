import { openDB } from "idb";
import { Exercise } from "@/components/ExerciseComponent.d";

export const SchemaSyncHandler = {
  sync(): void {
    openDB<Exercise>("ExerciseTracker", 1, {
      upgrade(db) {
        db.createObjectStore("exercise", { keyPath: "date" });
      },
    });
    openDB<string[]>("ExerciseTrackerUnique", 1, {
      upgrade(db) {
        db.createObjectStore("unique");
      },
    });
    openDB<number>("ExerciseTrackerAllItemsLength", 1, {
      upgrade(db) {
        db.createObjectStore("allItemsLength");
      },
    });
  },
};
