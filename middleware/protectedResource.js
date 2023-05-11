const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const mongoose = require("mongoose");
const SellerModel = mongoose.model("SellerModel");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "User is not logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "User is not logged in" });
    }
    const { _id } = payload;
    SellerModel.findById(_id).then((dbSeller) => {
      if (dbSeller) {
        req.seller = dbSeller;
        next();
      } else {
        UserModel.findById(_id).then((dbUser) => {
          if (dbUser) {
            req.user = dbUser;
            next();
          } else {
            return res.status(401).json({ error: "User not found" });
          }
        });
      }
    });
  });
};
