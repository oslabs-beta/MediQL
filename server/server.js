const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const mongoose = require('mongoose');

const queryRespRouter = require('./routes/queryRespRoute');
const QueryRes = require('./models/queryResModel');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

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

// queryResponseReceiver --> Commented out
app.use('/queryRespReceiver', async (req, res) => {
  console.log('reqbody: ', req.body);
  const savedData = await QueryRes.create({ response: req.body });
  console.log('saved in DB: ', savedData);

  // const io = req.app.get('socket.io');

  io.on('connection', (socket) => {
    socket.emit('connected inside of query resp');
    // console.log('connected inside of query resp');
  });

  //req.body.queryResp.Data.Movie
  const itemToSend = req.body.queryResp;

  console.log('queryResp: --->', req.body.queryResp);

  // io.on('connection', (socket) => {
  //   console.log('hello im connected sir');

  //   socket.on('data', (data) => {
  //     console.log('data', data);
  //   });
  //   socket.emit('whaaaaatup');
  // });

  res.json('we got it');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// const express = require('express');
// const http = require('http');
// const app = express();
// const server = http.createServer(app);
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('A client has connected to the server!');
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

// const app = require('express')();
// const httpServer = require('http').createServer(app);
// const options = {
//   /* ... */
// };
// const io = require('socket.io')(httpServer, options);

// io.on('connection', (socket) => {
//   /* ... */
// });

// httpServer.listen(3000);

// const express = require('express');
// const app = express();

// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });
// io.on('connection', (socket) => {
//   // send a message to the client
//   console.log('Inside the connection');
//   socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) });

//   // receive a message from the client
//   socket.on('hello from client', (...args) => {
//     // ...
//   });
// });

// httpServer.listen(3000, console.log('hello'));

// // const { createServer } = require('http');
// // const { Server } = require('socket.io');

// // const io = new Server(httpServer, {
// //   path: '/queryRespReceiver'
// // })
// const path = require('path');
// const mongoose = require('mongoose');
// const { graphqlHTTP } = require('express-graphql');
// require('dotenv').config();
// const queryRespRouter = require('./routes/queryRespRoute');
// const QueryRes = require('./models/queryResModel');

// const cors = require('cors');
// const express = require('express');
// const app = express();
// const http = require('http');
// const httpServer = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// const PORT = process.env.PORT || 3000;

// httpServer.listen(PORT, console.log(`Server running on port ${PORT}`));
// io.on('connection', (socket) => {
//   console.log('we are connected');
// });

// // const server = app.listen(PORT, () =>
// //   console.log(`listening on port : ${PORT}`)
// // );

// app.set('socket.io', io);
// // const http = require('http').createServer(app);
// // const io = require('socket.io')(http);

// // Database Connection

// mongoose.set('strictQuery', false);

// mongoose
//   .connect(
//     'mongodb+srv://OSP:417918@cluster0.bzy9avm.mongodb.net/?retryWrites=true&w=majority'
//   )
//   .then(() => {
//     console.log('Connected to DB ✅');
//   })
//   .catch(console.error);

// // Express connection

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // handle requests for static files
// app.use(express.static(path.resolve(__dirname, '../client')));

// // // WebSocket Setup

// // // // graphQL
// // // app.use(
// // //   '/graphql',
// // //   graphqlHTTP({
// // //     graphiql: true,
// // //   })
// // // );

// // //insert another website into localhost 8080 on the side
// // // fetch another website
// // // display website in div
// // // implementation for MVP purposes

// // //frontend fetches this route for queryResp stored in our database

// // // COMMENTED THIS LINE OUT TO JUST TEST WEBSOCKET -> DONT KNOW IF WE NEED THIS
// // // app.use('/queryResp', queryRespRouter);

// // queryResponseReceiver --> Commented out
// app.use('/queryRespReceiver', async (req, res) => {
//   console.log('reqbody: ', req.body);
//   const savedData = await QueryRes.create({ response: req.body });
//   console.log('saved in DB: ', savedData);

//   const io = req.app.get('socket.io');
//   //req.body.queryResp.Data.Movie
//   const itemToSend = req.body.queryResp;
//   console.log('queryResp: --->', req.body.queryResp);
//   io.on('connection', (socket) => {
//     console.log('hello im connected sir');

//     socket.on('data', (data) => {
//       console.log('data', data);
//     });
//     socket.emit('whaaaaatup');
//   });
//   res.json('we got it');
// });

// // // io.on('connection', (socket)=>{
// // //   console.log('a user connected');

// // //   socket.on('message', (data)=>{
// // //     console.log('received message: ', data);
// // //     io.emit('message',data);
// // //   })

// // //   socket.on('disconnect', () => {
// // //     console.log('user disconnected')
// // //   })
// // // });

// // // catch-all route handler for any requests to an unknown route
// // app.use((req, res) =>
// //   res.status(404).send('Page not found, please check your URL endpoints!')
// // );

// // // express error handler
// // app.use((err, req, res, next) => {
// //   const defaultErr = {
// //     log: 'Express error handler caught unknown middleware error',
// //     status: 500,
// //     message: { err: 'An error occurred' },
// //   };
// //   const errorObj = Object.assign({}, defaultErr, err);
// //   return res.status(errorObj.status).json(errorObj.message);
// // });

// // //listen to port
// // app.listen(PORT, console.log(`Server running on port ${PORT}`));
