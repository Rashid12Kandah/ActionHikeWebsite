require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const username = 'admin';
        const password = 'adminpassword123'; // Change this!

        let user = await User.findOne({ username });
        if (user) {
            console.log('Admin user already exists');
        } else {
            user = new User({ username, password });
            await user.save();
            console.log(`Admin user created with username: ${username} and password: ${password}`);
        }

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
