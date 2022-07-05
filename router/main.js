const express = require('express');
const router =express.Router();
const {createUser,login} =require('../controller/main');
const {insertDemande,getdemande,valideDmd,refuseDmd} =require('../controller/demande');
router.route('/register').post(createUser)
router.route('/login').post(login)
router.route('/insertDemande').post(insertDemande)
router.route('/getdemande').get(getdemande)
router.route('/valideDmd').post(valideDmd)
router.route('/refuseDmd').post(refuseDmd)
module.exports = router