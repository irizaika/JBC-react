/**
 * Transforms backend report data into Nivo Pie chart format.
 * 
 * @param {Array} data - Array of backend objects
 * @param {Object} options - Optional field mappings and config
 * @param {string} [options.idField="partnerName"] - Which field to use as id/label
 * @param {string} [options.valueField="totalJobs"] - Which field to use as value
 * @returns {Array} Transformed array ready for Nivo PieChart
 */
export const transformToPieData = (data, options = {}) => {
  const {
    idField = "partnerName",
    valueField = "totalJobs",
  } = options;

  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    id: String(item[idField] ?? `Custom ${index + 1}`),
    label: String(item[idField] ?? `Custom ${index + 1}`),
    value: Number(item[valueField] ?? 0),
    color: `hsl(${(index * 50) % 360}, 70%, 50%)`, // auto-color
  }));
};
