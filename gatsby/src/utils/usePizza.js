import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create state to hold our order

  // We got rid of this line b/c we moved useState up to the provider
  // See gatsby-browser.js / gatsby-ssr.js / OrderContext.js
  // const [order, setOrder] = useState([]);

  // Now we access both our state and state updater function via context
  const [order, setOrder] = useContext(OrderContext);

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everythihng after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // gather all the submitted data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };

    // 4. Send this data to a serverless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    console.log(res);

    const text = JSON.parse(await res.text());

    // If it didn't work...
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      // Sent from serverside
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
