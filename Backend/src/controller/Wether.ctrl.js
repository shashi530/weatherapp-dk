const rout = require("express").Router();
const Wether = require("../model/Wether.Schema");

rout.post("", async (req, res) => {
  try {
    const wet = await Wether.create(req.body);
    res.status(201).send(wet);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

rout.get("", async (req, res) => {
  try {
    const wet = await Wether.find().lean().exec();
    res.status(201).send(wet);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// rout.get("/:id", async (req, res) => {
//   try {
//     const wet = await Wether.findById(req.params.id).lean().exec();
//     res.status(201).send(wet);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

module.exports = rout;
