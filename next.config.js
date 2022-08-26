/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  pwa: {
    dest: "public",
    runtimeCaching
  }
};

// TODO withPWA adding like below comment example
// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     runtimeCaching
//   }
// });
