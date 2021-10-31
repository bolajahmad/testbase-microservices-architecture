const User = require("../../models/user.model");

const verifyEmailController = async (req, res) => {
    console.log({ params: req.params });
    await User.findOne({
        confirmationCode: req.params.confirmationCode
    })
    .then((user) => {
        console.log({ user });
        if (!user) {
            return res.status(400).json({
                message: 'Failed to activate account',
                isSuccessful: false
            })
        }

        user.status = 'Active';
        return user;
    })
    .then((user) => {
        user.save((err, data) => {
            if (err) {
                res.status(500).json({
                    message: 'Failed to update user data. Please retry!',
                    isSuccessful: false
                })
            }

            if (data) {
                res.status(200).json({
                    message: 'User Activate Successful',
                    data,
                    isSuccessful: true
                })
            }
        })
    })
    .catch((error) => res.status(401).json({ message: error.message, isSuccessful: false }))
};

module.exports = verifyEmailController;
