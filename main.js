import { queryTracker } from "./src/queryTracker.js";
import * as trackerFns from "./src/sqlite_tracker.js";
import { addExpenses } from "./src/tracker.js";

const main = () => {
  const tracker = trackerFns.createTracker("tracker.db");
  queryTracker(tracker, trackerFns, ["init"]);
  addExpenses(tracker, trackerFns);
}

main();