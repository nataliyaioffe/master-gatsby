import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

// *************************** //
// *************************** //
// This template is used to create pages from eacn pizza queried for in AllSanityPizzas via GraphQL
// The createPage functionality can be viewed in gatsby-node.js
// *************************** //
// *************************** //

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}

// Query is dynamic based on the slug passed in through Context when page was created (see turnPizzasIntoPages in gatsby-node.js)
// This query could also live in gatsby-node within the turnPizzasIntoPages function. Pros/Cons:
// // Pro: Only need to query one time (in gatsby-node). Every page will use this query.
// // Con: Anytime you need to change the query, you need to kill the serve process and rerun npm start
// When querying directly in the template like this, Pros/Cons:
// // Pro: When you query in the template directly, query modifications are immediately hot reloaded, no need to restart
// // Con: Additional query.
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
