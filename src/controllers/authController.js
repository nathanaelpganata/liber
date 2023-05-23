const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, firstName, lastName, password } = new User(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: "Duplicate user found" });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers.bearer;
    if (!authHeader) {
        return res
            .status(401)
            .json({ error: "Authorization header not present" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const isValidToken = await checkValidToken(token);
        if (isValidToken) {
            await deleteToken(token);
        }
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = {
    register,
    login,
    logout,
};
