import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    //   Get the pizza by selected pizza item ID
    const pizza = pizzas.find((pizza) => pizza.id === item.id);

    // return more details about the pizza for the order details
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
