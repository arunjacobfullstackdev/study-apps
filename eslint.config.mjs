import apiConfig from "./apps/api/eslint.config.js";
import docsConfig from "./apps/docs/eslint.config.js";
import webConfig from "./apps/web/eslint.config.js";
import uiConfig from "./packages/ui/eslint.config.mjs";

const scopeConfig = (configs, files, settings = {}) =>
  configs.map((config) => ({
    ...config,
    files,
    settings: {
      ...config.settings,
      ...settings,
    },
  }));

export default [
  ...scopeConfig(apiConfig, ["apps/api/**/*.{js,jsx,ts,tsx,mjs,cjs}"]),
  ...scopeConfig(docsConfig, ["apps/docs/**/*.{js,jsx,ts,tsx,mjs,cjs}"], {
    next: { rootDir: "apps/docs" },
  }),
  ...scopeConfig(webConfig, ["apps/web/**/*.{js,jsx,ts,tsx,mjs,cjs}"], {
    next: { rootDir: "apps/web" },
  }),
  ...scopeConfig(uiConfig, ["packages/ui/**/*.{js,jsx,ts,tsx,mjs,cjs}"]),
];
