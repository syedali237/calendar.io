import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true }, 
  summary: { type: String, required: true }, 
  start: { type: Date, required: true }, 
  end: { type: Date, required: true }, 
  location: { type: String }, 
  description: { type: String },
  hangoutLink: { type: String },
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
