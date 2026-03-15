const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {
    const followerId = req.user.id
    const followeeUsername = req.params.username

    const followee = await userModel.findOne({ username: followeeUsername })
    if (!followee) {
        return res.status(404).json({ message: "User not found" })
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followee._id
    })
    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}



module.exports = {followUserController}