import express from "express";
import Posts from "../models/post.js";
import config from "../config.json" assert {type: "json"};

const router = express.Router();

router.route("/client/auth/save").post(async(req, res) => {
    if(req.headers['auth-token'] !== config.CLIENT_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    console.log(req.body);
    const newPost = new Posts({
        url : req.body.url,
        code : req.body.code
    });
    await newPost.save().then(() => {
        res.send({"message": "success"});
    }
    ).catch(err => {
        res.send(err);
    });
});

router.route("/client/auth/check").post(async(req, res) => {
    if(req.headers['auth-token'] !== config.CLIENT_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    console.log(req.body.type, req.body.url, req.body.code);
    if(req.body.type === "url"){
        Posts.findOne({url: req.body.url}).then(post => {
            console.log(post);
            res.send(post);
        }).catch(err => {
            res.send(err);
        });
    } else if(req.body.type === "code"){
        Posts.findOne({code: req.body.code}).then(post => {
            console.log(post);
            res.json(post);
        }).catch(err => {
            res.send(err);
        });
    } else {
        res.send({"message": "Invalid type"});
    }
});

router.route("/server/auth").get((req, res) => {
    res.send("Hello from client");
}).post((req, res) => {
    const post = new Posts(req.body);
    post.save((err, post) => {
        if (err) {
            res.send(err);
        }
        res.json(post);
    });
});

router.route("/").get((req, res) => {
    Posts.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json("Error: " + err));

});


export default router;