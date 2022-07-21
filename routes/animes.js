const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const verify = require("../verifyToken");

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newAnime = new Anime(req.body);

    try {
      const savedAnime = await newAnime.save();
      return res.status(200).json(savedAnime);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Not Allowed");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedAnime = await Anime.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedAnime);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Not Allowed");
  }
});

//Delete 
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Anime.findByIdAndDelete(req.params.id);
      res.status(200).json("The Anime has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not allowed!");
  }
});


//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET RANDOM
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let anime;
  try {
    if (type === "movies") {
      anime = await Anime.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    } else {
      anime = await Anime.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const animes = await Anime.find();
      res.status(200).json(animes.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not allowed!");
  }
});

module.exports = router;
