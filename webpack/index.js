module.exports = (env = {}) => {
  const mode = env.production ? 'prod' : 'dev';
  return require(`./webpack.${mode}`)();
};
