const mongoose = require("mongoose");
require("dotenv").config({ path: "../../.env" });
module.exports = () => {
  mongoose.connect(process.env.MONGOURL);
};
