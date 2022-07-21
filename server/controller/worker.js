const workerSchema = require("../models/worker.js");

const recherche = async (req, res) => {
  const { recherche_input, data } = req.body;
  if (data === "id") {
    try {
      const worker = await workerSchema.find({ cin: recherche_input });
      res.status(200).json({ status: "ok", data: worker });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  } else if (data === "Nom") {
    try {
      const worker = await workerSchema.find({ NOM: recherche_input });
      res.status(200).json({ status: "ok", data: worker });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  } else {
    try {
      const worker = await workerSchema.find({ Grade: recherche_input });
      res.status(200).json({ status: "ok", data: worker });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
};

const addworker = async (req, res) => {
  const {
    الرقم_المالي,
    cin,
    رقم_التأجير,
    الإسم_الشخصي,
    الإسم_العائلي,
    الدرجة,
    الميزانية,
    الدبلوم,
    التعيين,
    المقاطعة,
    المصلحة,
    الجنس,
    age,
    تاريخ_الإزدياد,
    إضافة_الفرق,
    التقاعد,
    تاريخ_الترقبي_في_الرتبة,
    تاريخ_مفعول_الرتبة,
    الرتبة,
    Grade,
    AVANCEMENT_ANCIENTE,
    AVANCEMENTDATECONCOURS,
    تاريخ_الترقية_في_لدرجة,
    السلم,
    تاريخ_التوظيف,
    تاريخ_الترسيم,
    NOM,
    PRENOM,
    مكان_الازدياد,
    الحالة_العائلية,
    الأطفال,
    CMR,
    السنة,
    المؤسسة_المانحة_للدبلوم,
    التخصص,
    Fonction,
    Date_de_nomination_à_la_fonction,
    وضعية_الموظف,
    المكان_أو_الأسباب,
    التاريخ_ابتداء_من,
    تاريخ_الالتحاق_بالعمالة,
    تعيين_م,
    Lieu_daffectation,
    نوع_الموظف,
    العنوان,
    Adresse_personnelle,
    E_mail,
    télé,
    ملاحظات,
  } = req.body;
  const worker1 = await workerSchema.findOne({ cin }).lean();
  if (!worker1) {
    const createdemande = workerSchema.create({
      الرقم_المالي,
      cin,
      رقم_التأجير,
      الإسم_الشخصي,
      الإسم_العائلي,
      الدرجة,
      الميزانية,
      الدبلوم,
      التعيين,
      المقاطعة,
      المصلحة,
      الجنس,
      age,
      تاريخ_الإزدياد,
      إضافة_الفرق,
      التقاعد,
      تاريخ_الترقبي_في_الرتبة,
      تاريخ_مفعول_الرتبة,
      الرتبة,
      Grade,
      AVANCEMENT_ANCIENTE,
      AVANCEMENTDATECONCOURS,
      تاريخ_الترقية_في_لدرجة,
      السلم,
      تاريخ_التوظيف,
      تاريخ_الترسيم,
      NOM,
      PRENOM,
      مكان_الازدياد,
      الحالة_العائلية,
      الأطفال,
      CMR,
      السنة,
      المؤسسة_المانحة_للدبلوم,
      التخصص,
      Fonction,
      Date_de_nomination_à_la_fonction,
      وضعية_الموظف,
      المكان_أو_الأسباب,
      التاريخ_ابتداء_من,
      تاريخ_الالتحاق_بالعمالة,
      تعيين_م,
      Lieu_daffectation,
      نوع_الموظف,
      العنوان,
      Adresse_personnelle,
      E_mail,
      télé,
      ملاحظات,
    });
  } else {
    return res.json({ status: "error" });
  }
  res.json({ status: "ok" }); //status : 'ok' set the headears
};
const getworker = async (req, res) => {
  try {
    const worker = await workerSchema.find({});
    res.status(200).json({ status: "ok", data: worker });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const editworker = async (req, res) => {
  const {
    الرقم_المالي,
    cin,
    رقم_التأجير,
    _id,
    الإسم_الشخصي,
    الإسم_العائلي,
    الدرجة,
    الميزانية,
    الدبلوم,
    التعيين,
    المقاطعة,
    المصلحة,
    الجنس,
    age,
    تاريخ_الإزدياد,
    إضافة_الفرق,
    التقاعد,
    تاريخ_الترقبي_في_الرتبة,
    تاريخ_مفعول_الرتبة,
    الرتبة,
    Grade,
    AVANCEMENT_ANCIENTE,
    AVANCEMENTDATECONCOURS,
    تاريخ_الترقية_في_لدرجة,
    السلم,
    تاريخ_التوظيف,
    تاريخ_الترسيم,
    NOM,
    PRENOM,
    مكان_الازدياد,
    الحالة_العائلية,
    الأطفال,
    CMR,
    السنة,
    المؤسسة_المانحة_للدبلوم,
    التخصص,
    Fonction,
    Date_de_nomination_à_la_fonction,
    وضعية_الموظف,
    المكان_أو_الأسباب,
    التاريخ_ابتداء_من,
    تاريخ_الالتحاق_بالعمالة,
    تعيين_م,
    Lieu_daffectation,
    نوع_الموظف,
    العنوان,
    Adresse_personnelle,
    E_mail,
    télé,
    ملاحظات,
  } = req.body;
  const worker1 = await workerSchema.findOneAndUpdate(
    { cin: cin },
    {
      $set: {
        الرقم_المالي: الرقم_المالي,
        cin: cin,
        رقم_التأجير: رقم_التأجير,
        الإسم_الشخصي: الإسم_الشخصي,
        الإسم_العائلي: الإسم_العائلي,
        الدرجة: الدرجة,
        الميزانية: الميزانية,
        الدبلوم: الدبلوم,
        التعيين: التعيين,
        المقاطعة: المقاطعة,
        المصلحة: المصلحة,
        الجنس: الجنس,
        age: age,
        تاريخ_الإزدياد: تاريخ_الإزدياد,
        إضافة_الفرق: إضافة_الفرق,
        التقاعد: التقاعد,
        تاريخ_الترقبي_في_الرتبة: تاريخ_الترقبي_في_الرتبة,
        تاريخ_مفعول_الرتبة: تاريخ_مفعول_الرتبة,
        الرتبة: الرتبة,
        Grade: Grade,
        AVANCEMENT_ANCIENTE: AVANCEMENT_ANCIENTE,
        AVANCEMENTDATECONCOURS: AVANCEMENTDATECONCOURS,
        تاريخ_الترقية_في_لدرجة: تاريخ_الترقية_في_لدرجة,
        السلم: السلم,
        تاريخ_التوظيف: تاريخ_التوظيف,
        تاريخ_الترسيم: تاريخ_الترسيم,
        NOM: NOM,
        PRENOM: PRENOM,
        مكان_الازدياد: مكان_الازدياد,
        الحالة_العائلية: الحالة_العائلية,
        الأطفال: الأطفال,
        CMR: CMR,
        السنة: السنة,
        المؤسسة_المانحة_للدبلوم: المؤسسة_المانحة_للدبلوم,
        التخصص: التخصص,
        Fonction: Fonction,
        Date_de_nomination_à_la_fonction: Date_de_nomination_à_la_fonction,
        وضعية_الموظف: وضعية_الموظف,
        المكان_أو_الأسباب: المكان_أو_الأسباب,
        التاريخ_ابتداء_من: التاريخ_ابتداء_من,
        تاريخ_الالتحاق_بالعمالة: تاريخ_الالتحاق_بالعمالة,
        تعيين_م: تعيين_م,
        Lieu_daffectation: Lieu_daffectation,
        نوع_الموظف: نوع_الموظف,
        العنوان: العنوان,
        Adresse_personnelle: Adresse_personnelle,
        E_mail: E_mail,
        télé: télé,
        ملاحظات: ملاحظات,
      },
    },
    { new: true }
  );
  res.status(200).json({ status: "ok" });
};

module.exports = {
  addworker,
  getworker,
  editworker,
  recherche,
};
