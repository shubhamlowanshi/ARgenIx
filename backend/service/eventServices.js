import Event from "../model/events.js";

export const createEvent = async (data) => {
  return await Event.create(data);
};

export const bulkInsert = async (events) => {
  return await Event.insertMany(events, { ordered: false });
};

export const getLatest = async (limit = 100) => {
  return await Event.find()
    .sort({ createdAt: -1 })
    .limit(limit);
};
 