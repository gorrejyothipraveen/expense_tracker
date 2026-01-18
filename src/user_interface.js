import { queryTracker } from "./queryTracker.js";
import * as trackerFns from "./sqlite_tracker.js";
import {
  addExpenses,
  viewMonthlyExpenses,
  viewTodayExpenses,
  viewYearlyExpenses,
} from "./tracker.js";

const list = [
  "add the expenses",
  "view expenses",
];

export const displayMenu = (list) => {
  console.clear();
  console.log("\n".repeat(2), " ".repeat(5));
  for (let i = 0; i < list.length; i++) {
    console.log(" ".repeat(5) + `%c${i + 1}.`, "color:yellow", list[i]);
    console.log("\n");
  }

  console.log("\n".repeat(1));
};

export const viewExpenses = (tracker, trackerFns) => {
  const list = [
    "view today expenses ",
    "view monthly expenses",
    "view yearly expenses",
  ];
  displayMenu(list);
  const option = prompt(">>> enter :");
  return view[option](tracker, trackerFns);
};

const view = {
  1: viewTodayExpenses,
  2: viewMonthlyExpenses,
  3: viewYearlyExpenses,
};

const operations = {
  1: addExpenses,
  2: viewExpenses,
};

export const takeOptionAndPerformOperation = (tracker, trackerFns) => {
  const choice = prompt("enter :  ");
  return [choice, operations[choice](tracker, trackerFns)];
};

export const showOutput = (option, result) => {
  console.clear();
  if (option === "1") {
    console.log("\t\t%c successfully added!!\n\n", "color: yellow");
  } else console.table(result);
};

export const useExpenseTracker = () => {
  const tracker = trackerFns.createTracker("tracker.db");
  queryTracker(tracker, trackerFns, ["init"]);
  displayMenu(list);
  const [option, result] = takeOptionAndPerformOperation(tracker, trackerFns);
  showOutput(option, result);
  if (confirm("do you want use it again ?")) {
    return useExpenseTracker();
  }
  return;
};
