const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb+srv://bigcityboi:wolp2EYG7mFxhOFN@cluster0.cuicfuc.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => console.log("Connected!"));
  return mongoose;
};
