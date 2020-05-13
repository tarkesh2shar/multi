const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const Sample = require("./models/sample");
const cors = require("cors");
const redis = require("redis");
// require("dotenv").config({});
app.use(morgan("dev"));
app.use(bodyParser());
app.use(cors());
mongoose.connect(
  process.env.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DATABASE_NAME,
  },
  (err) => {
    if (err) return console.log(err);
    console.log("Connected to mongo db");
  }
);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  retry_strategy: () => 1000,
});

redisClient.hset(
  "values",
  "keyfordataStoredinRedis",
  "Data stored in redis Cache"
);
redisClient.hgetall("values", (err, values) => {
  if (err) console.log(err);
  console.log("gotDataFromRedis", values);
});

app.get("/", (req, res) => {
  res.send({ hello: "World" });
});
app.post("/addSample", (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);

  if (!name) {
    res.status(400);
    return res.send({ error: true });
  }
  if (!email) {
    res.status(400);
    return res.send({ error: true });
  }
  Sample({
    name,
    email,
  })
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send({ error: true, e });
    });
});
app.get("/allSamples", (req, res) => {
  Sample.find({})
    .then((samples) => {
      res.send(samples);
    })
    .catch((e) => {
      res.send({ error: true, e });
    });
});
app.get("/fromRedis", (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    if (err) return res.send({ err });
    console.log("gotDataFromRedis", values);
    res.send(values);
  });
});
app.listen(2000, () => {
  console.log("listening on port 2000");
});
