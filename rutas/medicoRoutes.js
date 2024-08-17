const express = require('express')
const { getMedicos, getMedicoById } = require('../controladores/medicoController')
//express router
const router = express.Router()

//routes

//GET ALL MEDICOS
router.get('/getall',getMedicos)
router.get('/getid/:id',getMedicoById)

module.exports = router