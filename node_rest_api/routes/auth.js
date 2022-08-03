const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post('/register', async function (req, res, next) {

    try {
        //Create password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
        
        //Craete user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password: hashedPassword
        })

        //save user and return
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async function (req, res, next) {
    try {
        //check user
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not Found!!");

        //check password
        const validPassword = await bcrypt.compare(req.body.password, user.password); 
        !validPassword && res.status(404).json("Invalid Password!!");

        res.status(200).json(user)
        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router