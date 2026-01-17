import { DatabaseSync } from "node:sqlite";

export const createTracker = () => {
  const tracker = new DatabaseSync(':memory:');
  return tracker;
};

export const queryTracker = (tracker) => {
  if (tracker === undefined) {
    throw new Error("tracker is not exists");
  }
};

export const initTracker = (tracker) => {
  tracker.exec(`
    CREATE TABLE  IF NOT EXISTS expense_tracker(
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    item_price INTEGER NOT NULL CHECK (item_price > 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_amount INTEGER NOT NULL CHECK (total_amount > 0),
    date TEXT NOT NULL
    );
  `);
};
