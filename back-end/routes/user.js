const express = require("express")
const routes = express.Router();
const user = require("../models/userModel");
const bcrypt = require('bcrypt');


routes.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await user.findOne({ username });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new user({
            username,
            email,
            password
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        return res.status(500).json(e);
    }
})

routes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userCheck = await user.findOne({ username });
        if (!userCheck) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        const passCheck = await bcrypt.compare(password, userCheck.password);
        if (!passCheck) {
            return res.status(400).json({ status: false, message: 'Invalid Username or Password' });
        }
        return res.status(200).json({
            status: true,
            username: userCheck.username,
            message: 'User logged in successfully'
        });
    } catch (e) {
        return res.status(500).json(e);
    }
})

module.exports = routes;