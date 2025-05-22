const express = require('express');
const router = express.Router();

// Mock login route for demonstration purposes
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Here you would typically validate the credentials against a database
    // For this demo, we will just return a success message
    if (email && password) {
        res.json({
            message: 'Login successful',
            email: email,
            // In a real application, do not return the password
        });
    } else {
        res.status(400).json({ message: 'Email and password are required' });
    }
});

// Export the router
module.exports = router;