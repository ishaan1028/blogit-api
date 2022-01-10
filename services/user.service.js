const User = require("../models/user.model");

module.exports = {

    async getProfile(req, res) {
        try {

            const user = await User.findById(req.user._id);

            if (!user) return res.status(404).send("user not found");

            const { email, password, ...other } = user._doc;

            res.send(other);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("Couldnt get user");

        }
    },

    async updateUser(req, res) {

        try {
            const { fullName, userName } = req.body;

            // Checking if userName already exists
            const user = await User.findOne({ userName });
            if (user && user._id.toString() !== req.user._id) {
                return res.status(409).send("This username is taken by another user! try different username...");
            }

            const userInfo = await User.findOneAndUpdate({ _id: req.user._id },
                { $set: { fullName, userName } },
                {
                    runValidators: true,
                    new: true
                });

            const { email, password, ...other } = userInfo._doc;

            res.send(other);

        }
        catch (err) {
            res.status(500).send("Error editing user");
        }

    }
}