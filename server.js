import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './core/logger/app-logger';
import morgan from 'morgan';
import config from './core/config/config.dev';
import cars from './routes/cars.route';
import deployments from './routes/deployments.route';

import connectToDb from './db/connect';

const port = config.serverPort;
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/cars', cars);
app.use('/deployments', deployments);


app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

app.listen(port, () => {
  logger.info('server started - ', port);
});
