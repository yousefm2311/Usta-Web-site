const parseHexColor = (value) => {
  if (typeof value !== "string") return null;
  let hex = value.trim();
  if (!hex.startsWith("#")) return null;
  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }
  if (hex.length !== 6) return null;
  const intValue = Number.parseInt(hex, 16);
  if (Number.isNaN(intValue)) return null;
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
};

const isDarkColor = (value) => {
  const rgb = parseHexColor(value);
  if (!rgb) return false;
  return getLuminance(rgb) < 0.45;
};

const getLuminance = (input) => {
  const rgb = typeof input === "string" ? parseHexColor(input) : input;
  if (!rgb) return null;
  const toLinear = (channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * toLinear(rgb.r) +
    0.7152 * toLinear(rgb.g) +
    0.0722 * toLinear(rgb.b)
  );
};

const isBrightColor = (value, threshold = 0.9) => {
  const luminance = getLuminance(value);
  if (luminance === null) return false;
  return luminance > threshold;
};

const ensureMinLuminance = (value, min, fallback) => {
  const luminance = getLuminance(value);
  if (luminance === null || luminance < min) return fallback;
  return value;
};

const getThemeMode = (tokens) => {
  const surface = tokens?.surface || tokens?.background || "#ffffff";
  return isDarkColor(surface) ? "dark" : "light";
};

const normalizeThemeTokens = (tokens = {}) => {
  const nextTokens = { ...tokens };
  const surface = tokens?.surface || tokens?.background || "#ffffff";
  if (!isDarkColor(surface)) {
    return nextTokens;
  }

  nextTokens.background = tokens.background || surface;
  nextTokens.surface = tokens.surface || surface;
  nextTokens.text = ensureMinLuminance(tokens.text, 0.72, "#e2e8f0");
  nextTokens.muted = ensureMinLuminance(tokens.muted, 0.55, "#94a3b8");
  nextTokens.border = ensureMinLuminance(tokens.border, 0.22, "#1f2937");
  if (!parseHexColor(tokens.gradientFrom)) {
    nextTokens.gradientFrom = surface;
  }
  if (!parseHexColor(tokens.gradientTo)) {
    nextTokens.gradientTo = surface;
  }

  return nextTokens;
};

export { getLuminance, getThemeMode, isBrightColor, isDarkColor, normalizeThemeTokens, parseHexColor };
