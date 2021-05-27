const mongoose = require('mongoose');

const jeuSchema = mongoose.Schema({
    
    title:{ type: String, required:true},
    price:{type: Number, required:true},
    plateaux:{type:String,  required:false},
    taille:{type:Number ,  required:false},
    referenceInterne:{type:String ,  required:false},
    description:{type:String ,  required:false},
    alimentations:{type:String ,  required:false},
    etats:{type:String ,  required:false},
    reparation:{type:String ,  required:false},
});

module.exports = mongoose.model('Jeu', jeuSchema);