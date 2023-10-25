const { withKumaUI } = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
module.exports = withKumaUI({
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (dev) {
      config.watchOptions = {
        followSymlinks: true,
      };

      config.snapshot.managedPaths = [];
    }

    return config;
  },
});
