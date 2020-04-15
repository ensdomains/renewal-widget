
export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";
  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;
  // let { index } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
  // config.plugins.splice(index, 1)

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};
