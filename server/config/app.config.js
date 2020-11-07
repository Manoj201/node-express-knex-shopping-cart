"use strict";

import commonConfig from "./env/common";
const config = require("./env/" + process.env.NODE_ENV) || {};

const envConfigs = config.default;

export default {
  ...commonConfig,
  ...envConfigs,
};
