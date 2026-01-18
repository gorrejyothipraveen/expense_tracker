export const queryTracker = (tracker,trackerFns, args) => {
  if (tracker === undefined) {
    throw new Error("tracker is not exists");
  }
  
  const operations = {
    init : trackerFns.initTracker,
    add : trackerFns.addItemDetails,
    list : trackerFns.listItemDetails
  }

  const params = [...args.slice(1)];
  return operations[args[0]](tracker, ...params)
  
};