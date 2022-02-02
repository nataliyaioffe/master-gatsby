import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: 'https://gatsby.pizza',
    desecription: 'The best pizza place in Hamilton!',
    twitter: '@slicksSlices',
  },
  plugins: [
    //  1. Styled components plugin
    'gatsby-plugin-styled-components',
    //  2. Helmet plugin
    'gatsby-plugin-react-helmet',
    //  3 Sanity plugin
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '9x47ybt0',
        dataset: 'production',
        // When in dev, change in sanity cms, as you save, gatsby is rebuilt, real time editing experience
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
