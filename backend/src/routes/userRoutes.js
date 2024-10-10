
const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.render('signUp', { title: 'Sign Up', error: "Passwords do not match!" });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/signin'); 
    } catch (error) {
        res.render('signUp', { title: 'Sign Up', error: "Error creating user: " + error.message });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

       
        if (user && user.password === password) { 
            isAuthenticated = true;
            res.redirect('/marketplace');
        } else {
            res.render('signIn', { title: 'Sign In', error: "Invalid email or password!" });
        }
    } catch (error) {
        res.render('signIn', { title: 'Sign In', error: "Error during sign in: " + error.message });
    }
});

module.exports = router;
