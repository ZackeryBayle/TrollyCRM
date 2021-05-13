module.exports = app => {
  const Users = require("../controllers/User.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", Users.create);

  // Retrieve all Users
  router.get("/", Users.findAll);

  // Retrieve all published Users
  router.get("/published", Users.findAllPublished);

  //Retrive cross check search +
  router.get("/cross/:email:serial", Users.findCross);

  // Retrieve a single User with id +
  router.get("/id/:id", Users.findOneId);

  //Retrieve a single User with email
  router.get("/email/:email", Users.findOneEmail);

  //Retrieve a single User with name +
  router.get("/name/:firstName:lastName", Users.findOneByName);

  //Retrive a owner of serial
  router.get("/serial/:serial",Users.findSerial);

  // Update a User with id
  router.put("/:id", Users.update);

  // Delete a User with id
  router.delete("/:id", Users.delete);

  // Remove all Users
  router.delete("/", Users.deleteAll);

  app.use("/api/Users", router);
};
