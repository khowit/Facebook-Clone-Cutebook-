const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
router.put('/:id', async function (req, res, next) {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hashSync(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body, 
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can update only your account!");
    }
});


//Delete user
router.delete('/:id', async function (req, res, next) {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can delete only your account!");
    }
});


//get user
router.get('/', async function (req, res, next) {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username:username});
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get friend
router.get('/friends/:userId', async function (req, res, next) {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )

        let friendList = [];
        friends.map((friend) => {
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        })

        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});


//follower user
router.put('/:id/follow', async function (req, res, next) {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you can't follow yourself");
    }
})

//unfollow user
router.put('/:id/unfollow', async function (req, res, next) {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json("you don't follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you can't unfollow yourself");
    }
})



module.exports = router




