const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workout", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: ["$exercises.duration"]}
      },
    }
  ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workout/:id"),
  (req, res) => {
    Workout.find({})(
      { _id: req.params.id },
      { lastWorkout: req.body.lastWorkout }
    ).then(function (workout) {
      res.json(workout);
    });
  };

router.put("/api/workout/:id", (req, res) => {
  console.log("POST api/workout/:id route");
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workout", function ({ body }, res) {
  Workout.create(body)
    .then(function (dbWorkout) {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workout/range", function (req, res) {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: ["$exercises.duration"] },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
