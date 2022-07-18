const mongoose =require('mongoose');
let mydate= new Date()
const demandeSchema =new mongoose.Schema({
    cin: {type: String ,required : true},
    nb_jour : {type: String,required : true},
    date_depart: {type: String,required : true},
    type:{type:String,required : true},
    etat:{type:String,default : "En attente"},
    prise:{type:String,default:mydate},
    nom:{type:String},
    grade:{type:String},
},{
    collation : { locale: 'en_US', strength: 1 }
})

module.exports= mongoose.model('demande',demandeSchema);