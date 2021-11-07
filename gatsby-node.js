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
