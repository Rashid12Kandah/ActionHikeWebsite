const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Trail = require('../models/Trail');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
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
  const { title, description, difficulty, price } = req.body;
  
  // Generate a key from title if not provided
  const key = title.toLowerCase().replace(/\s+/g, '-');
  
  // Construct image URL (assuming server serves 'uploads' statically)
  // NOTE: For production (Vercel/Heroku), use Cloudinary or S3 instead of local file storage
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const trail = new Trail({
    key,
    title,
    description,
    difficulty,
    price,
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

    const { title, description, difficulty, price } = req.body;
    
    if (title) trail.title = title;
    if (description) trail.description = description;
    if (difficulty) trail.difficulty = difficulty;
    if (price) trail.price = price;
    if (req.file) {
      trail.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedTrail = await trail.save();
    res.json(updatedTrail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
