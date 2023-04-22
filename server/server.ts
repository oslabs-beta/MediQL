import { NextFunction, Response, Request } from "express";
import express from "express";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { transformData } from "../server/helpers/transformData";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
const SECRET = uuidv4();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

//Routers
import queryRespRouter from "./routes/queryRespRoute";

//Models
import QueryRes from "./models/queryResModel";
import OriginResp from "./models/originRespModel";

//Mongoose
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

mongoose
	.connect(
		"mongodb+srv://noahtofte:TyYyosKlRzokadiJ@cluster0.n7mdrbm.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Connected to DB ✅");

		//   // Watch QueryRes collection for changes and emit the latest document to the client using socket.io
		//   QueryRes.watch().on('change', async (data) => {
		//     // store data in var
		//     const latestDoc = await QueryRes.findOne().sort({ _id: -1 });

		//     //delete db
		//     // await QueryRes.deleteMany({});
		//     //emit data from stored var
		//     const newDoc = await transformData(latestDoc?.response.queryResp.data);

		//     io.emit('newDoc', newDoc);
		//     // await QueryRes.deleteMany({});
		//     // await OriginResp.deleteMany({});
		//   });
		// })
		// .catch(console.error);

		QueryRes.watch().on("change", async (data) => {
			if (data.operationType === "insert") {
				const latestDoc = await QueryRes.findOne({ id: `${SECRET}` }).sort({
					_id: -1,
				});

				const newDoc = await transformData(latestDoc?.response.queryResp.data);
				io.emit("newDoc", newDoc);
				await QueryRes.deleteMany({});
				await OriginResp.deleteMany({});
			}
		});
	})
	.catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client")));
app.use(cors());

//create mediqlSECRET
app.post("/mediqlSECRET", async (req: Request, res: Response) => {
	//reqbody will contain 3900 or port given
	await fetch("http://localhost:3900/mediqlSECRET", {
		method: "POST",
		body: JSON.stringify({ SECRET: SECRET }),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(() => {
		console.log("SECRET sent: ", SECRET);
		console.log("SECRET type: ", typeof SECRET);
	});
	// await QueryRes.create({ id: SECRET, response: { hello: "world" } });
	// await OriginResp.create({ id: SECRET, response: { hello: "world" } });

	res.status(200).send("thank you AGAIN");
});
//frontend fetches this route for queryResp stored in our database
app.use("/queryResp", queryRespRouter);

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

	// Emit the latest document to the client on connection
	// QueryRes.findOne()
	//   .sort({ _id: -1 })
	//   .then((latestDoc) => {
	//     console.log("Latest document:", latestDoc);
	//     socket.emit("newDoc", latestDoc?.response.queryResp.data);
	//   });

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});

// QueryRes.watch().on("change", async (data) => {
// 	if (data.operationType === "insert") {
// 		const latestDoc = await QueryRes.findOne({ id: `${SECRET}` }).sort({
// 			_id: -1,
// 		});

// 		const newDoc = await transformData(latestDoc?.response.queryResp.data);
// 		io.emit("newDoc", newDoc);
// 		await QueryRes.deleteMany({});
// 		await OriginResp.deleteMany({});
// 	}
// });

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default SECRET;
