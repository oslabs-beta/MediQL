import { NextFunction, Response, Request } from 'express';

import express from 'express';
import path from 'path';
import cors from 'cors';
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

//Routers
import queryRespRouter from './routes/queryRespRoute';

//Models
import QueryRes from './models/queryResModel';
import OriginResp from './models/originRespModel';

//Mongoose
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://OSP:417918@cluster0.bzy9avm.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to DB ✅');
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cors());

//frontend fetches this route for queryResp stored in our database
app.use('/queryResp', queryRespRouter);

//Gets response from graphiql and sends to DB in /queryRespReceiver
app.post('/queryRespReceiver', async (req: Request, res: Response) => {
  const savedData = await QueryRes.create({ response: req.body });
  res.json(req.body.queryResp);
});

//originalResponseReceiver
app.post('/originalRespReceiver', async (req: Request, res: Response) => {
  const { parentNode } = req.body;
  await OriginResp.create({ response: req.body });
  res.json(req.body);
});

// catch-all route handler for any requests to an unknown route
app.use((req: Request, res: Response) =>
  res.status(404).send('Page not found, please check your URL endpoints!')
);

// express error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
