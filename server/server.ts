import { NextFunction, Response, Request } from "express";
import express from "express";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { transformData } from "../server/helpers/transformData";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
const SECRET = uuidv4();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = process.env.MONGODB_URI;
const PORT = 3000;


//Models
import QueryRes from "./models/queryResModel";
import OriginResp from "./models/originRespModel";

//Mongoose
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

mongoose
  .connect(`${db}`)
  .then(() => {
    console.log("Connected to DB ✅");
    QueryRes.watch().on("change", async (data) => {
      const latestDoc = await QueryRes.findOne({ id: SECRET }).sort({
        _id: -1,
      });

      if (data.operationType === "insert" && latestDoc) {
        const newDoc = await transformData(latestDoc?.response.queryResp.data);
        io.emit("newDoc", newDoc);
        await QueryRes.deleteMany({ id: SECRET });
        await OriginResp.deleteMany({ id: SECRET });
      }
    });
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client")));
app.use(cors());

//create mediqlSECRET
// app.post("/mediqlSECRET", async (req: Request, res: Response) => {
// 	//reqbody will contain 3900 or port given
// 	await fetch("http://localhost:3900/mediqlSecret", {
// 		method: "POST",
// 		body: JSON.stringify({ SECRET: SECRET }),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	}).then(() => {
// 		console.log("SECRET sent: ", SECRET);
// 		console.log("SECRET type: ", typeof SECRET);
// 	});
// 	res.status(200).send("thank you AGAIN");
// });
// app.post("/mediqlSECRET", async (req: Request, res: Response) => {
// 	//reqbody will contain 3900 or port given
// 	await fetch("http://localhost:3900/mediqlSecret", {
// 		method: "POST",
// 		body: JSON.stringify({ SECRET: SECRET }),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	}).then(() => {
// 		console.log("SECRET sent: ", SECRET);
// 		console.log("SECRET type: ", typeof SECRET);
// 	});

// 	res.status(200).send("thank you AGAIN");
// });


//Gets response from graphiql and sends to DB in /queryRespReceiver
app.post("/queryRespReceiver", async (req: Request, res: Response) => {
	const savedData = await QueryRes.create({ id: SECRET, response: req.body });
	res.json(req.body.queryResp);
});

//originalResponseReceiver
app.post("/originalRespReceiver", async (req: Request, res: Response) => {
	const { parentNode } = req.body;
	await OriginResp.create({ id: SECRET, response: req.body });
	res.json(req.body);
});

// catch-all route handler for any requests to an unknown route
app.use((req: Request, res: Response) =>
	res.status(404).send("Page not found, please check your URL endpoints!")
);

// express error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	const defaultErr = {
		log: "Express error handler caught unknown middleware error",
		status: 500,
		message: { err: err },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	return res.status(errorObj.status).json(errorObj.message);
});

io.on("connection", async (socket) => {
	console.log("A user connected");

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default SECRET;
