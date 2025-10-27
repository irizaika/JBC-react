export const isWeekend = (date) => {
  const d = new Date(date);
  return [0, 6].includes(d.getDay());
};

export const formatPay = (value) => 
  value != null ? `£${value.toFixed(2)}` : "£0.00";
