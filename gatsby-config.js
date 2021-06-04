module.exports = {
  siteMetadata: {
    title: 'eCommerceSite',
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet', {
      resolve: 'gatsby-source-stripe',
      options: {
        objects: ['Price'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
  ],
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
