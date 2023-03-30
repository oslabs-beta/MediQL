import mongoose from 'mongoose';

const queryResSchema = new mongoose.Schema(
  { response: { type: Object } },
  { timestamps: true }
);

const QueryRes = mongoose.model('QueryRes', queryResSchema);

export default QueryRes;
