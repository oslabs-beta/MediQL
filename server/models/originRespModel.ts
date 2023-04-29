import mongoose from "mongoose";

const originRespSchema = new mongoose.Schema(
	{ id: { type: String }, response: { type: Object } },
	{ timestamps: true }
);

const OriginResp = mongoose.model("OriginResp", originRespSchema);

export default OriginResp;
