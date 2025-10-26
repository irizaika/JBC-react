export const toLookupMap = (
  items = [],
  key = "id",
  value = "name",
  includeNotSet = true
) => {
  const base = includeNotSet ? { null: "Not Set" } : {};

  if (!Array.isArray(items)) return base;

  return items.reduce((acc, item) => {
    if (!item)  return acc; // skip invalid/null keys
    acc[item[key]] = item[value] ?? "Unknown"; // fallback label
    return acc;
  }, base);
};

export const toSelectOptions = (
  items = [],
  valueKey = "id",
  labelKey = "name",
  includeNotSet = true
) => {
  const base = includeNotSet ? [{ value: null, label: "Not Set" }] : [];

  if (!Array.isArray(items)) return base;

  return [
    ...base,
    ...items
     // .filter((i) => i && i[valueKey] != null) // skip invalid/null
      .map((i) => ({
        value: i[valueKey],
        label: i[labelKey] ?? "Unknown",
      })),
  ];
};
