const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /redux-state-sync/,
            use: loaders.null(),
          },
        ],
      },
      plugins: [new NodePolyfillPlugin()],
      resolve: { fallback: { fs: 'empty' } },
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/') {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/*';
    createPage(page);
  }
};
