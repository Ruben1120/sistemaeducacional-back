require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.set('trust proxy', true);
app.use(cors({origin: [process.env.urlapp]}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const server = app.listen(process.env.port);