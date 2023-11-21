import React from 'react';

const PriceFormatter = ({ price }) => {
  // Function to format the price with commas
  const formatPriceWithCommas = (price) => {
    // Use regular expressions to add commas to the price
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span>
      {formatPriceWithCommas(price)} {/* Display the formatted price */}
    </span>
  );
};

export default PriceFormatter;
