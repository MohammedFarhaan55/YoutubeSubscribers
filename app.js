const express = require('express');
const path = require("path");
const Subscriber = require("./src/models/subscribers");
const app = express();
app.use(express.static("public"))

//routes

//api to render html file. || GET
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));

});

//api to get all data || METHOD GET
app.get("/subscribers", async (req, res) => {
  try {
    let subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(500);
  }
})


//api to get all subscribers by name and subscribed channel || METHIOD GET
app.get("/subscribers/names", async (req, res) => {
  try {
    let subscribers = await Subscriber.find({},
      { name: 1, subscribedChannel: 1, _id: 0 }
    )
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(500);
  }
})


//api to get subscribers by id || METHOD GET
app.get("/subscribers/:id", async (req, res) => {
  try {
    let subscribers = await Subscriber.findById(req.params.id);
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})

module.exports = app;
