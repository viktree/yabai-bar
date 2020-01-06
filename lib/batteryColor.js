const USE_BASE_TEN = 10;

const computeBatteryColor = data => {
  const level = parseInt(data, USE_BASE_TEN);
  if (level > 90) return "#A1BA89";
  if (level > 50) return "#7D837B";
  if (level > 15) return "#87A0B2";
  if (level > 5) return "#F2C57C";
  return "#E57373";
};

export default computeBatteryColor;
