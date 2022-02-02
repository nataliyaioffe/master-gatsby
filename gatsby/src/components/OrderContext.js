import React, { useState } from 'react';

// create an order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // Create state
  const [order, setOrder] = useState([]);

  return (
    // If you want to surface the state at a higher level, you must pass it as value to provider
    // See gatsby-browser.js / gatsby-ssr.js
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
