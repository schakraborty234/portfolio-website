const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1/mywebsite', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define a sample schema and model
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Data = mongoose.model('Data', dataSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST request to save data to the database
app.post('/api/data', async (req, res) => {
  const newData = new Data({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  try {
    const savedData = await newData.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});