import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// Use OrderProvider to put state at higher level / persist state on lower level
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
