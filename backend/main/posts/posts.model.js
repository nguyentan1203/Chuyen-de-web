const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostsSchema = new Schema(
  {
    User_Ref: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    Applies_Ref: {
      type: [Schema.Types.ObjectId],
      ref: "applies",
    },
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Content: { type: String, default: "" },
    Status: {
      type: String,
      enum: ["draft", "published", "deleted"],
      default: "draft",
    },
    RequireContent: { type: String, default: "" },
    BenefitContent: { type: String, default: "" },
    JobType: { type: String, default: "" },
    JobSalary: { type: Number, default: "" },
    JobLevel: { type: String, default: "" },
    JobExperience: { type: String, default: "" },
    JobCareer: { type: String, default: "" },
  },
  {
    collection: "posts",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = PostsModel;
