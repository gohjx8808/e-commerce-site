module.exports = {
  siteMetadata: {
    title: 'eCommerceSite',
    titleTemplate: '%s | The Real Ecommerce Site',
    description:
      'Hogwarts Potions master, Head of Slytherin house and former Death Eater.',
    url: 'https://www.jxapp.ecommercesite.com', // No trailing slash allowed!
    image: '/images/snape.jpg', // Path to your image you placed in the 'static' folder
    twitterUsername: '@jxapp',
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet', {
      resolve: 'gatsby-source-stripe',
      options: {
        objects: ['Price', 'Product'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
