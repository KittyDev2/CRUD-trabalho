const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  brand: String,
  model: String,
  carYear: Number,
  category: String,
  numberPlate: Number,
  color: String,
  approved: Boolean,
})

module.exports = Person
