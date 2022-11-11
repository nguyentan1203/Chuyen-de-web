const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppliesSchema = new Schema(
  {
    User_Ref: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    Posts_Ref: {
      type: [Schema.Types.ObjectId],
      ref: "applies",
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      trim: true,
    },
    CurriculumVitae: { type: String, required: true },
    Description: { type: String, default: "" },
  },
  {
    collection: "applies",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const AppliesModel = mongoose.model("applies", AppliesSchema);
module.exports = AppliesModel;
