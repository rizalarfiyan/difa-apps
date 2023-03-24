const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    'builder': '@storybook/builder-webpack5'
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@lib': path.resolve(__dirname, '../src/lib'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    };
    return config;
  },
}
