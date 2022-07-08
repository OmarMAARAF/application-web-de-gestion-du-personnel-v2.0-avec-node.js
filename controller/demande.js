const demande = require('../models/demande');
const refuseDmd =async (req,res)=>{
    const {id}=req.body;
    const demande1 =await demande.findByIdAndUpdate(id,{$set:{etat:'refus'}})
    if(!demande1){
        res.status(500).json({status:'error',error:'there\'s no request with this id'})
    }
    res.status(200).json({status:'ok'})
}

const valideDmd =async(req,res)=>{
    const {id}=req.body;
    const demande1 =await demande.findByIdAndUpdate(id,{$set:{etat:'valide'}})
    if(!demande1){
        res.status(500).json({status:'error',error:'there\'s no request with this id'})
    }
    res.status(200).json({status:'ok'})
}

const getdemande = async (req,res)=>{
    try{

        const allDmd1= await demande.find({etat:'En attente'}) 
        const allDmd2= await demande.find({etat:'valide'})
        const allDmd3= await demande.find({etat:'refus'})
        const allDmd = allDmd1.concat(allDmd2,allDmd3)
       /*  socket.socket.send(allDmd1); */
        res.status(200).json({status:'ok',demande:allDmd,attente :allDmd1})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}


const insertDemande=async (req,res) =>{
    const {cin,nb_jour,date_depart,type}=req.body
    const demande1 = await demande.findOne({cin,nb_jour,date_depart,type}).lean()


    

    if(!demande1){
        const createdemande = demande.create({cin,nb_jour,date_depart,type})

    }
    else{
        const etat = demande1.etat
        if(etat === "refus"){
            return res.json({ status: 'error', error: 'Votre demande a été refusée',badge :'danger' })
        }else if (etat === "valide"){
            return res.json({ status: 'error', error: 'Votre demande a été validée vous pourriez passer la prendre',badge :'success' })
        }
        else{
            
            return res.json({ status: 'error', error: 'Votre demande est en cours de traitement . . .',badge :'warning' })
        }
    }
    res.json({status:'ok',cin:cin})//status : 'ok' set the headears
}

module.exports ={
    insertDemande,getdemande,valideDmd,refuseDmd
}