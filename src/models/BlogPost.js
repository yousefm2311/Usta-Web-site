import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    contentType: { type: String, enum: ["markdown", "html"], default: "markdown" },
    coverImageUrl: { type: String, default: "" },
    tags: { type: [String], default: [] },
    author: { type: String, default: "فريق Usta" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

BlogPostSchema.index({ published: 1, publishedAt: -1 });

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
