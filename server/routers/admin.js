import express from "express";
import Posts from "../models/post.js";

const router = express.Router();

router.route("/").post((req, res) => {
    res.send("Forbidden");
});

router.route("/auth").post((req, res) => {
    var token = req.headers['x-access-token'];
    if(token !== config.ADMIN_TOKEN){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    return res.status(200).send("Welcome to admin page");
});


export default router;