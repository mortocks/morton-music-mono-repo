if (!process.env.ADMIN_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables ADMIN_API_URL.
  `);
}
if (!process.env.SENDGRID_API_KEY) {
  throw new Error(`
    Please provide a valid Sendgrid key.
    Add to your environment variables SENDGRID_API_KEY.
  `);
}

console.log(process.env.ADMIN_API_URL);

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SNIPCART_PUBLIC_KEY: process.env.NEXT_PUBLIC_SNIPCART_PUBLIC_KEY,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      process.env.ADMIN_API_URL, //.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
  webpack(config, { isServer }) {
    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });
    return config;
  },
};
