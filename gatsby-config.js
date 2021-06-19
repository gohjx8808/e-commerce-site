module.exports = {
  siteMetadata: {
    title: 'yjArtJournal',
    titleTemplate: '%s | Handmade with Love',
    description:
      'Crochet and drawings are made with love.',
    url: 'https://yjartjournal.gtsb.io', // No trailing slash allowed!
    siteUrl: 'https://yjartjournal.gtsb.io',
    image: '/images/snape.jpg', // Path to your image you placed in the 'static' folder
    twitterUsername: '@yj_artjournal',
    lang: 'en',
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-material-ui',
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
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
  ],
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
