const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt"); // Import bcrypt

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });

        if (user) {
            // Compare the received plaintext password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password); // Assuming the hashed password is stored in the 'password' field

            if (isPasswordValid) {
                res.status(200).json({
                    isAllowed: true,
                    name: user.name,
                    role: user.role, // Include the role in the response
                });
            } else {
                res.status(401).json({ isAllowed: false, message: "Invalid username or password" });
            }
        } else {
            res.status(401).json({ isAllowed: false, message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during login" });
    }
});

module.exports = router;
