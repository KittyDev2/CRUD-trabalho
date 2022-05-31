// config inicial
const express = require('express')
const Mongoose  = require('mongoose')
const app = express()

//depois do DB!
const mongoose = require('mongoose')
const Person = require('./models/Person')


//forma de ler json
app.use(
    express.urlencoded({
      extended: true,
    }),
  )
  
  app.use(express.json())


// rotas
app.post('/person', async (req, res) => {
    const { brand, model, carYear, category, numberPlate, color, approved } = req.body

    if (!brand) {
        res.status(422).json({error: 'O campo da Marca é obrigatório!'})
        return
    }

    if (!model) {
        res.status(422).json({error: 'O campo do Modelo é obrigatório!'})
        return
    }

    if (!carYear) {
        res.status(422).json({error: 'O campo do Ano do carro é obrigatório!'})
        return
    }

    if (!category) {
        res.status(422).json({error: 'O campo da Categoria é obrigatório!'})
        return
    }

    if (!numberPlate) {
        res.status(422).json({error: 'O campo do Numero da Placa é obrigatório!'})
        return
    }

    if (!color) {
        res.status(422).json({error: 'O campo da Cor é obrigatório!'})
        return
    }
  
    const person = {
      brand,
      model,
      carYear,
      category,
      numberPlate,
      color,
      approved,
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'Formulario inserido no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/person', async (req, res) => {
    try {
      const people = await Person.find()
  
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const person = await Person.findOne({ _id: id })
  
      if (!person) {
        res.status(422).json({ message: 'Dados não encontrados!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const { brand, model, carYear, category, numberPlate, color, approved } = req.body
  
    const person = {
      brand,
      model,
      carYear,
      category,
      numberPlate,
      color,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Dados não encontrados!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Dados não encontrados!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
//rota inicial / andpoint

Mongoose
  .connect(
    'mongodb+srv://Erick-2:UudJUsYXPxJDlPPv@api-trabalho.wmsbrhj.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco MongoDB!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))