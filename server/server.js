const express = require("express");
const path = require("path");
const cors = require('cors');
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

//Routers
const queryRespRouter = require("./routes/queryRespRoute");
const originRespRouter = require("./routes/originRespRoute");

//Models
const QueryRes = require("./models/queryResModel");
const OriginResp = require("./models/originRespModel");

//Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//Mongoose 
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb+srv://OSP:417918@cluster0.bzy9avm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {console.log('Connected to DB ✅');})
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

//Displays data on /queryRespReceiver 
app.get('/queryRespReceiver', async (req, res, next) => {  
  const data = await QueryRes.find({ });
  // console.log('data--->',data[2])
  // res.json(data);
  const parsed_data = data.map((item) => {
    return item.response?.queryResp;
  })
  res.json(parsed_data);
});

//Gets response from graphiql and sends to DB in /queryRespReceiver
app.use('/queryRespReceiver', async (req, res) => {
  console.log('reqbody: ', req.body);
  const savedData = await QueryRes.create({ response: req.body });
  // console.log('query resp saved in DB: ', savedData);

  // const io = req.app.get('socket.io');

  io.on("connection", (socket) => {
    console.log('connected inside of query resp');
    socket.emit('connected inside of query resp');
    socket.on("hello", (...args) =>{
      res.json(...args)
    })
  });

  //req.body.queryResp.Data.Movie
  // const itemToSend = req.body.queryResp;

  console.log('queryResp: --->', req.body.queryResp);
  res.json(req.body.queryResp);
});

//Displays data on /queryRespReceiver 
app.get('/originalRespReceiver', async (req, res, next) => {  
  const data = await OriginResp.find({ });
  // res.json(data);
  const parsed_data = data.map((item) => {
    return item.response;
  })
  res.json(parsed_data);
});

//originalResponseReceiver
app.use("/originalRespReceiver", async (req, res) => {
  // console.log("reqbody: ", req.body);
  const {parentNode} = req.body;
  //  console.log("parentNode: ", parentNode)
  await OriginResp.create({ response: {[`${parentNode}`]:req.body}});
  res.json(req.body);
  // //check for a database entry
  // const dbData = await OriginResp.findOne({});
  // //if no database entry exists, we create one with respective parentNode and body of information
  // if (!dbData){
  //   // await OriginResp.create({response: {[`${parentNode}`]:[req.body]}})
  //   await OriginResp.create({ response: { test: [{test:"test"}] } });
  // }
  // //if database entry already exists, aka not the first call, we will copy the entry and update it
  // else {
  //   //copy entry
  //   const copyData = {...dbData}
  //   console.log('copyData: ', copyData)
  //   //check the new ParentNode to see if it exists in database entry
  //   //if it does not have the parentNode, we will create it
  //   if(copyData._doc.response[`${parentNode}`] === undefined) {
  //     copyData._doc.response[`${parentNode}`] = [req.body];
  //     console.log('1 if: ', copyData)
  //     await OriginResp.findOneAndUpdate(copyData);
  //   } else {
  //   //if it already has the parentNode, we push it in
  //     copyData._doc.response[`${parentNode}`].push(req.body)
  //     //update database
  //     console.log("2 else: ", copyData);
  //     await OriginResp.findOneAndUpdate(copyData);
  //   }
  //   // const newArr = oldData.response[`${parentNode}`].push(req.body);
  //   // const savedData = await OriginResp.findOneAndUpdate({ response: {...oldData.response,[`${parentNode}`]:newArr} });
  //   res.json(req.body);
  // }
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send('Page not found, please check your URL endpoints!')
);

// express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});
 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});