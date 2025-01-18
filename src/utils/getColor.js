export const getColor = (value) => {
    if (value < 0) return '#FF5733'; // Red for negative values (refunds)
    if (value > 0) return '#33FF57'; // Green for positive values (sales, net P/L)
    return '#FFCC00'; // Yellow for zero or neutral
  };
  