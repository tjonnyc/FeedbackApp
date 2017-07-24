const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.hot.reload.config');
const chalk = require('chalk');

const app       = express();
const compiler  = webpack(config);


app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(hotMiddleware(compiler));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(
    `
      =====================================================
      -> Server (${chalk.bgBlue('Hot reload')}) 🏃 (running) on ${chalk.green('localhost')}:${chalk.green('3000')}
      =====================================================
    `
  );
});