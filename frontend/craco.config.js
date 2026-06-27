// craco.config.js
const path = require("path");
require("dotenv").config();

// Check if we're in development/preview mode (not production build)
// Craco sets NODE_ENV=development for start, NODE_ENV=production for build
const isDevServer = process.env.NODE_ENV !== "production";

// Environment variable overrides
const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
};

// Conditionally load health check modules only if enabled
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

let webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {

      // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
        ],
      };

      // This is a pure JavaScript project — drop CRA's TypeScript checker
      // (fork-ts-checker-webpack-plugin) and the ESLint webpack plugin so we
      // don't pull in an old `schema-utils@2` + `ajv@6` chain that crashes on
      // Node 20+ ("Cannot read properties of undefined (reading 'date')").
      if (Array.isArray(webpackConfig.plugins)) {
        webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
          const name = plugin && plugin.constructor && plugin.constructor.name;
          return name !== 'ForkTsCheckerWebpackPlugin' && name !== 'ESLintWebpackPlugin';
        });
      }

      // Add health check plugin to webpack if enabled
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }
      return webpackConfig;
    },
  },
};

webpackConfig.devServer = (devServerConfig) => {
  // Compatibility shim for webpack-dev-server v5 (react-scripts uses v4 API).
  // Remove/translate deprecated options that throw in v5.
  const onBefore = devServerConfig.onBeforeSetupMiddleware;
  const onAfter = devServerConfig.onAfterSetupMiddleware;
  delete devServerConfig.onBeforeSetupMiddleware;
  delete devServerConfig.onAfterSetupMiddleware;

  // `https` -> `server: { type: 'https', options }`
  if (devServerConfig.https !== undefined) {
    if (devServerConfig.https && typeof devServerConfig.https === 'object') {
      devServerConfig.server = { type: 'https', options: devServerConfig.https };
    } else if (devServerConfig.https) {
      devServerConfig.server = 'https';
    }
    delete devServerConfig.https;
  }

  const existingSetupMiddlewares = devServerConfig.setupMiddlewares;
  devServerConfig.setupMiddlewares = (middlewares, devServer) => {
    if (onBefore) onBefore(devServer);
    if (existingSetupMiddlewares) {
      middlewares = existingSetupMiddlewares(middlewares, devServer);
    }
    if (onAfter) onAfter(devServer);

    if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
      setupHealthEndpoints(devServer, healthPluginInstance);
    }
    return middlewares;
  };

  return devServerConfig;
};

// Wrap with visual edits (automatically adds babel plugin, dev server, and overlay in dev mode)
if (isDevServer) {
  try {
    const { withVisualEdits } = require("@emergentbase/visual-edits/craco");
    webpackConfig = withVisualEdits(webpackConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND' && err.message.includes('@emergentbase/visual-edits/craco')) {
      console.warn(
        "[visual-edits] @emergentbase/visual-edits not installed — visual editing disabled."
      );
    } else {
      throw err;
    }
  }
}

module.exports = webpackConfig;
