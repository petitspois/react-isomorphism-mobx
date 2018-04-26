
import chokidar from 'chokidar';
import path from 'path';
import config from '../webpack/webpack.dev.config';
import express from 'express';
import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import api from './router/api'
const compiler = webpack(config);
const app = express();


app.set('views', path.join(__dirname, '../views/www/'));
app.set('view engine', 'ejs');


app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath, serverSideRender: true
}));

app.use(webpackHotMiddleware(compiler));


app.use('/api', api);


app.use((req, res, next) => {
    require('../client/server-render')(req, res, next);
});


const watcher = chokidar.watch('./client');
watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("===============Clearing /server/ module cache from server========================");
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]client[\/\\]/.test(id)){
              delete require.cache[id];
        }
      });
    });
});


const server = http.createServer(app);
server.listen(3000, '0.0.0.0', function (err) {
    if (err) throw err;

    const addr = server.address();

    console.log('Listening at http://%s:%d', addr.address, addr.port);
});

