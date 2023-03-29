const mongoose = require("mongoose");

const originRespSchema = new mongoose.Schema(
  {response: {type: Object}},
  {timestamps: true}
);

const OriginResp = mongoose.model("OriginResp", originRespSchema);

export default OriginResp;
