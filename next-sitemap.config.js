/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || "https://localhost:3000",
  generateRobotsTxt: true // (optional)
  // ...other options
};


// NOTE : GENERATE SITEMAP AT TIME YOU NEED TO DO THIS :
// 1. npm run build
// 2. npm run sitemap    