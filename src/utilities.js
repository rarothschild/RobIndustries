import Config from "./utilities.config.cjs";

const getCategoryColour = (name) => {
  var defaultColor = Config.categorySettings?.color ?? "btn-primary";
  if (Config.categories) {
    const categoryColors = Object.assign(
      {},
      ...Config.categories.map((x) => ({
        [x.name.toLowerCase()]: x.color ?? defaultColor,
      }))
    );
    return categoryColors[name.toLowerCase()] ?? defaultColor;
  }
  return defaultColor;
};

export { getCategoryColour };