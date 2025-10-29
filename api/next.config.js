/** Next.js config: restrict page extensions to TypeScript so existing JS files are ignored */
module.exports = {
  pageExtensions: ['tsx', 'ts']
};

// next.config.js
// Allow localhost origins during development to avoid CORS blocks.
// In production we keep the allowed origin restricted to the site.
const nextConfig = {
  async headers() {
    const allowOrigin = process.env.NODE_ENV === 'production' ? 'https://zyra.fund' : '*';
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: allowOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
