require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const trailRoutes = require('./routes/trails');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Function to seed admin user
const seedAdminUser = async () => {
  try {
    console.log('Checking for admin user...');
    // Delete existing admin and recreate to ensure correct password
    await User.deleteOne({ username: 'admin' });
    const admin = new User({ username: 'admin', password: 'adminpassword123' });
    await admin.save();
    console.log('SUCCESS: Admin user created/reset - username: admin, password: adminpassword123');
  } catch (err) {
    console.error('Error seeding admin:', err.message);
  }
};

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedAdminUser(); // Seed admin after DB connection
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/reviews', reviewRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Action Hike API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
