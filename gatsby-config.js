module.exports = {
  siteMetadata: {
    title: 'yjArtJournal',
    titleTemplate: '%s | The Handmade Cottage',
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
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'YJ Art Journal',
        description: 'Crochet and drawings are made with love.',
        lang: 'en',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        forceFullSync: true,
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        devMode: true,
      },
    },
    'gatsby-plugin-csp',
  ],
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
