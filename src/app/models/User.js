const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const role = ["admin", "student"];

const User = new Schema(
  {
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: role, required: true },
    dob: { type: String },
    address: { type: String, default: "" },
    class_id: { type: ObjectId, ref: "Class" },
    ethnic_id: { type: ObjectId, ref: "Ethnic" },
    province_id: { type: ObjectId, ref: "Province" },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
