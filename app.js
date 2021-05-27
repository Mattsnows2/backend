const express = require ('express');
const Jeu = require('./models/Jeu');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
var elasticsearch=require('elasticsearch');
var client = new elasticsearch.Client({
  host:'localhost:9200'
});

const app = express();
mongoose.connect('connection à la bdd mongodb',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Création d'un objet via un formulaire (requete POST)

  app.use(bodyParser.json());
  app.post('/api/jeu', (req, res, next)=>{
    delete req.body._id
    const jeu = new Jeu({
      ...req.body
    });
    jeu.save()
    .then(()=>res.status(201).json({message:'Objet enregistré !'}))

    .catch(error=>res.status(400).json({error}))
  });

  app.put('/api/jeu/:id',(req, res,next)=>{
    Jeu.updateOne({_id:req.params.id}, {...req.body, _id: req.params.id})
    .then(()=>res.status(200).json({message:'Objet modifié'}))
    .catch(error=>res.status(400).json({error}));
  });



  //Supression d'un objet en fonction de son id (requete DELETE)
  app.delete('/api/jeu/:id',(req,res,next)=>{
    Jeu.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'Objet supprimé'}))
    .catch(error=>res.status(400).json({error}));
  });

 
  //Récupération d'un objet en fonction de son id (requete GET)
  app.get('/api/jeu/:id',(req,res,next)=>{
    Jeu.findOne({ _id: req.params.id})
    .then(jeu=>res.status(200).json(jeu))

    .catch(error=>res.status(404).json({error}));
  });
 


//Récupération de tous les objets (requete GET)  
app.get('/api/jeu', (req,res,next)=>{
  Jeu.find()
  .then(jeus=>res.status(200).json(jeus))
  .catch(error=>res.status(400).json({error}))

  client.get({
    index:'workout',
    type:'mytype',
    id:req.params.id
  }, function(err, resp, status){
    if(err){
      console.log(err);
    }else{
      workout=resp._source;
      console.log('ca marche', resp);
      if(!workout){
        return res.status(400).send({
          message:`workput is not found for id ${req.params.if}`
        });
      }
      return res.status(200).send({
        message:`GET workout call for id ${res.params.id} succede`,
        workout: workout
      });
    }
  });
});






 
  module.exports = app;
