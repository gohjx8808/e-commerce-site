require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    title: "yjArtJournal",
    titleTemplate: "%s | The Handmade Cottage",
    description: "Crochet and drawings are made with love.",
    url: "https://www.yjartjournal.com", // No trailing slash allowed!
    siteUrl: "https://www.yjartjournal.com", // for sitemap, DO NOT DELETE!
    lang: "en",
    author: "@yj_artjournal",
    keywords: "yjartjournal, art, craft, crochet, drawings",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.yjartjournal.com/",
        sitemap: "https://www.yjartjournal.com/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "YJ Art Journal",
        description: "Crochet and drawings are made with love.",
        lang: "en",
        start_url: "/",
        display: "standalone",
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-csp",
      options: {
        mergeStyleHashes: false,
        mergeScriptHashes: false,
        directives: {
          "script-src":
            "'self' 'unsafe-inline' https://*.firebasedatabase.app https://apis.google.com https://connect.facebook.net https://www.googletagmanager.com https://static.cloudflareinsights.com https://cdn.mouseflow.com",
          "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src":
            "'self' data: http://images.ctfassets.net/ https://www.facebook.com",
          "connect-src":
            "'self' wss://*.firebasedatabase.app https://www.googleapis.com https://securetoken.googleapis.com https://www.facebook.com https://web.facebook.com/ https://www.google-analytics.com https://cloudflareinsights.com https://o2.mouseflow.com https://send-checkout-email.gohjx8808.workers.dev https://send-feedback-email.gohjx8808.workers.dev https://yjartjournal-api.vercel.app",
          "frame-src":
            "'self' https://*.firebasedatabase.app https://apis.google.com https://*.firebase https://www.facebook.com https://web.facebook.com/ https://m.me/ https://m.facebook.com/",
          "font-src": "'self' data: https://fonts.gstatic.com",
        },
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#f5dbc9",
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@utils": "src/utils",
          "@modules": "src/modules",
          "@contextProvider": "src/contextProvider",
          "@styledComponents": "src/styledComponents",
          "@sharedComponents": "src/sharedComponents",
          "@hooks": "src/hooks",
          "@layouts": "src/layouts",
        },
        extensions: ["ts"],
      },
    },
  ],
};
