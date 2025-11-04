/**
 * Transforms backend report data into Nivo Pie chart format.
 * 
 * @param {Array} data - Array of backend objects
 * @param {Object} options - Optional field mappings and config
 * @param {string} [options.idField="partnerName"] - Which field to use as id/label
 * @param {string} [options.valueField="totalJobs"] - Which field to use as value
 * @returns {Array} Transformed array ready for Nivo PieChart
 */
export const transformPartnerInfoToPieData = (data, options = {}) => {
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

/**
 * Transforms backend PartnerJobSummaryDto data into Nivo Bar chart format.
 *
 * X-axis: Partner (PartnerName)
 * Y-axis: Total amounts (TotalPayReceived, ContractorCost, Profit)
 *
 * @param {Array} data - Array of PartnerJobSummaryDto objects
 * @returns {Array} Transformed array ready for Nivo BarChart
 */
export const transformPartnerInfoToBarData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    partner: item.partnerName || "Unassigned",
    "Pay Received": Number(item.totalPayReceived ?? 0),
    "Contractor Cost": Number(item.totalContractorCost ?? 0),
    "Profit": Number(item.totalPayReceived - item.totalContractorCost ?? 0),
  }));
};


export const transformContractorPartnerBarData = (data) => {
  const partners = [...new Set(data.flatMap(d => d.partnerJobList.map(p => p.name)))];

  return {
    keys: partners,
    barData: data.map(d => {
      const row = { Contractor: d.contractorName };
      d.partnerJobList.forEach(p => {
        row[p.name] = p.count;
      });
      return row;
    })
  };
};
