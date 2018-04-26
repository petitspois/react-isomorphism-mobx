
import path from 'path';
import express from 'express';
import http from 'http';
import api from './router/api'
const app = express();
const port = process.env.port || 3000



app.set('views', path.join(__dirname, '../views/www/'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../dist')));




app.use('/api', api);


app.use((req, res, next) => {
    require('../client/server-render')(req, res, next);
});


app.listen(port)
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)

