const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

    async register(req, res) {
        try {
            const {
                fullName,
                userName,
                email,
                password: plainPassword,
            } = req.body;

            // Checking if user already exists
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(409).send("this email is already registered");

            // Checking if username already exists
            const usernameExists = await User.findOne({ userName });
            if (usernameExists) return res.status(409).send("this username already exists!");

            //Encoding password
            const encryptedPassword = await bcryptjs.hash(plainPassword, 10);

            // Creating new user
            const user = await User.create({
                fullName,
                userName,
                email,
                password: encryptedPassword,
            });

            res.status(200).send("success");

        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    },
    async login(req, res) {

        try {

            const { email, password: plainPassword } = req.body;

            // Checking if user exists
            const user = await User.findOne({ email });
            if (!user) return res.status(404).send("user not found/ Wrong email");

            // Checking if password is matching
            const validPass = await bcryptjs.compare(plainPassword, user.password);
            if (!validPass) return res.status(403).send("wrong password");

            // generating jwt token
            const token = jwt.sign({ user }, process.env.JWT_SECRET);

            const { password, ...other } = user._doc;

            res.send({ token: token, user: other });

        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }

    }
}