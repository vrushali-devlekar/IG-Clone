const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {
    const followeeUsername = req.params.username

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exists"
        })
    }

    if (String(req.user.id) === String(isFolloweeExists._id)) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    // #region agent log
    fetch('http://127.0.0.1:7451/ingest/3d550d3a-ff66-418a-a277-40e39bfad48c', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': '85a3c2'
        },
        body: JSON.stringify({
            sessionId: '85a3c2',
            runId: 'pre-fix',
            hypothesisId: 'H1',
            location: 'src/controllers/user.controller.js:followUserController',
            message: 'Follow user resolved followee',
            data: {
                userId: String(req.user.id),
                followeeUsername,
                followeeId: String(isFolloweeExists._id)
            },
            timestamp: Date.now()
        })
    }).catch(() => { });
    // #endregion agent log

    const isAlreadyFollowing = await followModel.findOne({
        follower: req.user.id,
        followee: isFolloweeExists._id
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: req.user.id,
        followee: isFolloweeExists._id
    })
    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followeeUsername = req.params.username

    const followee = await userModel.findOne({ username: followeeUsername })
    if (!followee) {
        return res.status(404).json({
            message: "User you are trying to unfollow does not exists"
        })
    }

    // #region agent log
    fetch('http://127.0.0.1:7451/ingest/3d550d3a-ff66-418a-a277-40e39bfad48c', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': '85a3c2'
        },
        body: JSON.stringify({
            sessionId: '85a3c2',
            runId: 'pre-fix',
            hypothesisId: 'H2',
            location: 'src/controllers/user.controller.js:unfollowUserController',
            message: 'Unfollow user resolved followee',
            data: {
                userId: String(req.user.id),
                followeeUsername,
                followeeId: String(followee._id)
            },
            timestamp: Date.now()
        })
    }).catch(() => { });
    // #endregion agent log

    const isUserFollowing = await followModel.findOne({
        follower: req.user.id,
        followee: followee._id,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


module.exports = { followUserController, unfollowUserController }