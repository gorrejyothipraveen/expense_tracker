export const MONTH = {
  0 : 1,
  1 : 2,
  2 : 3,
  3 : 4,
  4 : 5,
  5 : 6,
  6 : 7,
  7 : 8,
  8 : 9,
  9 : 10,
  10 : 11,
  11 : 12
}

export const LOG_FILE = '../log.md';

export const ENCODE = data => new TextEncoder().encode(data);

export const DECODE = data => new TextDecoder().decode(data);

export const READER = Deno.stdin.readable.getReader();

export const WRITER = Deno.stdout.writable.getWriter();

export const BUFFER = new Uint8Array(100);