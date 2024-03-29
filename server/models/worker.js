const mongoose=require('mongoose');

const workerSchema = new mongoose.Schema({
    رقم_التأجير:{type:String,required : true},
    cin:{type:String,required : true},
    الرقم_المالي:{type:String,required : true},
    الإسم_الشخصي :{type:String,required : true},
    الإسم_العائلي :{type:String,required : true},
    الدرجة :{type:String,required : true},
            الميزانية :{type:String,required : true},
            الدبلوم :{type:String,required : true},
            التعيين :{type:String,required : true},
            المقاطعة :{type:String,required : true},
            المصلحة :{type:String,required : true},
            الجنس :{type:String,required : true},
            age :{type:String,required : true},
            تاريخ_الإزدياد :{type:String,required : true},
            إضافة_الفرق :{type:String,required : true},
            التقاعد :{type:String,required : true},
            تاريخ_الترقبي_في_الرتبة :{type:String,required : true},
            تاريخ_مفعول_الرتبة :{type:String,required : true},
            الرتبة :{type:String,required : true},
            Grade :{type:String,required : true},
            AVANCEMENT_ANCIENTE :{type:String,required : true},
            AVANCEMENTDATECONCOURS :{type:String,required : true},
            تاريخ_الترقية_في_لدرجة :{type:String,required : true},
            السلم :{type:String,required : true},
            تاريخ_التوظيف :{type:String,required : true},
            تاريخ_الترسيم :{type:String,required : true},
            NOM :{type:String,required : true},
            PRENOM :{type:String,required : true},
            مكان_الازدياد :{type:String,required : true},
            الحالة_العائلية :{type:String,required : true},
            الأطفال :{type:String,required : true},
            CMR :{type:String,required : true},
            السنة :{type:String,required : true},
            المؤسسة_المانحة_للدبلوم :{type:String,required : true},
            التخصص :{type:String,required : true},
            Fonction :{type:String,required : true},
            Date_de_nomination_à_la_fonction :{type:String,required : true},
            وضعية_الموظف :{type:String,required : true},
            المكان_أو_الأسباب :{type:String,required : true},
            التاريخ_ابتداء_من :{type:String,required : true},
            تاريخ_الالتحاق_بالعمالة :{type:String,required : true},
            تعيين_م :{type:String,required : true},
            Lieu_daffectation :{type:String,required : true},
            نوع_الموظف :{type:String,required : true},
            العنوان :{type:String,required : true},
            Adresse_personnelle :{type:String,required : true},
            E_mail :{type:String,required : true},
            télé :{type:String,required : true},
            ملاحظات :{type:String,required : true},

},{
    collation : { locale: 'en_US', strength: 1 }
})
module.exports=mongoose.model('worker',workerSchema)