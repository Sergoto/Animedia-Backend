const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")

const AnimeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  img: { type: String },
  imgTitle: { type: String },
  imgSmall: { type: String },
  limit: {type: Number},
  year: { type: String },
  genre: { type: String },
  isSeries: {type: Boolean, default: false}

},
{ timestamps: true });

module.exports = mongoose.model("Anime", AnimeSchema)