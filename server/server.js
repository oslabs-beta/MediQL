const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

require("dotenv").config();
const queryRespRouter = require("./routes/queryRespRoute");
const originRespRouter = require("./routes/originRespRoute");
const QueryRes = require("./models/queryResModel");
const OriginResp = require("./models/originRespModel");

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://OSP:417918@cluster0.bzy9avm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB ✅");
  })
  .catch(console.error);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, "../client")));

// graphQL
// app.use('/graphql',
//   graphqlHTTP({
//     schema: executableSchema,
//     context: data,
//     graphiql: true,
//   })
// )
//frontend fetches this route for originResp stored in our database
app.use("/originResp", originRespRouter);

//frontend fetches this route for queryResp stored in our database
app.use("/queryResp", queryRespRouter);

//queryResponseReceiver
app.use("/queryRespReceiver", async (req, res) => {
  // console.log("reqbody query response: ", req.body);
  const savedData = await QueryRes.create({ response: req.body });
  // console.log("query resp saved in DB: ", savedData)
  res.json(req.body);
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

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("Page not found, please check your URL endpoints!")
);
 
// express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

//listen to port
app.listen(PORT, console.log(`Server running on port ${PORT}`));
