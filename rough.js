
const extractContent = async (file) => {
  const rawData = await file.readable.getReader().read();
  return JSON.parse(rawData);
}

export const isDayExist = async () => {
  const file = await Deno.open(LOG_FILE);
  const stats = await file.stat();
  if(stats.size === 0) return !!stats.size;
  const dates = extractContent(file);
  return dates.includes()
}

export const insertIntoLog = async (file) => {
  let logObject = {};
  const logFile = await Deno.open(LOG_FILE, { read: true, write: true });
  const data = (await logFile.readable.getReader().read()).value;
  if (data.length !== undefined) {
    logObject = transform(DECODE(data));
  }
  logObject[file] = file;
  logFile.write(ENCODE(toJsonFormat(logObject)));
  return;
};