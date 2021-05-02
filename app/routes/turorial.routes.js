module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  //Retrive cross check search
  router.get("/cross/:email&:serial", tutorials.findCross);

  // Retrieve a single Tutorial with id
  router.get("/id/:id", tutorials.findOneId);

  //Retrieve a single Tutorial with email
  router.get("/email/:email", tutorials.findOneEmail);

  //Retrieve a single User with name
  router.get("/name/:name", tutorials.findOneByName);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
