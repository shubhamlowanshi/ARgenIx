import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      index: true
    },

    value: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["NEW", "PROCESSING", "DONE"],
      default: "NEW",
      index: true
    },

    meta: {
      type: Object,
      default: {}
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  }
);

// 🔥 PERFORMANCE INDEXES
eventSchema.index({ createdAt: -1 });
eventSchema.index({ source: 1, createdAt: -1 });

export default mongoose.model("Event", eventSchema);
