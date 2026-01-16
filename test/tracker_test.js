import { assertEquals } from "@std/assert";
import { createDate, createTracker, FormatDate, toString } from "../src/tracker.js";

Deno.test("formatting the date", () => {
  assertEquals(FormatDate('11', '1', '2026'), '11-01-2026');
});

Deno.test('convert number to string', () => {
  assertEquals(toString(1, 2, 3), ['1', '2', '3']);
});

Deno.test('formatting the date', () => {
  assertEquals(createDate(), '16-01-2026')
});

Deno.test('creating the database', () => {
  const actual = createTracker();
  const expected = { tables : {}};
  assertEquals(actual, expected);
});