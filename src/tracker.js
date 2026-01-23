import { MONTH } from "./data.js";
import { queryTracker } from "./queryTracker.js";

const dbg = (value) => console.log(">>>", value);

export const FormatDate = (day, month, year) => {
  return `${day.padStart(2, 0)}-${month.padStart(2, 0)}-${year}`;
};

export const toString = (x, y, z) => {
  return [x, y, z].map(String);
};

export const currentMonth = (date) => MONTH[date.getMonth()];

export const currentDay = (date) => date.getDate();

export const currentYear = (date) => date.getFullYear();

export const createDate = () => {
  const date = new Date();
  const day = currentDay(date);
  const month = currentMonth(date);
  const year = currentYear(date);

  const [dd, mm, yy] = toString(day, month, year);
  return FormatDate(dd, mm, yy);
}; 

export const newLine = (times = 1) => console.log("\n".repeat(times));

export const takeDetailAboutItem = () => {
  console.clear();
  const itemName = prompt("\tenter the item name :  ");
  newLine();
  const itemUnitCost = prompt("\tenter the unit price of the item : ");
  newLine();
  const itemQuantity = prompt("\tenter the quantity : ");
  return [itemName, itemUnitCost, itemQuantity];
};

export const addExpenses = (tracker, trackerFns) => {
  const [name, price, quantity] = takeDetailAboutItem();
  queryTracker(tracker, trackerFns, [
    "add",
    name,
    price,
    quantity,
    quantity * price,
    createDate(),
  ]);
  if (confirm("\ndo you want to insert another item ? \n")) {
    return addExpenses(tracker, trackerFns);
  }
  return;
};

export const viewMonthlyExpenses = (tracker, trackerFns) => {
  const query =
    `SELECT SUM(total_amount) as total_monthly_expense FROM expense_tracker where date LIKE '%${
      createDate().slice(2)
    }'`;
  const amount = queryTracker(tracker, trackerFns, ["list", query]);
  return amount;
};

export const viewYearlyExpenses = (tracker, trackerFns) => {
  const query =
    `SELECT SUM(total_amount) as total_yearly_expense FROM expense_tracker where date LIKE '%${
      createDate().slice(-4)
    }'`;
  const amount = queryTracker(tracker, trackerFns, ["list", query]);
  return amount;
};

export const viewTodayExpenses = (tracker, trackerFns) => {
  const query =
    `SELECT SUM(total_amount) as total_yearly_expense FROM expense_tracker where date LIKE '%${createDate()}'`;
  const amount = queryTracker(tracker, trackerFns, ["list", query]);
  return amount;
};


export const viewAllRecords = (tracker, trackerFns) => {
  const records = queryTracker(tracker, trackerFns, ['list']);
  return records;
}