import { assertEquals, assertThrows } from "@std/assert";
import * as trackerFns from "../src/sqlite_tracker.js";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { queryTracker } from "../src/queryTracker.js";

Deno.test("creating the tracker database ", () => {
  const tracker = trackerFns.createTracker();
  assertEquals(tracker, new DatabaseSync(":memory:"));
});

Deno.test("testing the query tracker, tracer database is not created yet", () => {
  assertThrows(() => queryTracker());
});

Deno.test("testing tracker initialization : ", () => {
  const tracker = trackerFns.createTracker();
  trackerFns.initTracker(tracker);
  const tables = tracker.prepare(
    `SELECT name FROM sqlite_schema where name NOT LIKE 'sqlite_sequence'`,
  ).all();
  assertEquals(tables[0].name, "expense_tracker");
});

describe("===>  inserting the data into expense tracker table : ", () => {
  let tracker;
  beforeEach(() => {
    tracker = trackerFns.createTracker();
    trackerFns.initTracker(tracker);
  });

  afterEach(() => tracker.close());

  it("    inserting the item details into expense tracker", () => {
    const query =
      `INSERT into expense_tracker (item_name, item_price, quantity, total_amount, date)
     values (?, ?, ?, ?, ?)`;
    tracker.prepare(query).run("apple", 10, 1, 10, "17-01-2026");
    const records = tracker.prepare(`SELECT item_name FROM expense_tracker`)
      .all();
    assertEquals(records[0].item_name, "apple");
  });

  it("    inserting the item details into expense tracker, two records are inserted", () => {
    const query =
      `INSERT into expense_tracker (item_name, item_price, quantity, total_amount, date)
     values (?, ?, ?, ?, ?)`;
    tracker.prepare(query).run("apple", 10, 1, 10, "17-01-2026");
    tracker.prepare(query).run("mango", 10, 1, 10, "17-01-2026");
    const records = tracker.prepare(`SELECT item_name FROM expense_tracker`)
      .all();
    assertEquals(records[1].item_name, "mango");
  });

  it("    list the details in expense tracker", () => {
    const insertQuery =
      `INSERT into expense_tracker (item_name, item_price, quantity, total_amount, date)
     values (?, ?, ?, ?, ?)`;
    tracker.prepare(insertQuery).run("apple", 10, 1, 10, "17-01-2026");
    const records = trackerFns.listItemDetails(tracker);
    const expected = {
      item_id: 1,
      item_name: "apple",
      item_price: 10,
      quantity: 1,
      total_amount: 10,
      date: "17-01-2026",
    };
    assertEquals(records[0], expected);
  });

  it("    list the details in expense tracker, inserting two records ", () => {
    const insertQuery =
      `INSERT into expense_tracker (item_name, item_price, quantity, total_amount, date)
     values (?, ?, ?, ?, ?)`;
    tracker.prepare(insertQuery).run("apple", 10, 1, 10, "17-01-2026");
    tracker.prepare(insertQuery).run("mango", 10, 1, 10, "17-01-2026");
    const records = trackerFns.listItemDetails(tracker);
    const expected = {
      item_id: 2,
      item_name: "mango",
      item_price: 10,
      quantity: 1,
      total_amount: 10,
      date: "17-01-2026",
    };
    assertEquals(records[1], expected);
  });
});

describe("testing queryTracker functionality :", () => {
  let tracker;
  beforeEach(() => {
    tracker = trackerFns.createTracker();
    queryTracker(tracker, trackerFns, ["init"]);
  });

  afterEach(() => tracker.close());
  it("    initializing the table : ", () => {
    const tables = tracker.prepare(
      `SELECT name FROM sqlite_schema where name NOT LIKE 'sqlite_sequence'`,
    ).all();
    assertEquals(tables[0].name, "expense_tracker");
  });

  it("    inserting the details into expenses tracker", () => {
    queryTracker(tracker, trackerFns, [
      "add",
      "apple",
      10,
      1,
      10,
      "17-01-2026",
    ]);
    const records = tracker.prepare(`SELECT item_name FROM expense_tracker`)
      .all();
    assertEquals(records[0].item_name, "apple");
  });

  it("    retrieving the details into expenses tracker", () => {
    queryTracker(tracker, trackerFns, [
      "add",
      "apple",
      10,
      1,
      10,
      "17-01-2026",
    ]);
    const records =queryTracker(tracker, trackerFns, ["list"]);
    assertEquals(records[0].item_name, "apple");
  });
});
