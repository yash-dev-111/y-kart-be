const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  ProfileImg: {
    type: String,
    default:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQmcqzN9KSMx-hxPJfiB3yt59uQhN9R4IqjisfUEitJv9lbQVN14QYLsUfmgiH-AoH2VgTFMdRBaTWa9XXpU9aMV1fveYnRgRsf4peaqt_rCR_qyQ483NgjHHdhfYpOr8axyGWhk3DHw5lAUQkXl6NGMugPS7k6Apw7CUjqRMgwAv01i2_AXyRumuBfw/s458/blank-profile-picture-hd-images-photo.JPG",
  },
  City: { type: String, required: true },
  HomeAddress: { type: String, required: true },
  State: { type: String, rerquired: true },
  Country: { type: String, required: true },
  Pin: { type: String, required: true },
});
const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
