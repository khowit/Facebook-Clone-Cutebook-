const router = require("express").Router();
const Message = require("../models/Message");

//add
router.post("/",async (req,res) => {
        const newMessage = new Message(req.body);
    
        try {
            const saveMessage = await newMessage.save();
            res.status(200).json(saveMessage);
        } catch (err) {
            res.status(500).json(err);
        }
});


//get
router.get("/:conversationId", async (req,res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router





