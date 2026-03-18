const mongoose = require("mongoose")

const followerSchema = new mongoose.Schema({
    follower: {
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    followee: {
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted and rejected"
        }
    }
}, {
    timestamps: true
})

followerSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followerSchema)

module.exports = followModel