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
      resolve: { fallback: { fs: 'empty' } },
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/products/:id') {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/products/:id';
    createPage(page);
  }
};
