import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of whisky"],
  },
  type: {
    type: String,
    enum: {
      values: [
        "blended whisky",
        "single malt",
        "blended malt",
        "grain whisky",
        "bourbon",
      ],
      message:
        "Your type of whisky is not supported! Please choose one: blended whisky, single malt, blended malt, grain whisky or bourbon.",
    },
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  description: {
    type: String,
    maxlength: [
      1000,
      "The description should contain less than 1000 characters",
    ],
  },
  rating: {
    type: Number,
    max: [100, "The rating should be between 51 and 99"],
    min: [51, "The rating should be between 51 and 99"],
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
});

export default mongoose.model("Note", NoteSchema);
