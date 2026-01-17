import { MONTH } from "./data.js";
import { queryTracker } from "./queryTracker.js";

const dbg = (value) => console.log(">>>", value);

export const FormatDate = (day, month, year) => {
  return `${day.padStart(2, 0)}-${month.padStart(2, 0)}-${year}`;
};

export const toString = (x, y, z) => {
  return [x, y, z].map(String);
};

export const createDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = MONTH[date.getMonth()];
  const year = date.getFullYear();

  const [dd, mm, yy] = toString(day, month, year);
  return FormatDate(dd, mm, yy);
};

export const takeDetailAboutItem = () => {
  const itemName = prompt("enter the item name : ");
  const itemUnitCost = prompt("enter the unit price of the item : ");
  const itemQuantity = prompt("enter the quantity : ");
  return [itemName, itemUnitCost, itemQuantity];
};

export const addExpenses = (tracker, trackerFns) => {
  const [name, price, quantity] = takeDetailAboutItem();
  queryTracker(tracker,trackerFns, name, price, quantity, createDate());
  if (confirm("do you want to insert another item ? ")) {
    return addExpenses(tracker, trackerFns);
  }
  return;
};

