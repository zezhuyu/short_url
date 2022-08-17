import express from "express";
import hash from 'object-hash';
import Posts from "../models/post.js";
import {CreateCode, CheckInput} from "../models/check.js";
import config from "../config.json" assert {type: "json"};

const router = express.Router();

router.route("/client/auth/save").post(async(req, res) => {
    if(req.headers['auth-token'] == null || hash(req.headers['auth-token']) !== config.CLIENT_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    const newPost = new Posts({
        url : req.body.url,
        code : req.body.code
    });
    await newPost.save().then(() => {
        res.send({message: "success"});
    }
    ).catch(err => {
        res.send(err);
    });
});

router.route("/client/auth/check").post(async(req, res) => {
    if(req.headers['auth-token'] == null || hash(req.headers['auth-token']) !== config.CLIENT_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    if(req.body.type === "url"){
        Posts.findOne({url: req.body.url}).then(post => {
            res.send(post);
        }).catch(err => {
            res.send(err);
        });
    } else if(req.body.type === "code"){
        Posts.findOne({code: req.body.code}).then(post => {
            res.json(post);
        }).catch(err => {
            res.send(err);
        });
    } else {
        res.send({message: "Invalid type"});
    }
});

router.route("/server/auth/store").post(async(req, res) => {
    if(req.headers['auth-token'] == null || hash(req.headers['auth-token']) !== config.APP_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    var errmsg ={};
    var ifstop = false;
    if(CheckInput(req.body.url, req.body.code, errmsg) === false){
        return res.send(errmsg);
    }
    await Posts.findOne({url: req.body.url}).then(post => {
        if(post !== null){
            ifstop = true;
            return res.send({shorturl: config.CLINNT_URL + "/" + post.code});;
        }
    });
    
    await Posts.findOne({code: req.body.code}).then(post => {
        if(post !== null){
            ifstop = true;
            return res.send({message: "code already exists"});
        }
    });
    var check = true;
    var result = req.body.code;
    if(result === "" || result === null || result === undefined){
        while(check && !ifstop){
            result = CreateCode();
            await Posts.findOne({code: result}).then(post => {
                if(post === null){
                    check = false;
                }
            });
        }
    }
    const newPost = new Posts({
        url : req.body.url,
        code : result
    });
    if(!ifstop){
        await newPost.save().then(() => {
            console.log({shorturl: config.CLINNT_URL + "/" + result});
            res.send({shorturl: config.CLINNT_URL + "/" + result});
        }).catch(err => {
            res.send(err);
        });
    }
});

router.route("/").get((req, res) => {
    Posts.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json("Error: " + err));

});


export default router;