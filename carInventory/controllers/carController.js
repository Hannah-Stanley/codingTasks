// Imports
const express = require('express');
const router = express.Router();
const Car = require('../models/carModel');

// Add a car
router.post('/', async (req, res) => {
  const car = new Car(req.body);
  try {
    await car.save();
    res.status(201).send(car);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update information about a single car
router.patch('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update information about more than one car
router.patch('/', async (req, res) => {
  try {
    const { filter, update } = req.body;
    const result = await Car.updateMany(filter, update);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a specific document
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (e) {
    res.status(500).send(e);
  }
});

// List all the information for all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (e) {
    res.status(500).send(e);
  }
});

// List the model, make, registration number, and current owner for all cars older than five years
router.get('/older-than-five-years', async (req, res) => {
  const currentYear = new Date().getFullYear();
  try {
    const cars = await Car.find({ model: { $lt: (currentYear - 5).toString() } }, 'model make registration owner');
    res.send(cars);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;