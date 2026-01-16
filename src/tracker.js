import { MONTH } from "./data.js";

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


export const createTracker = () => {
  return { tables : {}}
}