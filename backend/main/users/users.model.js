const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    Posts_Ref: {
      type: [Schema.Types.ObjectId],
      ref: "posts",
    },
    Applies_Ref: {
      type: [Schema.Types.ObjectId],
      ref: "applies",
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      trim: true,
    },
    Password: { type: String, required: true },
    Role: {
      type: String,
      default: "member",
      enum: ["admin", "member"],
    },
    Status: {
      type: String,
      default: "active",
      enum: ["active", "banned"],
    },
  },
  {
    collection: "users",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UsersModel = mongoose.model("users", UsersSchema);
module.exports = UsersModel;
