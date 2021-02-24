const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: "Select a type of workout"
        },
        name: {
            type: String,
            required: "Select a name for workout"
        },
        duration: {
            type: Number,
            required: "What is the duration"
        },
        weight: {
            type: Number,
            required: "What was the weight used"
        },
        reps: {
            type: Number,
            required: "How many reps"
        },
        sets: {
            type: Number,
            required: "How many sets"
        },
        distance: {
            type: Number,
            required: "What is the distance"
        },
    }],
});

const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
