import User from "../models/user.model.js";

const signup = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;

        // Validate request body
        if (!name || !userName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate user email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Validate user username
        const usernameTaken = await User.findOne({ userName });
        if (usernameTaken) {
            return res.status(409).json({ error: "Username is already taken" });
        }

        // Password strength
        if (password.length < 6) {
            return res.status(400).json({ error: "Weak password. It must be at least 6 characters long." });
        }

        // Create user
        const newUser = await User.create({
            name,
            userName,
            email,
            password,
        });
        return res.status(201).send(newUser);
    } catch (error) {
        return res.status(500).json({ error: "Error creating user" });
    }
}

module.exports = {
    signup,
};