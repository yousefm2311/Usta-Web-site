import mongoose from "mongoose";

const StaticPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    contentType: { type: String, enum: ["markdown", "html"], default: "markdown" }
  },
  { timestamps: true }
);

export default mongoose.models.StaticPage || mongoose.model("StaticPage", StaticPageSchema);
