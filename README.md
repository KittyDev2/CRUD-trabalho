# MotoSport

Esse projeto foi feito utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 13.3.3.

## Descrição

Projeto que tem afim de armazenar informações de um pedido de carro .

## Status

Concluido.

## Tecnologias Usadas

NojeJs e MongoDBD.

## Funcionalidades

### Get:


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
  ### Patch

  app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const {nome, cpf, dataNascimento, email, conta, endereco, cep, brand, model, carYear, category, numberPlate, color, approved } = req.body
  
    const person = {
      nome,
      cpf,
      dataNascimento,
      email,
      conta,
      endereco,
      cep,
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

### Delete

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

  ### Link com o banco de dados
  
  Mongoose
  .connect(
    'mongodb+srv://Erick-2:UudJUsYXPxJDlPPv@api-trabalho.wmsbrhj.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco MongoDB!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
  

## Desenvolvedores

Adilson Henrique, Emerson Marques, Erick Francisco e Lucas Ragazzi.
