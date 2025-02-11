import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    content: {
      type: String,
    },
    media: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
