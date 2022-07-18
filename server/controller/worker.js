const workerSchema = require('../models/worker.js');

const recherche=async(req,res)=>{
    const {recherche_input,data}=req.body
    if(data==='id'){
        try{
            const worker =await workerSchema.find({cin:recherche_input})
            res.status(200).json({status:'ok',data:worker})
            }
            catch(error){
                res.status(500).json({msg:error})
            }
    }
    else if(data==='Nom'){
        try{
            const worker =await workerSchema.find({NOM:recherche_input})
            res.status(200).json({status:'ok',data:worker})
            }
            catch(error){
                res.status(500).json({msg:error})
            }
    }
    else{
        try{
            const worker =await workerSchema.find({Grade:recherche_input})
            res.status(200).json({status:'ok',data:worker})
            }
            catch(error){
                res.status(500).json({msg:error})
            }
    }
}


const addworker=async (req,res)=>{
    const {الرقم_المالي,cin,رقم_التأجير,
        الإسم_الشخصي ,
الإسم_العائلي ,
الدرجة ,
      الميزانية ,
      الدبلوم ,
      التعيين ,
      المقاطعة ,
      المصلحة ,
      الجنس ,
      age ,
      تاريخ_الإزدياد ,
      إضافة_الفرق ,
      التقاعد ,
      تاريخ_الترقبي_في_الرتبة ,
      تاريخ_مفعول_الرتبة ,
      الرتبة ,
      Grade ,
      AVANCEMENT_ANCIENTE ,
      AVANCEMENTDATECONCOURS ,
      تاريخ_الترقية_في_لدرجة ,
      السلم ,
      تاريخ_التوظيف ,
      تاريخ_الترسيم ,
      NOM ,
      PRENOM ,
      مكان_الازدياد ,
      الحالة_العائلية ,
      الأطفال ,
      CMR ,
      السنة ,
      المؤسسة_المانحة_للدبلوم ,
      التخصص ,
      Fonction ,
      Date_de_nomination_à_la_fonction ,
      وضعية_الموظف ,
      المكان_أو_الأسباب ,
      التاريخ_ابتداء_من ,
      تاريخ_الالتحاق_بالعمالة ,
      تعيين_م ,
      Lieu_daffectation ,
      نوع_الموظف ,
      العنوان ,
      Adresse_personnelle ,
      E_mail ,
      télé ,
      ملاحظات ,}=req.body
    console.log(req.body)
    const worker1 = await workerSchema.findOne({cin}).lean()
    if(!worker1){
        const createdemande = workerSchema.create({الرقم_المالي,cin,رقم_التأجير,
            الإسم_الشخصي ,
  الإسم_العائلي ,
  الدرجة ,
          الميزانية ,
          الدبلوم ,
          التعيين ,
          المقاطعة ,
          المصلحة ,
          الجنس ,
          age ,
          تاريخ_الإزدياد ,
          إضافة_الفرق ,
          التقاعد ,
          تاريخ_الترقبي_في_الرتبة ,
          تاريخ_مفعول_الرتبة ,
          الرتبة ,
          Grade ,
          AVANCEMENT_ANCIENTE ,
          AVANCEMENTDATECONCOURS ,
          تاريخ_الترقية_في_لدرجة ,
          السلم ,
          تاريخ_التوظيف ,
          تاريخ_الترسيم ,
          NOM ,
          PRENOM ,
          مكان_الازدياد ,
          الحالة_العائلية ,
          الأطفال ,
          CMR ,
          السنة ,
          المؤسسة_المانحة_للدبلوم ,
          التخصص ,
          Fonction ,
          Date_de_nomination_à_la_fonction ,
          وضعية_الموظف ,
          المكان_أو_الأسباب ,
          التاريخ_ابتداء_من ,
          تاريخ_الالتحاق_بالعمالة ,
          تعيين_م ,
          Lieu_daffectation ,
          نوع_الموظف ,
          العنوان ,
          Adresse_personnelle ,
          E_mail ,
          télé ,
          ملاحظات ,})
    }
    else{
        return res.json({status:'error'})
    }
    res.json({status:'ok'})//status : 'ok' set the headears
}
const getworker=async (req,res)=>{
    try{
    const worker =await workerSchema.find({})
    res.status(200).json({status:'ok',data:worker})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const editworker=async(req,res)=>{
    console.log(req.body)
    const {_id,service,date_offic,lieu,type_budget,etat,cin,id,date_emploi,lieu_fr}=req.body
    const worker1 =await workerSchema.findOneAndUpdate(_id,{$set:{
        service:service,
        date_offic:date_offic,
        lieu:lieu,
        type_budget:type_budget,
        etat:etat,
        cin:cin,
        id:id,
        date_emploi:date_emploi,
        lieu_fr:lieu_fr
    }})
    res.status(200).json({status:'ok'})
}



module.exports={
    addworker,getworker,editworker,recherche
}