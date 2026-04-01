const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ available: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cars'
    });
  }
});

// GET single car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }
    
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch car details'
    });
  }
});

// POST create new car (for admin/seed purposes)
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    
    res.status(201).json({
      success: true,
      data: car,
      message: 'Car added successfully'
    });
  } catch (error) {
    console.error('Error creating car:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create car'
    });
  }
});

// PUT update car
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }
    
    res.json({
      success: true,
      data: car,
      message: 'Car updated successfully'
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update car'
    });
  }
});

// DELETE car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete car'
    });
  }
});

module.exports = router;
