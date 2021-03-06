import express from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import flash from 'express-flash';
import path from 'path';

// Create Express server
const app = express();

import HomeRouter from './router/home';

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.use('/', HomeRouter);

export default app;
