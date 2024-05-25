const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb+srv://bigcityboi:ironlauren@cluster0.cuicfuc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected!"));
  return mongoose;
};
