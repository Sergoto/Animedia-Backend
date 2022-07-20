const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")

const AnimeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  img: { type: String },
  imgTitle: { type: String },
  imgSmall: { type: String },
  year: { type: String },
  genre: { type: String },
},
{ timestamps: true });

module.exports = mongoose.model("Anime", AnimeSchema)