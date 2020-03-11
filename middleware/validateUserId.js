const Users = require("../users/userDb.js");

module.exports = function validateUserId(req, res, next) {
  Users.getById(req.params.id).then(user => {
    if(user){
      console.log(user)
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id"})
    }
  });
};
