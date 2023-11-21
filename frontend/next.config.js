// next.config.js
// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.node$/,
//       use: 'node-loader',
//     });

//     return config;
//   },
// };

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /canvas.node$/,
      // test: /\.node$/,
      use: [
          {
              loader: 'node-loader',
              options: {
                  name: '[name].[ext]',
              },
          },
      ],
    });
    return config;
  },
};


