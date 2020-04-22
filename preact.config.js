
export default (config, env, helpers) => {
  config.entry = './index.js'
  config.output.library = 'RenewalWidget'
  config.output.libraryTarget = 'umd'
  config.output.libraryExport = 'default' 

  delete config.entry.polyfills;
  config.output.filename = "bundle.js";
  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    let { index } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
    config.plugins.splice(index, 1)
  
    config.output.libraryTarget = "umd";
  }
};
