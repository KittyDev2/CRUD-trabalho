const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  nome: String,
  cpf: String,
  dataNascimento: String,
  email: String,
  conta: String,
  endereco: String,
  cep: String,
  brand: String,
  model: String,
  carYear: Number,
  category: String,
  numberPlate: Number,
  color: String,
  approved: Boolean,
})

module.exports = Person
