const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//Create posts
router.post('/', async function (req, res, next) {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update post
router.put('/:id', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
        }else{
            res.status(403).json("you can update only your post");
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete post
router.delete('/:id', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("the post has been deleted")
        }else{
            res.status(403).json("you can delete only your post");
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//like/ dislike post

router.put('/:id/like', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: { likes: req.body.userId }});
            res.status(200).json("the post has been liked");
        }else{
            await post.updateOne({$pull: { likes: req.body.userId }});
            res.status(200).json("the post has been disliked");
        }
        
    } catch (err) {
        res.status(500).json(err);
    }    
});

//get post

router.get('/:id', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        const {password,updatedAt, ...other} = post._doc
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline post
router.get('/timeline/:userId', async function (req, res, next) {

    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
                currentUser.followings.map((friendId)=>{
                    return Post.find({ userId: friendId});
                })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});


//get user's all posts
router.get("/profile/:username", async function (req, res, next) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
});
  


module.exports = router