const mongoose = require("mongoose")

const followerSchema = new mongoose.Schema({
    follower: {
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"Follower is required"]
    },
    followee: {
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"Followee is required"]
    }
},{
    timestamps:true
})

const followModel = mongoose.model("follows", followerSchema)

module.exports = followModel