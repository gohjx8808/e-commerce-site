const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({ plugins: [new NodePolyfillPlugin()] });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/') {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/*';
    createPage(page);
  }
};
