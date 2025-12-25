const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Trail = require('../models/Trail');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'action-hike-trails',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// GET all trails
router.get('/', async (req, res) => {
  try {
    const trails = await Trail.find();
    res.json(trails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new trail (Protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, description, difficulty, price, link } = req.body;
  
  // Generate a key from title if not provided
  const key = title.toLowerCase().replace(/\s+/g, '-');
  
  // Use Cloudinary URL
  const imageUrl = req.file ? req.file.path : '';

  const trail = new Trail({
    key,
    title,
    description,
    difficulty,
    price,
    link,
    imageUrl
  });

  try {
    const newTrail = await trail.save();
    res.status(201).json(newTrail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a trail (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) return res.status(404).json({ message: 'Trail not found' });

    await Trail.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trail deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) a trail (Protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) return res.status(404).json({ message: 'Trail not found' });

    const { title, description, difficulty, price, link } = req.body;
    
    if (title) trail.title = title;
    if (description) trail.description = description;
    if (difficulty) trail.difficulty = difficulty;
    if (price) trail.price = price;
    if (link) trail.link = link;
    if (req.file) {
      trail.imageUrl = req.file.path;
    }

    const updatedTrail = await trail.save();
    res.json(updatedTrail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
