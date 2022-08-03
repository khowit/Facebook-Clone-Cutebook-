const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

var app = express(); 
dotenv.config();
 

mongoose.connect(process.env.uri, {useNewUrlParser:true}, ()=>{
  console.log("connection to mongodb")
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
 
//middleware--------------
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/images");
  },
  filename: (req, file, cb) => { 
    cb(null, req.body.name); 
  }, 
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Uploaded successfully.");
    } catch (err) {
        console.log(err)
    }
});


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

 
app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})