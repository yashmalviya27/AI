const authUserModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');

async function signup(req, res) {
    const { username, password } = req.body;

    try {
       
        const existingUser = await authUserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists'
            });
        }
        const hashPassword = await bcript.hash(password, 10)
               const newUser = await authUserModel.create({ username, password: hashPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.status(201).send({
            success: true,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }

}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await authUserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        const crackPassword = await bcript.compare(password, user.password);
        if (!crackPassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.status(200).send({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.log(error);
    }
}

async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).send({
        success: true,
        message: 'Logout successful'
    });
}


module.exports = {
    signup, login, logout
}