const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const connectDB = require('./db/conn');  // Database connection
const User = require('./models/user');  // User model
const userRoutes = require('./routes/userRoutes');  // User routes

const app = express();


// Connect to the database
connectDB();

// Setup Handlebars engine
const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../../frontend/templates/layout'),  // Path to layout
    partialsDir: path.join(__dirname, '../../frontend/templates/partials'),  // Path to partials
});

// Setup Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../../frontend/templates/views'));  // Path to views

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Middleware for form data parsing
app.use(express.urlencoded({ extended: true }));

// Authentication status (for simplicity)
let isAuthenticated = false;

// Routes
app.get('/', (req, res) => {
    if (isAuthenticated) {
        res.redirect('/marketplace');
    } else {
        res.redirect('/signin');
    }
});

app.get('/signin', (req, res) => {
    if (isAuthenticated) {
        res.redirect('/marketplace');
    } else {
        res.render('signin', { title: 'Sign In' });
    }
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            isAuthenticated = true;
            res.redirect('/marketplace');
        } else {
            res.render('signin', { title: 'Sign In', error: "Invalid email or password!" });
        }
    } catch (error) {
        res.render('signin', { title: 'Sign In', error: "Error during sign in: " + error.message });
    }
});

app.post('/signup', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.render('signup', { title: 'Sign Up', error: "Passwords do not match!" });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.render('signin', { title: 'Sign In', success: "Registration successful! You can now sign in." });
    } catch (error) {
        res.render('signup', { title: 'Sign Up', error: "Error creating user: " + error.message });
    }
});

// Authenticated routes
app.get('/marketplace', (req, res) => {
    if (isAuthenticated) {
        res.render('marketplace', { title: 'Marketplace' });
    } else {
        res.redirect('/signin');
    }
});

app.get('/crop-management', (req, res) => {
    if (isAuthenticated) {
        res.render('cropManagement', { title: 'Crop Management' });
    } else {
        res.redirect('/signin');
    }
});

app.get('/community-forum', (req, res) => {
    if (isAuthenticated) {
        res.render('communityForum', { title: 'Community Forum' });
    } else {
        res.redirect('/signin');
    }
});

app.get('/resource-library', (req, res) => {
    if (isAuthenticated) {
        res.render('resourceLibrary', { title: 'Resource Library' });
    } else {
        res.redirect('/signin');
    }
});

app.get('/logistics', (req, res) => {
    if (isAuthenticated) {
        res.render('logistics', { title: 'Logistics' });
    } else {
        res.redirect('/signin');
    }
});

app.get('/financial-services', (req, res) => {
    if (isAuthenticated) {
        res.render('financialServices', { title: 'Financial Services' });
    } else {
        res.redirect('/signin');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    isAuthenticated = false;
    res.redirect('/signin');
});

// User routes
app.use('/', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
