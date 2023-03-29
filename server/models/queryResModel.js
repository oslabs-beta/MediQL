const mongoose = require("mongoose");

const queryResSchema = new mongoose.Schema(
  {response: {type: Object}},
  {timestamps: true}
);

const QueryRes = mongoose.model("QueryRes", queryResSchema);

module.exports = QueryRes;
