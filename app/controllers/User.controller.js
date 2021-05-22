const { Users } = require("../models/index");
const db = require("../models/index");
const turorialRoutes = require("../routes/turorial.routes");
const User = db.Users;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    console.log(req);
    return;
  }
  console.log(req);

 // Create a User
  const User = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }); 

  // Save User in the database
  User
    .save(User)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database. -
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

//Retrive with cross check </cross/email serial> +
exports.findCross = (req, res) => {
  const email = req.query.email;
  const serial = req.query.serial;
  var condition = email ? { email: {$regex: new RegExp(email), $options: "i"}} : serial ? { serial: { $regex: new RegExp(serial), $options: "i"}} : {}

  User.findOne(condition)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Did not find a match for this cross check search " + email + " & " + serial});
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving User with email & serial " + email + "&" + serial});
  });
};

//Retrive a single user from full name </name/firstName lastName> +
exports.findOneByName = (req,res) => {
  const lastName = req.params.lastName;
  const firstName = req.params.firstName;
  var condition = firstName ? { firstName: {$regex: new RegExp(firstName), $options: "i"}} : lastName ? { lastName: { $regex: new RegExp(lastName), $options: "i"}} : {}

  User.findOne(condition)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with name: " + lastName});
      else res.send(data);
    })
    .catch(err=> {
      res
        .status(500)
        .send({message: "Error retriving user with name: " + firstName + lastName});
    });
};

// Find a single User with an id </id/:id> +
exports.findOneId = (req, res) => {
  const id = req.params.id;


  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};


// Find a single User with an email </email/:email> +
exports.findOneEmail = (req, res) => {
  const email = req.params.email;

  User.find({ email: email })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with email " + email });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with email=" + email });
    });
};

//Find owner of serial
exports.findSerial = (req, res) => {
  const serial = req.params.description;

  User.find({serial: serial })
  .then(data => {
    if(!data)
      res.status(404).send({ message: "Not found owner for the serial"});
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving user with serial=" + serial})
  });

};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  // const email = req.params.email;

  //Find by id and update
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
