import { DatabaseSync } from "node:sqlite";

export const createTracker = () => {
  const tracker = new DatabaseSync(":memory:");
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

export const addItemDetails = (
  tracker,
  item,
  price,
  quantity,
  totalAmount,
  date,
) => {
  const query =
    `INSERT into expense_tracker (item_name, item_price, quantity, total_amount, date)
     values (?, ?, ?, ?, ?)`;
  const insertStatement = tracker.prepare(query);
  const insertInfo = insertStatement.run(item, price , quantity, totalAmount, date);
  return insertInfo;
};
