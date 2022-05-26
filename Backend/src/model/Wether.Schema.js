const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema(
  {
    country: { type: String, require: true },
    lat: { type: Number, require: true },
    localtime: { type: String, require: true },
    localtime_epoch: { type: Number, require: true },
    lon: { type: Number, require: true },
    name: { type: String, require: true },
    region: { type: String, require: true },
    tz_id: { type: String, require: true },
    moon_illumination: { type: String, require: true },
    moon_phase: { type: String, require: true },
    moonrise: { type: String, require: true },
    moonset: { type: String, require: true },
    sunrise: { type: String, require: true },
    sunset: { type: String, require: true },
    co: { type: Number, require: true },
    code: { type: Number, require: true },
    humidity: { type: Number, require: true },
    no2: { type: Number, require: true },
    o3: { type: Number, require: true },
    pm2_5: { type: Number, require: true },
    pm10: { type: Number, require: true },
    so2: { type: Number, require: true },
    temp_c: { type: Number, require: true },
    temp_f: { type: Number, require: true },
    "us-epa-index": { type: Number, require: true },
    "gb-defra-index": { type: Number, require: true },
    icon: { type: String, require: true },
    text: { type: String, require: true }
  },
  {
    timeStamp: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Weather", weatherSchema);