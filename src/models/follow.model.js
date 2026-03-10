const mongoose = require("mongoose")

const followerSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:[true,"Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"Followee is required"]
    }
})

const followModel = mongoose.model("follows",followerSchema)