module.exports = {
  siteMetadata: {
    title: "eCommerceSite",
  },
  plugins: ["gatsby-plugin-gatsby-cloud"],
};

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
