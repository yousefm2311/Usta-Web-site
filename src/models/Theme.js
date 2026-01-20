import mongoose from "mongoose";

const ThemeTokensSchema = new mongoose.Schema(
  {
    primary: { type: String, required: true },
    primaryLight: { type: String, required: true },
    primaryDark: { type: String, required: true },
    accent: { type: String, default: "" },
    background: { type: String, required: true },
    surface: { type: String, required: true },
    text: { type: String, required: true },
    muted: { type: String, required: true },
    border: { type: String, required: true },
    gradientFrom: { type: String, required: true },
    gradientTo: { type: String, required: true },
    radius: { type: String, default: "24px" },
    ring: { type: String, default: "rgba(59, 130, 246, 0.25)" },
    fontFamily: { type: String, default: "" }
  },
  { _id: false }
);

const ThemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tokens: { type: ThemeTokensSchema, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Theme || mongoose.model("Theme", ThemeSchema);
