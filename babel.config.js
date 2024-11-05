module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@constants': './constants',
            '@assets': './assets',
            '@data': './data',
            '@hooks': './hooks',
            '@scripts': './scripts',
            '@utils': './utils',
            '@lib': './lib'
          },
        },
      ],
    ],
  };
};
