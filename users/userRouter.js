const express = require("express");
const validateUser = require("../middleware/validateUser.js");
const validatePost = require("../middleware/validatePost.js");
const validateUserId = require("../middleware/validateUserId.js");

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error while saving user!" });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  // do your magic!
  req.body.user_id = req.user.id;
  Posts.insert(req.body)
    .then(posted => {
      Posts.getById(posted.id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "failed to create post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error on retriving users!"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error retriving data!" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error retrieving data!"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "failed deleting user!"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.user.id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Message: "Failed to update user!"
      });
    });
});

module.exports = router;
