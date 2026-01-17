export const queryTracker = (tracker,trackerFns, args) => {
  if (tracker === undefined) {
    throw new Error("tracker is not exists");
  }

  const params = [...args.slice(1)];
  switch(args[0]) {
    case "init" :
      return trackerFns.initTracker(tracker);
    case "add" :
      return trackerFns.addItemDetails(tracker, ...params);
    case "list" :
      return trackerFns.listItemDetails(tracker);
  }
};