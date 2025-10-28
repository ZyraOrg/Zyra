/** Next.js config: restrict page extensions to TypeScript so existing JS files are ignored */
module.exports = {
  pageExtensions: ['tsx', 'ts']
};

// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://zyra.fund" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
