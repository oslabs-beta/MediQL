const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const queryRespRouter = require("./routes/queryRespRoute");
const QueryRes = require("./models/queryResModel");

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
//     schema,
//     context: data,
//     graphiql: true,
//   })
// )

//frontend fetches this route for queryResp stored in our database
app.use("/queryResp", queryRespRouter);

//queryResponseReceiver
app.use("/queryRespReceiver", async (req, res) => {
  console.log("reqbody: ", req.body);
  const savedData = await QueryRes.create({ response: req.body });
  console.log("saved in DB: ", savedData)
  res.json(req.body);
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
