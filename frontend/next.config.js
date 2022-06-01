// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

module.exports = {
  webpack: (config) => {
    // this is where you add custom configuration for webpack
    return config;
  },
  env: {
    HOST: "http://localhost:8080",
  },
  pwa: {
    // this where you add progressive web app setting
     dest: "public",
     swSrc: "service-worker.js",
    },
};
