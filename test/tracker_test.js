import { assertEquals } from "@std/assert";
import { createDate, FormatDate, toString } from "../src/tracker.js";

Deno.test("formatting the date", () => {
  assertEquals(FormatDate('11', '1', '2026'), '11-01-2026');
});

Deno.test('convert number to string', () => {
  assertEquals(toString(1, 2, 3), ['1', '2', '3']);
});

Deno.test('formatting the date', () => {
  assertEquals(createDate(), '19-01-2026')
});